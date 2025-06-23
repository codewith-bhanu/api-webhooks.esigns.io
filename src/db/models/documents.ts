import { Schema, model } from "mongoose";

const documentUser = new Schema({
  default: {
    type: Boolean,
    required: true,
    default: false,
  },
  e_signature_required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "SENDER",
  },
  name: {
    type: String,
    default: "SENDER",
  },
  email: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
  },
  company_name: {
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
  role: {
    type: String,
  },
  address: {
    type: String,
  },
  entity_data_id: {
    type: Schema.Types.Mixed,
  },
  title: {
    type: String,
  },
  user_id: {
    type: Schema.Types.Mixed,
  },
  contact_type: {
    type: Schema.Types.ObjectId,
    ref: "Entity",
  },
  contact_id: {
    type: Schema.Types.ObjectId,
  },
  document_sent: {
    type: Boolean,
  },
  document_sent_on: {
    type: Date,
  },
  document_completed: {
    type: Boolean,
    default: false,
  },
  document_completed_on: {
    type: Date,
  },
  last_verified_on: {
    type: Date,
  },
  approval_status: {
    type: String,
  },
  approved_at: {
    type: Date,
  },
  declined_at: {
    type: Date,
  },
  ip_address: {
    type: String,
  },
  user_agent: {
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
        enabled: {
          type: Boolean,
        },
        reminder_times: {
          type: Array,
        },
        time_zone: {
          type: String,
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

const documentTrackingDataSchema = new Schema(
  {
    type: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const companyDocumentsV2Response = new Schema(
  {
    title: {
      type: String,
    },
    paths: [
      {
        type: String,
      },
    ],
    original_doc_paths: [
      {
        type: String,
      },
    ],
    converted_doc_paths: [
      {
        type: String,
      },
    ],
    user_details: {
      type: Schema.Types.Mixed,
    },
    company_id: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
    },
    company_document_id: {
      type: Schema.Types.ObjectId,
      ref: "company_documents_v2",
    },
    fields: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    fields_data: [
      {
        type: Schema.Types.Mixed,
        default: [],
      },
    ],
    fields_found: {
      type: Schema.Types.Mixed,
    },
    files_state: {
      type: String,
    },
    sender_ip_address: {
      type: String,
    },
    document_users: [documentUser],
    document_settings: documentSettings,
    enforce_signature_order: {
      type: Boolean,
    },
    document_cloned_status: {
      type: Boolean,
    },
    email_details: {
      subject: {
        type: String,
      },
      to: {
        type: [String],
      },
      cc: {
        type: [String],
      },
      content: {
        type: String,
      },
    },
    expires_at: {
      type: Date,
    },
    document_tracking_status: documentTrackingDataSchema,
    document_status: {
      type: String,
      default: "SENT",
    },
    total_users_count: {
      type: Number,
      default: 0,
    },
    completed_users_count: {
      type: Number,
      default: 0,
    },
    page_properties: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    no_of_pages: {
      type: Number,
      default: 1,
    },
    current_signature_user: {
      type: Schema.Types.Mixed,
    },
    created_from_template: {
      type: Boolean,
    },
    is_deleted: {
      type: Boolean,
    },
    deleted_on: {
      type: Date,
    },
    finished_document_path: [
      {
        type: String,
      },
    ],
    finished_document_status: {
      type: String,
    },
    document_previous_status: {
      type: String,
    },
    attachments_count: {
      type: Number,
      default: 0,
    },
    is_anyone_can_approve: {
      type: Boolean,
      default: false,
    },
    is_approved: {
      type: Boolean,
    },

    is_corrected: {
      type: Boolean,
    },
    html_source_path: {
      type: String,
    },
    document_type: [
      {
        type: String,
      },
    ],
    corrected_at: {
      type: Date,
    },
    expiration_date: {
      type: Date,
    },
    document_approval_time: {
      type: Date,
    },
    document_rejected_notes: {
      type: String,
    },
    workflow_id: {
      type: Schema.Types.ObjectId,
      ref: "Workflow",
    },
    workflow_response_id: {
      type: Schema.Types.ObjectId,
      ref: "WorkflowResponse",
    },
    form_data: {
      type: Schema.Types.Mixed,
    },
    document_completed_at: {
      type: Date,
    },
    cron_job_id: {
      type: Number,
    },
    cron_jobs: {
      first_reminder: {
        type: Number,
      },
      repeat_reminders: {
        type: Number,
      },
      expiration: {
        type: Number,
      },
    },
    document_generated_ids: {
      type: [String],
    },
    lock_template_fields: {
      type: Boolean,
      default: false,
    },
    sender_time_zone: {
      type: String,
    },
    document_names: {
      type: [String],
    },
    from_getlink: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const companyDocumentsV2ResponseModel = model(
  "company_documents_v2_responses",
  companyDocumentsV2Response
);
