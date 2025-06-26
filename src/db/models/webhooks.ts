import { Schema, model } from "mongoose";

const webhookData = new Schema(
  {
    url: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ARCHIVED"],
      default: "ACTIVE",
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
      required: true,
      index: true,
    },

    events: {
      document_events: {
        type: [String],
        default: [],
      },
      template_events: {
        type: [String],
        default: [],
      },
      recipientEvents: {
        type: [String],
        default: [],
      },
    },

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

export const WebhooksModel = model("webhooks", webhookData);
