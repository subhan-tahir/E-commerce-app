import nodemailer from "nodemailer";
import { randomBytes } from "crypto";

interface EmailOptions {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  [key: string]: any;
  resetToken?: string; // For reset password emails
  // Allow additional fields like verificationCode or resetToken
}

type EmailType = "reset-password" | "verification" | "login" | "contact-us";

export const sendEmail = async (type: EmailType, options: EmailOptions) => {

    console.log(`Sending ${type} email to:`, options.to, "with options:", options);
    console.log("Email options:", options);
    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
      throw new Error("❌ EMAIL_SERVER_USER or EMAIL_SERVER_PASSWORD is undefined");
    }
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Define email content based on type
    let mailOptions: EmailOptions;
    const currentDate = new Date().toLocaleString();
    switch (type) {
     case "contact-us":
        const { to, text } = options;
        if (!to || !text) {
          throw new Error("Email and message are required for contact-us email");
        }
        mailOptions = {
          to: process.env.EMAIL_SERVER_USER, // Default to app's email if not provided
          subject: options.subject || "Contact Us Form Submission",
          text: `New Contact Form Submission\n\nEmail: ${to}\nMessage: ${text}\nSubmitted At: ${currentDate}\n\nPlease reply to the user at ${to}.`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Contact Us Form Submission</title>
              <style>
                body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
                .header { background-color: #007bff; color: white; padding: 10px; text-align: center; }
                .content { padding: 20px; background-color: white; border-radius: 5px; }
                .field { margin-bottom: 15px; display:flex; gap: 10px; align-items: center; }
                .field label { font-weight: bold; }
                .footer { text-align: center; font-size: 12px; color: #777; margin-top: 20px; }
                a { color: #007bff; text-decoration: none; }
                p{margin-block: 0px !important;}
                .msg-2045860566507447497 p {margin-block: 0px !important;}
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Contact Us Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <label>Email:</label>
                    <p><a href="mailto:${to}">${to}</a></p>
                  </div>
                  <div class="field">
                    <label>Message: </label>
                    <p>${text}</p>
                  </div>
                  <div class="field">
                    <label>Submitted At:</label>
                    <p>${currentDate}</p>
                  </div>
                </div>
                <div class="footer">
                  <p>Please reply to the user at <a href="mailto:${to}">${to}</a>.</p>
                  <p>Powered by E-store</p>
                </div>
              </div>
            </body>
            </html>
          `,
        };
        break;
      case "reset-password":
        const resetToken = randomBytes(32).toString("hex"); // Secure token
        mailOptions = {
          to: options.to,
          subject: "Password Reset Request",
          text: `Use this token to reset your password: ${resetToken}`,
          html: `<p>Click <a href="${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}">here</a> to reset your password.</p>`,
          resetToken, // Include token for further processing
        };
        break;

      case "verification":
       
        mailOptions = {
          to: options.to,
          subject: "Email Verification",
          text: `Your verification code is: ${options.text}. Please enter this code to verify your account.`,
          html: `<p>Your verification code is: <strong>${options.text}</strong></p>`,
        };
        break;
      case "login":
        mailOptions = {
          to: options.to,
          subject: "Login Notification",
          text: "You have successfully logged in.",
          html: "<p>You have successfully logged in to your account.</p>",
        };
        break;
      default:
        throw new Error("Invalid email type");
    }

    // Merge custom options with defaults
    const finalMailOptions = {
      from: process.env.EMAIL_FROM || '"Your App" <no-reply@yourapp.com>',
      ...mailOptions,
      ...options, // Allow overriding defaults with custom options
    };

    await transporter.sendMail(finalMailOptions);
    console.log(`Email sent successfully to: ${options.to} for ${type}`);
    return { success: true, ...mailOptions }; // Return additional data like token or code
  } catch (error) {
    console.error(`Error sending ${type} email:`, error);
    throw new Error(`Failed to send ${type} email`);
  }
};

// Generate a 6-digit verification code
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};