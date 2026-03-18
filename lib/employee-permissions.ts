export const EMPLOYEE_MODULES = [
  "manage-companies",
  "approvals",
  "services",
  "service-requests",
  "portfolio",
  "ads",
  "blog",
  "banner",
] as const;

export type EmployeeModule = (typeof EMPLOYEE_MODULES)[number];
export type PermissionAction = "view" | "add" | "update" | "delete";

export type EmployeePermission = {
  module: EmployeeModule;
  canView: boolean;
  canAdd: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

export function emptyPermission(module: EmployeeModule): EmployeePermission {
  return {
    module,
    canView: false,
    canAdd: false,
    canUpdate: false,
    canDelete: false,
  };
}

export function normalizePermissions(
  permissions?: Partial<EmployeePermission>[] | null
): EmployeePermission[] {
  const incoming = Array.isArray(permissions) ? permissions : [];
  const byModule = new Map<string, Partial<EmployeePermission>>();

  for (const permission of incoming) {
    if (permission?.module) {
      byModule.set(permission.module, permission);
    }
  }

  return EMPLOYEE_MODULES.map((module) => {
    const current = byModule.get(module);
    return {
      module,
      canView: Boolean(current?.canView),
      canAdd: Boolean(current?.canAdd),
      canUpdate: Boolean(current?.canUpdate),
      canDelete: Boolean(current?.canDelete),
    };
  });
}

export function resolveModuleFromPath(pathname: string): EmployeeModule | null {
  const prefix = "/dashboard/admin/";
  if (!pathname.startsWith(prefix)) return null;
  const section = pathname.slice(prefix.length).split("/")[0];
  if (!section) return null;
  return EMPLOYEE_MODULES.includes(section as EmployeeModule)
    ? (section as EmployeeModule)
    : null;
}

export function hasPermission(
  permissions: EmployeePermission[] | undefined,
  module: EmployeeModule,
  action: PermissionAction = "view"
): boolean {
  const target = permissions?.find((item) => item.module === module);
  if (!target) return false;
  if (action === "view") return target.canView;
  if (action === "add") return target.canAdd;
  if (action === "update") return target.canUpdate;
  return target.canDelete;
}
