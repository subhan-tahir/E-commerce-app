// app/api/auth/[...nextauth]/options.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/lib/mongodb";
import userModel from "@/app/models/user.model";
import bcrypt from "bcrypt";
import { User } from "../types";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectDB();
          const user = await userModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordMatch) {
            throw new Error("Invalid credentials");
          }

          if (!user.isVerified) {
            throw new Error(
              `User not verified. Please verify your email at /auth/verify-email?email=${encodeURIComponent(
                credentials.email
              )}`
            );
          }

          return {
            id: user._id.toString(),
            username: user.username || user.email.split("@")[0],
            email: user.email,
            profileImage: user.profileImage || "",
            phone: user.phone || "",
            address: user.address || "",
            isVerified: user.isVerified,
          } as User;
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {

    async jwt({ token, user, account }) {
      console.log('provider ------', account)
      console.log("JWT Callback - token:", token);
      if (user) {
        token.id = user.id;
        token.email = user.email;

        // Narrow to CustomUser before using custom fields
        const customUser = user as User;

        if (customUser.username) {
          token.username = customUser.username;
        }
        token.profileImage = customUser.profileImage;
        token.picture = token.picture;
        token.phone = customUser.phone;
        token.address = customUser.address;
        token.isVerified = customUser.isVerified;

      }
      if (account) {
        token.provider = account.provider; // github, google, credentials, etc.
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session Callback - token:", token);

      console.log('provider in session ------', token.provider)
      session.provider = token.provider;
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.username = token.username || token.name;
        session.user.profileImage = token.profileImage || token.picture || "";
        session.user.phone = token.phone || "";
        session.user.address = token.address || "";
        session.user.isVerified = token.isVerified;
        session.accessToken = token.sub;
        try {
          await connectDB();
          const user = await userModel
            .findById(token.id)
            .select("username email phone address profileImage isVerified");
          if (user) {
            session.user.username = user.username || user.email.split("@")[0];
            session.user.email = user.email;
            session.user.phone = user.phone || "";
            session.user.address = user.address || "";
            session.user.profileImage = user.profileImage || "";
            session.user.isVerified = user.isVerified;
          }
        } catch (error) {
          console.error("Error fetching user data for session:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
