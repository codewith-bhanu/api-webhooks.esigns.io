import {
  DOCUMENT_EVENTS,
  RECIPIENT_EVENTS,
  TEMPLATE_EVENTS,
} from "../constants/webhook-events";
import type { WebhookEventsType } from "../types/app-types";

export function getEventCategory(event: WebhookEventsType): string | undefined {
  const categoryMap: Record<string, readonly WebhookEventsType[]> = {
    document_events: DOCUMENT_EVENTS,
    recipient_events: RECIPIENT_EVENTS,
    template_events: TEMPLATE_EVENTS,
  };

  return Object.entries(categoryMap).find(([, events]) =>
    events.includes(event)
  )?.[0];
}
