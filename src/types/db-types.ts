import { Types } from "mongoose";

export type WebhookEventCategory =
  | "document_events"
  | "template_events"
  | "recipient_events";

export interface IWebhook {
  _id?: Types.ObjectId;
  url: string;
  status?: string | null;
  verifier_token?: string;
  company_id: Types.ObjectId;
  app_id?: Types.ObjectId;
  events: Partial<Record<WebhookEventCategory, string[]>>;
  enable_include_data?: boolean;
  include_data?: string[];
  created_at?: Date;
  updated_at?: Date;
}
