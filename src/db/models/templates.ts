import { Schema, model } from "mongoose";

const documentUser = new Schema({
  default: {
    type: Boolean,
    required: true,
    default: false,
  },
  e_signature_required: {
    type: Boolean,
    required: true,
    default: false,
  },
  value: {
    type: String,
    required: true,
    default: "SENDER",
  },
  name: {
    type: String,
    required: false,
    default: "SENDER",
  },
  email: {
    type: String,
    required: false,
  },
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },

  phone: {
    type: String,
  },

  company_name: {
    type: String,
  },

  address: {
    type: String,
  },

  type: {
    type: String,
    required: true,
    default: "SENDER",
  },
  user_type: {
    type: String,
    required: true,
    default: "SENDER",
  },
  has_approval_access: {
    type: Boolean,
  },
  is_cc: {
    type: Boolean,
  },
  e_signature_order: {
    type: Number,
    required: true,
    default: 1,
  },
  color: {
    type: String,
    default: "#F754A2",
  },
  entity_data_id: {
    type: Schema.Types.Mixed,
  },
  title: {
    type: String,
  },
  user_id: {
    type: Schema.Types.Mixed,
    ref: "User",
  },
  contact_type: {
    type: Schema.Types.ObjectId,
    ref: "Entity",
  },
  contact_id: {
    type: Schema.Types.ObjectId,
  },
  role: {
    type: String,
  },
  terms_and_conditions: {
    accepted: {
      type: Boolean,
      default: false,
    },
    accepted_on: { type: Date },
  },
});

const documentSettings = new Schema(
  {
    password_protected_access: {
      type: Boolean,
      default: false,
    },
    otp_based_e_signature: {
      type: Boolean,
      default: false,
    },
    update_entity_data: {
      update_after_completion: {
        type: Boolean,
      },
      update_after_user_finish: {
        type: Boolean,
      },
      never_update: {
        type: Boolean,
      },
    },
    send_attachment: {
      type: Boolean,
    },
    document_generation_settings: {
      add_generated_id: {
        type: Boolean,
        default: false,
      },
      add_page_numbers: {
        type: Boolean,
      },
      add_page_information: {
        type: Boolean,
      },
      content_type: {
        type: String,
        default: "Time Stamp",
      },
      custom_text: {
        type: String,
        default: "",
      },
      alignment: {
        type: String,
        enum: ["LEFT", "CENTER", "RIGHT"],
        default: "LEFT",
      },
    },
    expiration_settings: {
      expire_date: {
        type: Date,
      },
      expired_notification_sent: {
        type: Boolean,
        default: false,
      },
      first_reminder_sent: {
        type: Boolean,
        default: false,
      },
      first_reminder_sent_at: {
        type: Date,
      },
      expire_after_days: {
        type: Number,
      },
      send_first_reminder: {
        days_before_expiration: {
          type: Number,
        },
        enabled: {
          type: Boolean,
        },
      },
      repeat_reminder: {
        interval_in_days: {
          type: Number,
        },
        reminder_times: {
          type: Array,
        },
        enabled: {
          type: Boolean,
        },
      },
    },
    auto_reminders_settings: {
      send_first_reminder: {
        days_after: {
          type: Number,
        },
        enabled: {
          type: Boolean,
        },
      },
      repeat_reminder: {
        until_completed_and_expired: {
          type: Number,
        },
        enabled: {
          type: Boolean,
        },
      },
    },
  },
  {
    _id: false,
  }
);

const companyDocumentsV2Data = new Schema(
  {
    urls: {
      type: String,
    },
    paths: [
      {
        type: String,
      },
    ],
    original_doc_paths: [{ type: String }],
    converted_doc_paths: [
      {
        type: String,
      },
    ],
    title: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DRAFT", "ARCHIVED"],
    },
    company_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Company",
      index: true,
    },
    fields_found: {
      type: Schema.Types.Mixed,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    document_id: {
      type: String,
    },
    allow_new_users: {
      type: Boolean,
      default: false,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    published_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    secure_access: {
      type: Boolean,
      default: false,
    },
    fields: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    blocks: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    files_state: {
      type: String,
    },
    document_users: [documentUser],
    document_settings: {
      type: documentSettings,
      default: {},
    },
    enforce_signature_order: {
      type: Boolean,
    },
    is_anyone_can_approve: {
      type: Boolean,
      default: false,
    },
    page_properties: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    expiration_date: {
      type: Date,
    },
    no_of_pages: {
      type: Number,
      default: 1,
    },
    is_template: {
      type: Boolean,
      index: true,
    },
    cover_page: {
      type: String,
    },
    completed_documents_count: {
      type: Number,
      default: 0,
    },
    inprogress_documents_count: {
      type: Number,
      default: 0,
    },
    draft_documents_count: {
      type: Number,
      default: 0,
    },
    total_documents_count: {
      type: Number,
      default: 0,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    deleted_on: {
      type: Date,
    },
    form_responses_count: {
      type: Number,
      default: 0,
    },
    shared_template: {
      type: Boolean,
      default: false,
    },
    document_names: {
      type: [String],
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

companyDocumentsV2Data.index({ is_template: 1, company_id: 1 });

export const companyDocumentsV2DataModel = model(
  "company_documents_v2",
  companyDocumentsV2Data
);
