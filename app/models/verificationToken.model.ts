import mongoose, { Schema } from 'mongoose';

const verificationTokenSchema = new Schema({
  email: { type: String, required: true, index: true },
  code: { type: String, required: true },
  expires: { type: Date, required: true },
});

export default mongoose.models.VerificationToken || mongoose.model('VerificationToken', verificationTokenSchema);