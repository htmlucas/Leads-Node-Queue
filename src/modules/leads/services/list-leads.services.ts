import { LeadsRepository } from "../repositories/leads.repository";

interface IRequest {
  page: number;
  limit: number;
  email?: string;
  startDate?: string;
  endDate?: string;
}

export class ListLeadsService {
    constructor(private leadsRepository: LeadsRepository) {}

    async execute( { page, limit, email, startDate, endDate }: IRequest) {
        const offset = ( page - 1 ) * limit;

        const filters = {
            email,
            startDate,
            endDate
        }

        const [leads, total] = await Promise.all([
            this.leadsRepository.findAll({ offset, limit, filters }),
            this.leadsRepository.count(),
        ]);
        
        return {
            data: leads,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}