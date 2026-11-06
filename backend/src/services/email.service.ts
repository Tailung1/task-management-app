import nodemailer from "nodemailer";
import type { AppConfig } from "../config.js";

export function createEmailService(config: AppConfig) {
  const transporter = config.smtp
    ? nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.port === 465,
        requireTLS: config.smtp.port !== 465,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.password,
        },
      })
    : undefined;

  return {
    async sendPasswordResetEmail(email: string, resetUrl: string) {
      if (!transporter || !config.smtp) {
        throw new Error("SMTP is not configured.");
      }

      await transporter.sendMail({
        from: config.smtp.from,
        to: email,
        subject: "Reset your password",
        text: [
          "We received a request to reset the password for your account.",
          "",
          `Use this one-time link within 30 minutes: ${resetUrl}`,
          "",
          "If you did not request a password reset, you can ignore this email.",
        ].join("\n"),
        html: `<p>We received a request to reset the password for your account.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This one-time link expires in 30 minutes. If you did not request a password reset, you can ignore this email.</p>`,
      });
    },
  };
}
