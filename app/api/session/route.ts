// app/api/session/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("Session data:", session);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    user: session.user,
    accessToken: session.accessToken, // Return the JWT
  });
}