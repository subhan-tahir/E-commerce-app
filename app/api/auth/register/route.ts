import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import userMOdel from "@/app/models/user.model";
import connectDB from "@/app/lib/mongodb";
import { generateVerificationCode, sendEmail } from "@/app/services/emailService";

export async function POST(request: Request) {
    try {
        connectDB();
        const body = await request.json();
        const { username, email, password, confirmPassword,phone,address } = body
        //user find
        const userExist = await userMOdel.findOne({ email });
        if (userExist) {
            return NextResponse.json({ message: "User already exist", status: 400 });
        }
        console.log(body);
        //if any field is missing
        if (!username || !email || !password || !confirmPassword || !phone || !address) {
            return  NextResponse.json({ message: "❌ Required fields are missing", status: 400 });
        }
        //mathching password and confirm password
        if (password !== confirmPassword) {
            return  NextResponse.json({ message: "❌ Passwords does not match",  status: 400 });
        }

        //check email validity
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response("❌ Invalid email", { status: 400 });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        //save user to database
        const newUser = {
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
            isVerified: false,
            verifyToken: null,
            verifyTokenExpiry: null,
        };
        const user = await userMOdel.create(newUser);

        console.log('user created successfully', user);
        const verificationCode = generateVerificationCode();
        //send email
        const emailOptions = {
            to: email,
            subject: "Welcome to our app",
            text: `Your verification code is ${verificationCode}`,
            html: `<p>Your verification code is ${verificationCode}</p>`,
            verificationCode: verificationCode,
        }
    await sendEmail(emailOptions);


        return NextResponse.json({ message: "User registered successfully", status: 201, success: true });
    } catch (error) {
        console.error(error);
        return new Response("❌Invernal server Error", { status: 500 });
    }
}


export async function GET() {
    return new Response("✅ This is the GET route — API is working!");
}