import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Employee from "@/models/Employee";
import {
  EmployeeModule,
  PermissionAction,
  hasPermission,
} from "@/lib/employee-permissions";

type GuardResult = {
  ok: boolean;
  response?: NextResponse;
};
export async function requireAdminOnly(): Promise<GuardResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (session.user.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true };
}
export async function requireAdminOrEmployeePermission(
  module: EmployeeModule,
  action: PermissionAction = "view"
): Promise<GuardResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  // ✅ Admin full access
  if (session.user.role === "admin") {
    return { ok: true };
  }

  // ❌ Not employee
  if (session.user.role !== "employee" || !session.user.id) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  await dbConnect();

  const employee = await Employee.findById(session.user.id)
    .select("isActive permissions")
    .lean();

  if (!employee || !employee.isActive) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Inactive employee" },
        { status: 403 }
      ),
    };
  }

  const canAccess = hasPermission(employee.permissions as any, module, action);

  if (!canAccess) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "No permission" },
        { status: 403 }
      ),
    };
  }

  return { ok: true };
}
