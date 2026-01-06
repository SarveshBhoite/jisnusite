import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Web Development
  description: { type: String, required: true },
  basePrice: { type: Number, required: true }, // Original Price (MRP)
  discountPrice: { type: Number, required: true }, // Selling Price
  inclusions: [{ type: String }], // Points like: "Free Domain", "5 Email IDs"
  icon: { type: String, default: "Layout" },
  status: { type: String, enum: ["active", "hidden"], default: "active" }
}, { timestamps: true });

export default mongoose.models.Services || mongoose.model("Services", ServiceSchema);