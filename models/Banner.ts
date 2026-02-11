import mongoose from "mongoose";

// models/Company.js
const bannerSchema = new mongoose.Schema({
  category: { type: String, required: true, lowercase: true }, // Store lowercase for easy matching
  bannerImage: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
  // ------------------------
});
export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);