import {
  CONTACT_EVENTS,
  DOCUMENT_EVENTS,
  TEMPLATE_EVENTS,
} from "../constants/webhook-events";
import { getContactById } from "../services/database/contact-service";
import { getDocumentById } from "../services/database/document-service";
import { getTemplateById } from "../services/database/template-service";

// Prepare Webhook Payload
export async function prepareWebhookData(
  event: string,
  data: any,
  include_data: boolean,
  webhook: any
) {
  let payload: any = { event, ...data };


  if (DOCUMENT_EVENTS.includes(event)) {
    const docId = data.document_id;

    const document: any = await getDocumentById(docId);

    if (include_data) {
      for (let data of webhook.include_data) {
        payload[data] = document[data];
      }
    }

    payload = {
      ...payload,
      ...document,
    };
  } else if (TEMPLATE_EVENTS.includes(event)) {
    const template_id = data.template_id;

    const template = await getTemplateById(template_id);

    payload = {
      ...template,
    };
  } else if (CONTACT_EVENTS.includes(event)) {
    const contactId = data.contact_id;

    const contact: any = await getContactById(contactId);

    payload = {
      ...payload,
      ...(contact && { contact }),
    };
  }

  return payload;
}
