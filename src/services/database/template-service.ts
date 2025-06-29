import { companyDocumentsV2DataModel } from "../../db/models/templates";

export async function getTemplateById(id: string) {
  return await companyDocumentsV2DataModel.findById(id).lean();
}
