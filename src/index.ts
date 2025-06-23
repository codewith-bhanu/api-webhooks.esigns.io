import { serve } from "@hono/node-server";
import { Hono, type Context } from "hono";
import { cors } from "hono/cors";

import { config } from "./config/app.ts";
import {
  DEF_ERROR_RESP,
  DEF_SERVICE_RUNNING,
} from "./constants/app-messages.ts";
import { successResp } from "./utils/resp-utils.ts";
import { dbConnection } from "./db/db-connection.ts";
import { connectAMQP } from "./utils/amqp-connection.ts";
import { startWebhookDispatcher } from "./services/webhooks/webhook-service.ts";

import { validate } from "./middlewares/validations/validate.ts";
import { vEnvSchema } from "./middlewares/validations/schemas/env-schema.ts";

import router from "./routes/webhook-router.ts";

const app = new Hono().basePath(config.app.api_version);

// Apply global CORS middleware
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
    allowMethods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  })
);

// Validate environment variables
validate(vEnvSchema, process.env);

// Initialize external services
await dbConnection();
await connectAMQP();
await startWebhookDispatcher();

// Root health check
app.get("/", (c) => {
  return successResp(c, 200, DEF_SERVICE_RUNNING);
});

// API Routes
app.route("/webhooks", router);

// Global error handler
app.onError((err: any, c: Context) => {
  const status = err.status || 500;
  const message = err.message || DEF_ERROR_RESP;
  const errorPayload = {
    status,
    success: false,
    message,
    errData: err.errData ?? undefined,
  };

  console.error("[App Error]:", err);
  c.status(status);
  return c.json(errorPayload);
});

// Start server
const port = Number(config.app.port) || 3000;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`🚀 Server is running on :${info.port}`);
  }
);
