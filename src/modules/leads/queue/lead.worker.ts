// src/modules/leads/queues/lead.worker.ts
import { Worker } from "bullmq";
import { redisConnection } from "@/shared/infra/queue/connection";
import pino from "pino";
import { sendLeadEmail } from "@/shared/providers/mail/send-mail";

const logger = pino();

export const leadWorker = new Worker(
  "lead-queue",
  async (job) => {
    try {
        const lead = job.data;

        logger.info({ lead }, "Processando lead");

        // simular tarefas reais
        await fakeLog(lead);
        await sendLeadEmail(lead);
        await fakeCRM(lead);
    } catch (error) {
        logger.error({ error },'Erro ao processar lead')
        throw error;
    }
   
  },
  {
    connection: redisConnection,
  }
);

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