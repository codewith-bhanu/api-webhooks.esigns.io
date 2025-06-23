import UnprocessableContentException from "../../exceptions/unprocessableContentException";

export function validate(schema: any, data: any) {
  const resp = schema.safeParse(data);
  if (!resp.success) {
    throw new UnprocessableContentException("Invalid data", resp.error.errors);
  }

  return resp.data;
}
