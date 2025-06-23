import { Schema, model } from "mongoose";
const entityInfo = new Schema({
  entity_id: {
    type: Schema.Types.ObjectId,
    required: false,
    index: true,
  },
  type: {
    type: String,
    required: false,
  },
  operations: {
    type: Schema.Types.Mixed,
  },
});

const webhookData = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    verifier_token: {
      type: String,
      required: false,
    },
    company_id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    app_id: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    events: [entityInfo],
    enable_include_data: {
      type: Boolean,
      required: false,
    },
    include_data: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const WebhookModel = model("webhooks", webhookData);
