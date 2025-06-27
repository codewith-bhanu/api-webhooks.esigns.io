import { contactModel } from "../../db/models/contacts";

export async function getContactById(id: any) {
  return await contactModel.findById(id).lean();
}
