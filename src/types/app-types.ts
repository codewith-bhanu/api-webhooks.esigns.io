import type { WEBHOOK_EVENTS } from "../constants/webhook-events";

export type SuccessResp = {
  status: number;
  success: boolean;
  message: string;
  data?: any;
};

export type WebhookEventsType = (typeof WEBHOOK_EVENTS)[number];

export type WebhookMessage = {
  event: WebhookEventsType;
  company_id: string;
  data: any;
};
