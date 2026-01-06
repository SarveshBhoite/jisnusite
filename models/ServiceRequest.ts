import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema({
 name: { type: String, required: true },     // Changed from company
  whatsapp: { type: String, required: true },
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

if (mongoose.models.ServiceRequest) {
  delete mongoose.models.ServiceRequest;
}
export default mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", ServiceRequestSchema);