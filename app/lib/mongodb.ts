import mongoose from "mongoose";

const connectDB = async () => {
      const uri = process.env.MONGODB_URL;

  if (!uri) {
    throw new Error("❌ MONGODB_URL is undefined");
  }

    try {
        await mongoose.connect(process.env.MONGODB_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log(process.env.MONGODB_URL);
        console.error('Database connection failed');
     
    }
};

export default  connectDB;