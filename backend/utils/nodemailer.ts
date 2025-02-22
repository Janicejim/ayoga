import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function sendEmail(toEmail: string, subject: string, content: string) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASS,
    },
  });
  try {
    await transport.sendMail({
      to: toEmail,
      subject: subject,
      html: `<div>
            <h4>Hello there,</h4>
            <p>${content}</p>
  
            <p>AYoga team</p>
            </div>
        `,
    });

  } catch (e) {
    console.log(e);
    return;
  }
}

export default sendEmail;
