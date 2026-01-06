import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  serviceName: { type: String, required: true }, // e.g. "Website Development"
  description: { type: String },
  image: { type: String }, // Company logo ya project screenshot
  completedDate: { type: Date, default: Date.now },
  category: { type: String }
}, { timestamps: true });

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);