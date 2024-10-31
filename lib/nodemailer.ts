import nodemailer from "nodemailer";
import { render } from "@react-email/render";

const transporter = nodemailer.createTransport({
  host: "localhost.net",
  port: 25,
  secure: false,
  auth: {
    user: "support@localhost.net",
    pass: "4663789",
  },
});

interface SendMailProp {
  from: string | "support@localhost.net";
  to: string | "admin";
  subject: "";
  template: React.ReactElement;
}

export async function sendMail({ from, to, subject, template }: SendMailProp) {
  const emailHtml = await render(template);

  await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: emailHtml,
  });
}
