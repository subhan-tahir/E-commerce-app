import nodemailer from "nodemailer";
import { EmailOptions } from "../types";

export const sendEmail = async (options: EmailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com', // Gmail's SMTP server
          port: 465, // SSL port for Gmail
            secure: true,
            auth: {
                user: process.env.EMAIL_SERVER_USER, 
                pass: process.env.EMAIL_SERVER_PASSWORD, 
            },
        });
        const verificationCode = generateVerificationCode();
        const mailOptions = {
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
            verificationCode: verificationCode,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to: ${options.to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

//generate verification code
export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
