import connectDB from "@/app/lib/mongodb";
import userModel from "@/app/models/user.model";
import { NextResponse } from "next/server";
import { sendEmail } from "@/app/services/emailService";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "❌ Email is required", status: 400 },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "❌ User not found", status: 404 },
        { status: 404 }
      );
    }

    // Send reset email
    const emailResult = await sendEmail("reset-password", { to: email });
    console.log("Email sent:", emailResult);
    // Save the reset token to the user's record
    user.resetToken = emailResult.resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // Token expires in 1 hour
    await user.save();
    if (user) {
      console.log("Reset token saved for user:", { success: true });
    }
    else {
      console.log("Failed to save reset token for user:", { success: false });
    }

    return NextResponse.json({
      success: true,
      message: "Reset token sent successfully",
      status: 200,
      resetToken: emailResult.resetToken, // For testing; remove in production
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "❌ Server error", status: 500 },
      { status: 500 }
    );
  }
}