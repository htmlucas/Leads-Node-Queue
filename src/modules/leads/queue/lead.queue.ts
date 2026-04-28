// src/modules/leads/queues/lead.queue.ts
import { Queue } from "bullmq";
import { redisConnection } from "@/shared/infra/queue/connection";

export const leadQueue = new Queue("lead-queue", {
  connection: redisConnection,
});