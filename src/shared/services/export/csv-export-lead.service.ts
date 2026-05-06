
import { LeadsRepository } from '@/modules/leads/repositories/leads.repository';
import { stringify } from 'csv-stringify';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';

export class CsvExportLeadService {

    constructor(private leadRepository: LeadsRepository) {}
    
  async exportLeads(reply: any) {
    let cursor: number | undefined = undefined;
    const batchSize = 500;
    const repo = this.leadRepository;

    const csvStream = stringify({
      header: true,
      columns: [
        { key: 'id', header: 'ID' },
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
      ],
    });

    // stream manual
    const readable = new Readable({
      objectMode: true,
      async read() {
        try{

            const leads = await repo.findForExport(
                cursor,
                batchSize
            );

            if (leads.length === 0) {
                this.push(null);
                return;
            }

            for (const lead of leads) {
                this.push(lead);
            }

            cursor = leads[leads.length - 1].id;

        } catch(err: any) {
            this.destroy(err);
        }
      },
    });

     (readable as any).leadRepository = this.leadRepository;

    await pipeline(
      readable,
      csvStream,
      reply.raw // envia direto pro cliente
    );
  }
}