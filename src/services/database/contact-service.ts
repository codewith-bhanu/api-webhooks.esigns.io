import { contactModel } from "../../db/models/contacts";

export async function getContactById(id: string) {
  return await contactModel.findById(id).lean();
}
