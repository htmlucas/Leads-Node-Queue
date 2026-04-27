import { FastifyReply, FastifyRequest } from "fastify";
import { CreateLeadDTO } from "../dtos/create-lead.dto";
import { CreateLeadService } from "../services/create-lead.service";
import { ListLeadsService } from "../services/list-leads.services";
import { LeadsRepository } from "../repositories/leads.repository";

export class LeadsController {

    async index (request: FastifyRequest, reply: FastifyReply) {

        const repository = new LeadsRepository();
        const service = new ListLeadsService(repository);

        const response = await service.execute();

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
}