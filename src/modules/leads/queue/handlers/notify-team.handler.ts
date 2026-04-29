import { MailService } from "@/shared/providers/mail/mail.service";

const mailService = new MailService();

export async function notifyTeamHandler(lead: any) {
  await mailService.sendNewLeadNotification(lead);
}