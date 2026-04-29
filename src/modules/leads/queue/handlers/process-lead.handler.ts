import { Queue } from "bullmq";
import { redisConnection } from "@/shared/infra/queue/connection";

const leadQueue = new Queue("lead-queue", {
  connection: redisConnection,
});

export async function processLeadHandler(lead: any) {
  await leadQueue.add("send-welcome-email", lead, {
    jobId: `welcome-${lead.email}`,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  });

  await leadQueue.add("notify-team", lead, {
    jobId: `notify-${lead.email}`, 
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
  });
}