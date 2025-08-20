import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URL;

  if (!uri) {
    throw new Error("❌ MONGODB_URL is undefined");
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed", error);
  }
};

export default connectDB;
