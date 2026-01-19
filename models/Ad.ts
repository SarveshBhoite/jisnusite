
import mongoose from "mongoose";

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  colorCode: { type: String, default: "#2563eb" }, // Admin can pick a color
  link: { type: String }, // Clicking the ad goes here
  active: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Ad || mongoose.model("Ad", AdSchema);