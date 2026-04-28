// src/shared/providers/mail/send-mail.ts
import { transporter } from "./mail.service";

export async function sendLeadEmail(lead: any) {
  await transporter.sendMail({
    from: '"Leads System" <no-reply@leads.com>',
    to: lead.email,
    subject: "Recebemos seu contato 🚀",
    html: `
      <h1>Olá, ${lead.name}</h1>
      <p>Recebemos seu interesse. Em breve entraremos em contato.</p>
    `,
  });
}