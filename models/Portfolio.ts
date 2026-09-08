import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  serviceName: { type: String, required: true }, // e.g. "Website Development"
  description: { type: String },
  image: { type: String }, // Company logo ya project screenshot
  logo: { type: String }, // Optional distinct logo image URL
  projectUrl: { type: String }, // Link to project live site or detail page
  projectType: { type: String, enum: ["tech", "non-tech"], default: "tech" }, // Category classification
  completedDate: { type: Date, default: Date.now },
  category: { type: String }
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);