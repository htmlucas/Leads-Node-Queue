// src/modules/leads/queues/lead.worker.ts
import { Worker } from "bullmq";
import { redisConnection } from "@/shared/infra/queue/connection";
import pino from "pino";
import { processLeadHandler } from "./handlers/process-lead.handler";
import { sendWelcomeEmailHandler } from "./handlers/send-welcome-email.handler";
import { notifyTeamHandler } from "./handlers/notify-team.handler";

const logger = pino();

export const leadWorker = new Worker(
  "lead-queue",
  async (job) => {
    const lead = job.data;

    switch (job.name) {
      case "process-lead":
        logger.info("Passando dentro do primeiro job para criação dos demais...");

        await processLeadHandler(lead);
        break;

      case "send-welcome-email":
        logger.info("Enviando email de boas vindas....");
        await sendWelcomeEmailHandler(lead);
        break;

      case "notify-team":
        logger.info("Notificando o time sobre novo lead....");
        await notifyTeamHandler(lead);
        break;

      default:
        logger.warn(`Job desconhecido: ${job.name}`);
        break;
    }
  },
  {
    connection: redisConnection,
  }
);

leadWorker.on("failed", (job, err) => {
  console.error("❌ Job falhou:", job?.name);
  console.error("Erro:", err);
});

leadWorker.on("completed", (job) => {
  console.log("✅ Job finalizado:", job.name);
});

// funções mock
async function fakeLog(lead: any) {
  logger.info("Log salvo:", lead.email);
}

async function fakeEmail(lead: any) {
  logger.info("Email enviado para:", lead.email);
}

async function fakeCRM(lead: any) {
  logger.info("Enviado para CRM:", lead.email);
}