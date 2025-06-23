import amqp, { type Channel } from "amqplib";
import { config } from "../config/app";
import BadRequestException from "../exceptions/badRequestException";

let channel: Channel | null = null;
let connection;

export async function connectAMQP() {
  try {
    connection = await amqp.connect(config.amqp.url);

    channel = await connection.createChannel();

    await channel
      .assertExchange("webhooks", "topic", { durable: true, autoDelete: false })
      .catch((err) => {
        throw new BadRequestException(
          `[AMQP] Failed to assert exchange: ${err.message}`
        );
      });

    console.log("[AMQP] Connected and exchange asserted");

    connection.on("error", (err) => {
      console.error("[AMQP] Connection error:", err);
      channel = null;
      connection = null;
      setTimeout(connectAMQP, 5000);
    });

    connection.on("close", () => {
      console.error("[AMQP] Connection closed");
      channel = null;
      connection = null;
      setTimeout(connectAMQP, 5000);
    });
  } catch (err) {
    console.error("[AMQP] Connection failed:", err);
    setTimeout(connectAMQP, 5000);
  }
}

export function getChannel(): Channel {
  if (!channel) throw new BadRequestException("AMQP channel not initialized");
  return channel;
}
