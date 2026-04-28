import { ConflictError } from "@/shared/errors/conflict-error";
import { CreateLeadDTO } from "../dtos/create-lead.dto";
import { LeadsRepository } from "../repositories/leads.repository";
import { createLeadSchema } from "../schemas/create-lead.schema";
import { isPhone } from "brazilian-values";


export class CreateLeadService {
    constructor(private leadRepository: LeadsRepository) {}

    async execute( data: CreateLeadDTO) {

        const parsed: CreateLeadDTO = createLeadSchema.parse(data)

        const existing = await this.leadRepository.findByEmail(parsed.email);

        if (existing) {
            throw new ConflictError('Email já inscrito');
        }

        const lead = await this.leadRepository.create(parsed);

        return lead;
    }
}