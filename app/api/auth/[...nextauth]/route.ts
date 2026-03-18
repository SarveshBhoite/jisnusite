import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import Company from "@/models/Company";
import Employee from "@/models/Employee";
import bcrypt from "bcryptjs";
import { normalizePermissions } from "@/lib/employee-permissions";

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
        const email = credentials.email.toLowerCase().trim();

        const company = await Company.findOne({ email }).select("+password");
        if (company) {
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
            permissions: [],
          };
        }

        const employee = await Employee.findOne({ email })
          .select("+password isActive permissions name email")
          .lean();
        if (!employee || !employee.password) {
          throw new Error("No account found with this email");
        }
        if (!employee.isActive) {
          throw new Error("Your employee account is inactive");
        }

        const isEmployeePasswordCorrect = await bcrypt.compare(
          credentials.password,
          employee.password as string
        );
        if (!isEmployeePasswordCorrect) throw new Error("Invalid password");

        const employeePermissions = normalizePermissions(employee.permissions as any);
        return {
          id: String(employee._id),
          name: employee.name,
          email: employee.email,
          role: "employee",
          permissions: employeePermissions,
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
        token.permissions = Array.isArray(user.permissions) ? user.permissions : [];
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.permissions = Array.isArray(token.permissions) ? token.permissions : [];
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
