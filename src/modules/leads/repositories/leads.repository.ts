import { prisma } from "@/lib/prisma";
import { Lead, Prisma } from '@/generated/prisma/client'

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

    async findAll(): Promise<Lead[]> {
        const leads = await prisma.lead.findMany();

        return leads;
    }
}