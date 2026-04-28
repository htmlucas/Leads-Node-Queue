// src/shared/providers/mail/mail.service.ts
import nodemailer from "nodemailer";
import "dotenv/config";

if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS) {
  throw new Error("Missing Mailtrap env variables");
}

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});