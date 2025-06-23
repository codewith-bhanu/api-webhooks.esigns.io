import axios from "axios";
import { getChannel } from "../../utils/amqp-connection";
import BadRequestException from "../../exceptions/badRequestException";
import { getWebhooksByQuery } from "../database/webhook-data-service";
import { prepareWebhookData } from "../../helpers/webhooks-helper";
import type { IWebhook } from "../../types/db-types";

export interface WebhookMessage {
  data: Record<string, any>;
  company_id: string;
}

export function publishToExchange(routingKey: string, message: WebhookMessage) {
  const channel = getChannel();

  const content = Buffer.from(JSON.stringify(message));

  const published = channel.publish("webhooks", routingKey, content, {
    persistent: true,
  });

  if (!published) {
    throw new BadRequestException("[AMQP] Failed to publish message");
  }

  console.log(`[AMQP] Published to ${routingKey}`);
}

export async function startWebhookDispatcher() {
  try {
    const channel = getChannel();

    await channel.assertExchange("webhooks", "topic", {
      durable: true,
      autoDelete: false,
    });

    const categories = [
      "document_events",
      "recipient_events",
      "template_events",
    ];

    for (const category of categories) {
      await setupQueueAndConsumer(channel, category);
    }

    console.log("[AMQP] All consumers started.");
  } catch (error) {
    console.error("[Dispatcher] Startup failed:", error);
    setTimeout(startWebhookDispatcher, 5000);
  }
}

async function setupQueueAndConsumer(channel: any, category: string) {
  const queueName = `${category}_queue`;

  try {
    await channel.assertQueue(queueName, { durable: true });

    await channel.bindQueue(queueName, "webhooks", `${category}.*`);

    await channel.consume(
      queueName,
      async (msg: any | null) => {
        if (!msg) return;

        try {
          const content = msg.content.toString();

          console.log(`[Consumer:${category}] Message received:`, content);

          const { company_id, event, data } = JSON.parse(content);

          const webhooks: any[] = await getWebhooksByQuery({ company_id });

          for (const webhook of webhooks) {
            const operationsMap = webhook?.events?.[0]?.operations;

            // Skip if operationsMap is not an object
            if (
              !operationsMap ||
              typeof operationsMap !== "object" ||
              !Array.isArray(operationsMap[category]) ||
              !operationsMap[category].includes(event)
            ) {
              continue;
            }

            const include_data =
              (webhook.include_data && webhook.include_data.length) || false;

            const payload = await prepareWebhookData(event, data);

            await processConsumer(webhook, payload);
          }

          channel.ack(msg);
        } catch (err) {
          console.error(`[Consumer:${category}] Processing failed:`, err);
        }
      },
      { noAck: false }
    );

    console.log(`[AMQP] Consumer running for queue: ${queueName}`);
  } catch (err: any) {
    console.error(`[AMQP] Failed to set up ${category}:`, err.message);
    throw new BadRequestException(
      `[AMQP] Failed to set up ${category}: ${err.message}`
    );
  }
}

async function processConsumer(webhook: IWebhook, payload: any) {
  try {
    await axios.post(webhook.url, payload, {
      headers: { Authorization: webhook.verifier_token || "" },
      timeout: 5000,
    });

    console.log(`[Webhook] Dispatched to ${webhook.url} successfully`);
  } catch (err) {
    throw err;
  }
}
