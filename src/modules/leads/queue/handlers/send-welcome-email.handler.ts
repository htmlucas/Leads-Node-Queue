import { MailService } from "@/shared/providers/mail/mail.service";

const mailService = new MailService();

export async function sendWelcomeEmailHandler(lead: any) {
  await mailService.sendWelcomeEmail(lead);
}