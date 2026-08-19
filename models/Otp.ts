import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // Auto delete after 10 mins (600s)
});

const Otp = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);

export default Otp;
