import { prisma } from "@/lib/prisma";
import { Lead, Prisma } from '@/generated/prisma/client'

interface IFilters {
    email?: string;
    startDate?: string;
    endDate?: string;
}

interface IFindAll {
  offset: number;
  limit: number;
  filters: IFilters;
}

const leads: Lead[] = [];

export class LeadsRepository {

    async create(data: Prisma.LeadCreateInput): Promise<Lead> {
        const lead = await prisma.lead.create({
            data
        });

        return lead;
    }

    async findByEmail(email: string): Promise<Lead | null> {
        return prisma.lead.findUnique({
        where: { email }
        });
    }

    async findAll({ offset, limit, filters }: IFindAll ): Promise<Lead[]> {
        const leads = await prisma.lead.findMany({
            where: this.buildWhere(filters),
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: "desc"
            }
        });

        return leads;
    }

    private buildWhere(filters: IFilters){
        const where: any = {};

        if (filters.email) {
            where.email = {
                contains: filters.email,
                mode: "insensitive"
            };
        }

        if (filters.startDate || filters.endDate) {
            where.createdAt = {};

            if (filters.startDate) {
                where.createdAt.gte = new Date(filters.startDate);
            }

            if (filters.endDate) {
                where.createdAt.lte = new Date(filters.endDate)
            }
        }

        return where;
    }

    async count(){
        return prisma.lead.count();
    }

    async findForExport(cursor?: number, limit: number = 5) {
        return prisma.lead.findMany({
            take: limit,
            ...(cursor && {
                cursor: { id: cursor },
                skip: 1,
            }),
            orderBy: { id: 'asc' },
        });
    }
}