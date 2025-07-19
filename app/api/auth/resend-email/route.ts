import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/app/lib/mongodb';
import UserModel from '@/app/models/user.model';
import VerificationTokenModel from '@/app/models/verificationToken.model';
import { generateVerificationCode, sendEmail } from '@/app/services/emailService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await dbConnect();
    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Generate and send verification code
    const verificationCode = generateVerificationCode();
    await sendEmail({
      text: `Your verification code is: ${verificationCode}`,
      to: email,
      subject: 'Verify Your EStore Account',
      html: `
        <p>Welcome to EStore!</p>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>Please enter this code to verify your account. It expires in 24 hours.</p>
      `,
    });

    // Store verification code
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await VerificationTokenModel.findOneAndDelete({ email: email.toLowerCase() });
    await VerificationTokenModel.create({
      email: email.toLowerCase(),
      code: verificationCode,
      expires,
    });

    return res.status(200).json({ message: 'Verification code sent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}