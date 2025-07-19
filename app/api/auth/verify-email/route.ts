import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import UserModel from '@/app/models/user.model';
import VerificationTokenModel from '@/app/models/verificationToken.model';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json({ message: 'Email and code are required', success: false }, { status: 400 });
    }

    await dbConnect();
    const verificationToken = await VerificationTokenModel.findOne({
      email: email.toLowerCase(),
      code,
    });

    if (!verificationToken) {
      return NextResponse.json({ message: 'Invalid or incorrect verification code', success: false }, { status: 400 });
    }

    if (verificationToken.expires < new Date()) {
      await VerificationTokenModel.deleteOne({ email: email.toLowerCase() });
      return NextResponse.json({ message: 'Verification code has expired', success: false }, { status: 400 });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ message: 'User not found', success: false }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'User is already verified', success: false }, { status: 400 });
    }

    await UserModel.updateOne({ email: email.toLowerCase() }, { $set: { isVerified: true } });
    await VerificationTokenModel.deleteOne({ email: email.toLowerCase() });

    return NextResponse.json({ message: 'Email verified successfully', success: true }, { status: 200 });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}