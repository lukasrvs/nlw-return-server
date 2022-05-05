import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "56d6960c49acad",
    pass: "12af6a07db9ae0",
  },
});

export class NodemailerAdapter implements MailAdapter {
  
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Lucão <oi@lucao.com>",
      to: "Lucas Antônio <batata@gmail.com>",
      subject,
      html: body,
    });
  }
}