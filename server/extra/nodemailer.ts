import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { SMTPError } from "nodemailer/lib/smtp-connection";
import logger from "@/lib/logger";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT!),
  secure: process.env.MAIL_SECURE == "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  debug: process.env.NODE_ENV === "development",
});

interface SendMailProp {
  from?: string | "support@localhost";
  to?: string | "admin";
  subject: string;
  template: React.ReactElement;
}

export async function sendMail({ from, to, subject, template }: SendMailProp) {
  try {
    const emailHtml = await render(template, {
      pretty: true,
    });

    var transport = await transporter.sendMail({
      from: `${process.env.NEXT_PUBLIC_APP_SHORT_NAME} ${process.env.NEXT_PUBLIC_SUPPORT_MAIL}`,
      to: to,
      subject: subject,
      html: emailHtml,
    });
    logger(transport.response);
  } catch (error) {
    console.error((error as SMTPError).message);
  }
}
