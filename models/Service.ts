import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  iconName: { type: String, default: "Zap" }, // Icon ka naam string mein save karenge
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);