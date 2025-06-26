import {
  DOCUMENT_EVENTS,
  RECIPIENT_EVENTS,
  TEMPLATE_EVENTS,
} from "../constants/webhook-events";
import { getDocumentById } from "../services/database/document-service";
import { getTemplateById } from "../services/database/template-service";

// Prepare Webhook Payload
export async function prepareWebhookData(
  event: string,
  data: any,
  include_data: boolean,
  webhook: any
) {
  let payload: any = {};

  if (DOCUMENT_EVENTS.includes(event) || RECIPIENT_EVENTS.includes(event)) {
    const docId = data.document_id;

    const document: any = await getDocumentById(docId);

    if (include_data) {
      for (let data of webhook.include_data) {
        payload[data] = document[data];
      }
    }

    payload = {
      ...payload,
      ...data,
      ...document,
    };
  } else if (TEMPLATE_EVENTS.includes(event)) {
    const template_id = data.template_id;

    const template = await getTemplateById(template_id);

    payload = {
      ...template,
      ...data,
    };
  }
}
