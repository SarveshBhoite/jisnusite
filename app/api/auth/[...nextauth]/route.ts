import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        await connectDB();
        
        const company = await Company.findOne({ email: credentials.email });
        if (!company) throw new Error("No company found with this email");

        let userRole = company.role || "client";
if (company.email === "info.jdsolutions2018@gmail.com") {
    userRole = "admin";
}

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password, 
          company.password
        );
        
        if (!isPasswordCorrect) throw new Error("Invalid password");

        return {
          id: company._id.toString(),
          name: company.name,
          email: company.email,
          role: userRole,
        };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };