import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      address?: string | null;
      image?: string | null;
      profileImage: string | null ; // ✅ Custom field
    };
  }

  interface User {
    id: string;
    profileImage?: string | null; // ✅ For database user object
  }
}
