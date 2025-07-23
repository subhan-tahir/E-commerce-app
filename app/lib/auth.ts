import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/lib/mongodb";
import userModel from "@/app/models/user.model";
import bcrypt from "bcrypt";

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

          return {
            id: user._id.toString(),
            name: user.username || user.email.split("@")[0],
            email: user.email,
            profileImage: user.profileImage as string || "",
            phone: user.phone || "",
            address: user.address || "",
          };
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
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.profileImage = user.profileImage;
        token.phone = user.phone;
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.profileImage = token.profileImage || "";
        session.user.phone = token.phone || "";
        session.user.address = token.address || "";
        session.accessToken = token.sub;
        try {
          await connectDB();
          const user = await userModel.findById(token.id).select("username email phone address profileImage");
          if (user) {
            session.user.name = user.username || user.email.split("@")[0];
            session.user.email = user.email;
            session.user.phone = user.phone || "";
            session.user.address = user.address || "";
            session.user.profileImage = user.profileImage || "";
          }
        } catch (error) {
          console.error("Error fetching user data for session:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};