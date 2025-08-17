// app/api/auth/resend-email/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import userModel from '@/app/models/user.model';
import VerificationTokenModel from '@/app/models/verificationToken.model';
import { generateVerificationCode, sendEmail } from '@/app/services/emailService';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ message: 'Email is required', status: 400 });
    }

    const user = await userModel.findOne({ email: email.toLowerCase() });

    console.log('User found:', user);

    if (!user) {
      return NextResponse.json({ message: 'User not found', success: false }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'User is already verified', success: false }, { status: 400 });
    }

    // Generate and send verification code
    const verificationCode = generateVerificationCode();
    await sendEmail('verification', {
      to: email,
      subject: 'Resend Verification Code',
      text: `Your verification code is: ${verificationCode}. Please enter this code to verify your account.`,
    });

    // Store verification code
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

   const updateResult = await userModel.updateOne(
      { email: email.toLowerCase() },
      { $set: { verifyToken: verificationCode, verifyTokenExpiry: expires } },
      { runValidators: false } // Disable validation for this update
    );

    console.log('Update result:', updateResult);

    return NextResponse.json({ message: 'Verification code sent', success: true, status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('❌ Internal Server Error', { status: 500 });
  }
}