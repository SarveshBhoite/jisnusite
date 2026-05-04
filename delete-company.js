const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jisnusite';

// Define Company schema
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  detailedOverview: { type: String },
  location: { type: String },
  website: { type: String },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 1 },
  whatsapp: { type: String },
  email: { type: String },
  password: { type: String, required: true, select: false },
  logo: { type: String },
  gallery: [{ type: String }],
  services: [{ title: String, desc: String }],
  inclusions: [{ type: String }],
  social: {
    instagram: String,
    linkedin: String,
    twitter: String,
    facebook: String,
  },
  workingHours: [{ type: String, default: [] }],
  plan: { type: String, default: 'Standard' },
  status: { type: String, default: 'pending' },
  planType: {
    type: String,
    enum: ['free', 'paid'],
    default: 'free',
  },
  role: {
    type: String,
    enum: ['client', 'admin'],
    default: 'client',
  },
  listedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listedByName: { type: String },
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);

// Delete function
async function deleteCompanyData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Find and delete companies with the specific name
    const companyName = 'kTyZCHMOJatYVVixmI';
    const result = await Company.deleteMany({ name: companyName });

    console.log(`✓ Deleted ${result.deletedCount} company/companies with name: ${companyName}`);

    // Verify deletion
    const remaining = await Company.countDocuments({ name: companyName });
    console.log(`✓ Remaining companies with that name: ${remaining}`);

    await mongoose.connection.close();
    console.log('✓ Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

// Run the delete function
deleteCompanyData();
