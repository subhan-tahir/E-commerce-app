import { sendEmail } from "@/app/services/emailService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
       try {
              const body = await request.json();
              const { message, email } = body;

              if (!message || !email) {
                     return NextResponse.json({ message: "❌ Required fields are missing", status: 400 }, { status: 400 });
              }
              await sendEmail(
                     "contact-us", { to: email, subject: "Contact Us Form Submission", text: message })
             

              return NextResponse.json({ message: "✅ Contact form submitted successfully", status: 200 }, { status: 200 });
       }
       catch (error) {
              console.error('Error processing contact form:', error);
              return NextResponse.json({ message: "❌ Internal server error", status: 500 }, { status: 500 });
       }
}