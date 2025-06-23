import type { Context } from "hono";
import { getEventCategory } from "../helpers/events-helper";
import { publishToExchange } from "../services/webhooks/webhook-service";
import { successResp } from "../utils/resp-utils";
import BadRequestException from "../exceptions/badRequestException";
import { DATA_PUBLISHED } from "../constants/app-messages";

export async function processWebhookEvent(c: Context) {
  try {
    const req = await c.req.json();

    const { event, company_id, ...data } = req;

    const eventCategory = getEventCategory(event);

    if (!eventCategory) {
      throw new BadRequestException(
        `Event category not found for event: ${event}`
      );
    }

    const routingKey = `${eventCategory}.${event}`;

    const message: any = {
      event,
      company_id,
      data,
    };

    publishToExchange(routingKey, message);

    return successResp(c, 200, DATA_PUBLISHED);
  } catch (err) {
    throw err;
  }
}
