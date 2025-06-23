import { z } from "zod/v4";

export const vEnvSchema = z.object({
  PORT: z.string(),
  API_VERSION: z.string(),
  MONGO_URI: z.string(),
  AMQP_URL: z.string(),
});
