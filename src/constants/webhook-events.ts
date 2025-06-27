export const DOCUMENT_EVENTS = [
  "document_sent",
  "document_completed",
  "document_voided",
  "document_declined",
  "document_approved",
  "document_deleted",
  "document_corrected",
  "document_resent",
  "document_note_sent",
  "document_note_updated",
  "document_cloned",
  "recipient_finished",
  "recipient_finish_later",
];

export const TEMPLATE_EVENTS = [
  "template_created",
  "template_modified",
  "template_deleted",
];

export const CONTACT_EVENTS = [
  "contact_created",
  "contact_modified",
  "contact_deleted",
];

export const WEBHOOK_EVENTS = [
  ...DOCUMENT_EVENTS,
  ...TEMPLATE_EVENTS,
  ...CONTACT_EVENTS,
] as const;
