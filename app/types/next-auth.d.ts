import NextAuth from "next-auth";

declare module "next-auth" {
  type SessionPermission = {
    module: string;
    canView: boolean;
    canAdd: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  };

  interface Session {
    user: {
      id: string;
      role: string;
      permissions?: SessionPermission[];
      name?: string | null;
      email?: string | null;
    };
  }
}
