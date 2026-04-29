// src/shared/providers/mail/mail.service.ts
import nodemailer from "nodemailer";
import "dotenv/config";
import { renderTemplate } from './render-template'

if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS) {
  throw new Error("Missing Mailtrap env variables");
}

export class MailService {
  private transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  })

  async sendNewLeadNotification(data: any) {
    const html = renderTemplate('new-lead-notification', data)

    await this.transporter.sendMail({
      from: '"LeadFlow" <no-reply@leadflow.com>',
      to: 'vendas@empresa.com',
      subject: 'Novo lead recebido 🚀',
      html
    })
  }

  async sendWelcomeEmail(data: any) {
    const html = renderTemplate('welcome-lead', data)

    await this.transporter.sendMail({
      to: data.email,
      subject: 'Recebemos seu cadastro 🚀',
      html
    })
  }
}