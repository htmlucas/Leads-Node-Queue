import { LeadsRepository } from "../repositories/leads.repository";


export class ListLeadsService {
    constructor(private leadsRepository: LeadsRepository) {}

    async execute() {
        return this.leadsRepository.findAll();
    }
}