import { Types } from "mongoose";

export interface IWebhookEvent {
  entity_id?: Types.ObjectId;
  type?: string;
  operations?: {
    [category: string]: string[];
  };
}

export interface IWebhook {
  _id?: Types.ObjectId;
  url: string;
  status?: string | null;
  verifier_token?: string;
  company_id: Types.ObjectId;
  app_id?: Types.ObjectId;
  events: IWebhookEvent[];
  enable_include_data?: boolean;
  include_data?: string[];
  created_at?: Date;
  updated_at?: Date;
}
