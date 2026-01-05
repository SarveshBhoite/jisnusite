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
  password: { type: String, required: true },
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
  workingHours: [{ type: String, default: [] }], // E.g., "Mon-Fri: 9am - 6pm"
  plan: { type: String, default: "Standard" },
  status: { type: String, default: "pending" }, 
  planType: { 
    type: String, 
    enum: ['free', 'paid'], 
    default: 'free' 
  },
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);