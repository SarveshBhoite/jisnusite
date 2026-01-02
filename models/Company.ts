import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String }, // Quick Status/Bio
  detailedOverview: { type: String }, // The long textarea
  location: { type: String },
  website: { type: String },
  whatsapp: { type: String },
  email: { type: String },
  logo: { type: String },
  gallery: [{ type: String }], // Array of Base64 strings
  services: [{ title: String, desc: String }], // Updated to include desc
  inclusions: [{ type: String }],
  social: {
    instagram: String,
    linkedin: String,
    twitter: String,
    facebook: String,
  },
  plan: { type: String, default: "Standard" },
  status: { type: String, default: "pending" }, 
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);