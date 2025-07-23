import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import connectDB from "@/app/lib/mongodb";
import userModel from "@/app/models/user.model";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    // Get session
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Connect to database
    await connectDB();

    // Parse FormData
    const formData = await req.formData();
    const file = formData.get("profileImage") as File | null;

    if (!file) {
      console.error("No file found in FormData");
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      console.error("Invalid file type:", file.type);
      return NextResponse.json({ error: "Only JPEG and PNG images are allowed" }, { status: 400 });
    }
    if (file.size > 2 * 1024 * 1024) {
      console.error("File too large:", file.size);
      return NextResponse.json({ error: "Image size must be less than 2MB" }, { status: 400 });
    }

    // Save file to public/uploads/
    const uploadPath = path.join(process.cwd(), "public/uploads");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}${path.extname(file.name)}`;
    const filePath = path.join(uploadPath, filename);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    const imageUrl = `/uploads/${filename}`;
    console.log("Uploaded image URL:", imageUrl);

    // Update user profile
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.error("User not found:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ imageUrl, success: true });
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}