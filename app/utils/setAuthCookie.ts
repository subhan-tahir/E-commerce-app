"use server";

import { cookies } from "next/headers";
import { signToken } from "./authToken";

// payload must be an object like { id: string }
export async function setAuthCookie(payload: object) {
  const token = signToken(payload);

  const cookieStore = await cookies(); // ✅ await here

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return token;
}
