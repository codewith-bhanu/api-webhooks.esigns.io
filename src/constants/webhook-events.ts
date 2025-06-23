export const DOCUMENT_EVENTS = [
  "document_sent",
  "document_completed",
  "document_voided",
  "document_declined",
  "document_approved",
  "document_deleted",
  "document_corrected",
  "document_resent",
];

export const RECIPIENT_EVENTS = ["recipient_signed", "recipient_finish_later"];

export const TEMPLATE_EVENTS = [
  "template_created",
  "template_modified",
  "template_deleted",
];

export const WEBHOOK_EVENTS = [
  ...DOCUMENT_EVENTS,
  ...RECIPIENT_EVENTS,
  ...TEMPLATE_EVENTS,
] as const;
