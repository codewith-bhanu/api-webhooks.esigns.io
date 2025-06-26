import axios from "axios";
import { getChannel } from "../../utils/amqp-connection";
import BadRequestException from "../../exceptions/badRequestException";
import { getWebhooksByQuery } from "../database/webhook-data-service";
import { prepareWebhookData } from "../../helpers/webhooks-helper";
import type { IWebhook } from "../../types/db-types";
import type { WebhookMessage } from "../../types/app-types";

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
    throw error;
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

          const { company_id, event, data } = JSON.parse(content);

          const webhooks: any[] = await getWebhooksByQuery({ company_id });

          for (const webhook of webhooks) {
            const operationsMap = webhook?.events;

            if (!operationsMap || typeof operationsMap !== "object") continue;

            const categoryEvents = operationsMap[category];

            if (
              !Array.isArray(categoryEvents) ||
              !categoryEvents.includes(event)
            )
              continue;

            const includeData =
              Array.isArray(webhook.include_data) &&
              webhook.include_data.length > 0;

            const payload = await prepareWebhookData(
              event,
              data,
              includeData,
              webhook
            );

            await processConsumer(webhook, payload);
          }

          channel.ack(msg);
        } catch (err) {
          throw err;
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
    const resp = await axios.post(webhook.url, payload, {
      headers: { Authorization: webhook.verifier_token || "" },
      timeout: 5000,
    });

    if (![200, 201].includes(resp.status)) {
      throw new BadRequestException(
        `[Webhook] Failed to deliver to ${webhook.url}: ${resp.status}`
      );
    }

    console.log(`[Webhook] delivered to ${webhook.url} successfully`);
  } catch (err) {
    throw err;
  }
}
