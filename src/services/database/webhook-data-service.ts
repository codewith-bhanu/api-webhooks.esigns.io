import { WebhookModel } from "../../db/models/webhooks";

export async function getWebhooksByCompanyId(company_id: any) {
  return await WebhookModel.find({ company_id }).lean();
}

export async function getWebhookById(id: any) {
  return await WebhookModel.findById(id).lean();
}

export async function saveWebhookData(data: any) {
  return await WebhookModel.create(data);
}

export async function getWebhooksByQuery(query: any) {
  return await WebhookModel.find(query).lean();
}
