// import type { ObjectId } from "mongoose";
import { companyDocumentsV2ResponseModel } from "../../db/models/documents";

export async function getDocumentById(id: string) {
  return await companyDocumentsV2ResponseModel.findById(id).lean();
}
