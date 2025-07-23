// app/api/auth/login/route.ts
import connectDB from "@/app/lib/mongodb";
import userModel from "@/app/models/user.model";
import { setAuthCookie } from "@/app/utils/setAuthCookie";
import bcrypt from 'bcrypt';
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { email, password } = body;
    console.log('Request body:', body);

    if (!email || !password) {
      return NextResponse.json({ message: "❌ Required fields are missing", status: 400 }, { status: 400 });
    }

    // Email validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "❌ Invalid email", status: 400 }, { status: 400 });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    const token = await getToken({ req: request });
    if (!user) {
  
      return NextResponse.json({ message: "❌ Invalid credentials", status: 401, success: false }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "❌ Invalid credentials", status: 401, success: false }, { status: 401 });
    }

    // Prepare user object for NextAuth (exclude password and MongoDB metadata)
    const userData = {
      id: user._id.toString(), // Convert ObjectId to string for NextAuth
      name: user.username || user.email.split('@')[0], // Fallback to email base if no name
      email: user.email,
      token: token // Include token if needed
      // Add other fields as needed (e.g., image: user.image)
    };

    // Optionally set a custom cookie if needed, but NextAuth handles JWT
    // await setAuthCookie({ id: user._id.toString() });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      status: 200,
      user: userData, // Return only the sanitized user data
    }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ message: "❌ Internal server error", status: 500 }, { status: 500 });
  }
}