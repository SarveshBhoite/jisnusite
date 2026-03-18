import mongoose from "mongoose";
import { EMPLOYEE_MODULES } from "@/lib/employee-permissions";

const PermissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      enum: EMPLOYEE_MODULES,
      required: true,
    },
    canView: { type: Boolean, default: false },
    canAdd: { type: Boolean, default: false },
    canUpdate: { type: Boolean, default: false },
    canDelete: { type: Boolean, default: false },
  },
  { _id: false }
);

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    isActive: { type: Boolean, default: true },
    permissions: { type: [PermissionSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
