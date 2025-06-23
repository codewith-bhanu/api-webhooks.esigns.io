import { companyDocumentsV2DataModel } from "../../db/models/templates";

export async function getTemplateById(id: any) {
  return await companyDocumentsV2DataModel.findById(id).lean();
}
