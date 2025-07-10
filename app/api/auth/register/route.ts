import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import userMOdel from "@/app/models/user.model";
import connectDB from "@/app/lib/mongodb";

export async function POST(request: Request) {
    try {
        connectDB();
        const body = await request.json();
        const { username, email, password, confirmPassword } = body
        console.log(body);
        //if any field is missing
        if (!username || !email || !password || !confirmPassword) {
            return new Response("❌ Required fields are missing", { status: 400 });
        }
        //mathching password and confirm password
        if (password !== confirmPassword) {
            return new Response("❌ Passwords does not match", { status: 400 });
        }

        //check email validity
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response("❌ Invalid email", { status: 400 });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //save user to database
        const user = await userMOdel.create({ username, email, password: hashedPassword });
        console.log('user created successfully',user);

        return NextResponse.json({ message: "User registered successfully", status: 201, success: true });     
    } catch (error) {
        console.error(error);
        return new Response("❌Invernal server Error", { status: 500 });
    }   
}


export async function GET() {
    return new Response("✅ This is the GET route — API is working!");
}