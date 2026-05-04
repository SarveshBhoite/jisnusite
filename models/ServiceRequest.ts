import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  whatsapp: { type: String, required: false},
  services: [{
    id: String,
    name: String,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  message: { type: String },
  status: { 
    type: String, 
    enum: ["New", "In Progress", "Completed"], 
    default: "New" 
  },
  date: { type: Date, default: Date.now }
}, { timestamps: true, strict: false });

// Add indexes for performance
ServiceRequestSchema.index({ email: 1 });
ServiceRequestSchema.index({ status: 1 });

if (mongoose.models.ServiceRequest) {
  delete mongoose.models.ServiceRequest;
}
export default mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", ServiceRequestSchema);