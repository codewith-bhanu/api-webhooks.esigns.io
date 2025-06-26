import { WebhooksModel } from "../../db/models/webhooks";

export async function getWebhooksByCompanyId(company_id: any) {
  return await WebhooksModel.find({ company_id }).lean();
}

export async function getWebhookById(id: any) {
  return await WebhooksModel.findById(id).lean();
}

export async function saveWebhookData(data: any) {
  return await WebhooksModel.create(data);
}

export async function getWebhooksByQuery(query: any) {
  return await WebhooksModel.find(query).lean();
}
