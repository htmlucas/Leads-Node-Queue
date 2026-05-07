import { FastifyReply, FastifyRequest } from "fastify";
import { CreateLeadDTO } from "../dtos/create-lead.dto";
import { CreateLeadService } from "../services/create-lead.service";
import { ListLeadsService } from "../services/list-leads.services";
import { LeadsRepository } from "../repositories/leads.repository";
import { CsvExportLeadService } from "@/shared/services/export/csv-export-lead.service";

type ListLeadsQuery = {
  page?: string;
  limit?: string;
  email? : string;
  startDate?: string;
  endDate?: string;
};

type LeadsExportQuery = {
    email?: string;
    startDate?: Date;
    endDate?: Date;
}

export class LeadsController {

    async index (request: FastifyRequest<{ Querystring: ListLeadsQuery }>, reply: FastifyReply) {

        const repository = new LeadsRepository();
        const service = new ListLeadsService(repository);

        const { page = 1, limit = 10, email, startDate, endDate } = request.query;

        const response = await service.execute({
            page: Number(page),
            limit: Number(limit),
            email,
            startDate,
            endDate
        });

        return reply.status(200).send(response);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {

        const { name, email, phone, consent } = request.body as CreateLeadDTO;

        const repository = new LeadsRepository();
        const service = new CreateLeadService(repository);

        const response = await service.execute({
            name,
            email,
            phone,
            consent
        })

        return reply.status(200).send(response);
    }

    async export(request: FastifyRequest<{ Querystring: LeadsExportQuery }>,reply: FastifyReply) {
        reply.header('Content-Type', 'text/csv');
        reply.header(
            'Content-Disposition',
            'attachment; filename="leads.csv"'
        );

        const { email, startDate, endDate } = request.query;

        const repository = new LeadsRepository();
        const service = new CsvExportLeadService(repository);

        await service.exportLeads({ reply, email, startDate, endDate });
    }
}