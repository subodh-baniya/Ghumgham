import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sendEmail = async (
  to: string,
  subject?: string,
  html?: string,
): Promise<any> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 587,
      secure: false, // false for 587 (STARTTLS)
      auth: {
        user: process.env.GMAIL_USER as string,
        pass: process.env.GMAIL_PASS as string
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_USER as string,
      to,
      subject: subject || "Welcome to Travallee!",
      html:
        html ||
        "<p>Thank you for joining Travallee. We are excited to have you on board!</p>",
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email",
    );
  }
};

export { sendEmail };
