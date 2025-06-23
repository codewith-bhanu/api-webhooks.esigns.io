import { Hono } from "hono";
import { processWebhookEvent } from "../controllers/webhook-controller";

const router = new Hono();

router.post("/publish", processWebhookEvent);

export default router;
