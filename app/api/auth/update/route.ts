import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/auth";
import connectDB from "@/app/lib/mongodb";
import userModel from "@/app/models/user.model"; // Fixed typo in model name

export async function PUT(request: Request) {
  if (request.method !== "PUT") {
    return NextResponse.json({ message: "Method not allowed", status: 405 });
  }

  const session = await getServerSession(authOptions);
    console.log("Session data:", session); // Fixed session retrieval
  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const { username, email, phone, address } = body;

    // Validate input
    if (!username || !email) {
      return NextResponse.json({ message: "Username and email are required", status: 400 });
    }

    // Update user in the database
    const updatedUser = await userModel.findByIdAndUpdate(
      session.user.id, // Use session.user.id directly
      { username, email, phone, address }, // Include optional fields
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser, status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}