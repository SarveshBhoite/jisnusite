import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String }, // Quick Status/Bio
  detailedOverview: { type: String }, // The long textarea
  location: { type: String },
  website: { type: String },
  rating: {
    type: Number,
    default: 4.5, // Your default starting rating
  },
  totalReviews: {
    type: Number,
    default: 1, // Start with 1 to avoid division by zero
  },
  whatsapp: { type: String },
  email: { type: String },
  password: { type: String, required: true ,select: false },
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
  role: { 
    type: String, 
    enum: ['client', 'admin'], 
    default: 'client' 
  },
}, { timestamps: true });

// Add indexes for performance
CompanySchema.index({ status: 1 });
CompanySchema.index({ email: 1 });
CompanySchema.index({ category: 1 });
CompanySchema.index({ location: 1 });
CompanySchema.index({ planType: 1, createdAt: -1 });

export default mongoose.models.Company || mongoose.model("Company", CompanySchema);
