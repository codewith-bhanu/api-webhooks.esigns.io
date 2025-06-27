import { Schema, model } from "mongoose";

const contactTypeSchema = new Schema({
  contact_type: {
    type: Schema.Types.ObjectId,
    ref: "Entity",
    index: true,
  },
  account_data_id: {
    type: Schema.Types.ObjectId,
    ref: "EntitiesData",
    index: true,
  },
  has_login: {
    type: Boolean,
    default: true,
  },
  is_active: {
    type: Boolean,
  },
  integrated_with: {
    type: String,
    default: "KODEFAST",
  },
});

const contactsSchema = new Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    middle_name: {
      type: String,
    },
    email: {
      type: String,
      index: true,
    },
    phone_number: {
      type: String,
    },
    company_name: {
      type: String,
    },
    account_data_id: {
      type: Schema.Types.ObjectId,
      ref: "EntitiesData",
      index: true,
    },
    address: {
      type: String,
    },
    contact_type: {
      type: Schema.Types.ObjectId,
      ref: "Entity",
      index: true,
    },
    contact_types: [
      {
        type: contactTypeSchema,
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "ARCHIVED"],
      default: "ACTIVE",
      index: true,
    },
    title: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    signature: {
      type: String,
    },
    initial: {
      type: String,
    },
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      index: true,
    },
    password: {
      type: String,
    },
    is_verified: {
      type: Boolean,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const contactModel = model("Contact", contactsSchema, "contacts");
