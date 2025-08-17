import connectDB from "@/app/lib/mongodb";
import userModel from "@/app/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    console.log("requset body:", request.body);
    await connectDB();
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: "❌ Token and new password are required", status: 400 },
        { status: 400 }
      );
    }

    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, // Check if token is not expired
    });

    if (!user) {
      return NextResponse.json(
        { message: "❌ Invalid or expired token", status: 400 },
        { status: 400 }
      );
    }

    // Hash the new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpiry = undefined; // Clear the reset token expiry
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password reset successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "❌ Server error", status: 500 },
      { status: 500 }
    );
  }
}