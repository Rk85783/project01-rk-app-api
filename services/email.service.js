// https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee

import nodemailer from "nodemailer";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Recreate __dirname in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  secure: true
});

export const sendMail = async (data, emailTemplateName) => {
  // Render the email template with EJS
  const emailTemplate = await ejs.renderFile(join(__dirname, "../views", emailTemplateName), data.values);

  const mailData = {
    from: process.env.EMAIL_SENDER,
    to: data.to,
    subject: data.subject,
    html: emailTemplate
  };

  try {
    await transporter.sendMail(mailData);
    console.log("transporter.sendMail(): success");
  } catch (error) {
    console.log("transporter.sendMail(): error : ", error);
  }
};
