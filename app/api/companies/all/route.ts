import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';
import ServiceRequest from '@/models/ServiceRequest'; // Import your service model
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    // 1. Fetch Verified Companies and Completed Service Requests in parallel
    const [companies, completedServices] = await Promise.all([
      Company.find({ status: "verified" }).sort({ createdAt: -1 }).lean(),
      ServiceRequest.find({ status: "Completed" }).select('email').lean()
    ]);

    // 2. Create a Set of emails that have completed services for O(1) lookup speed
    const paidEmails = new Set(
      completedServices.map(s => s.email?.toLowerCase().trim())
    );

    // 3. Map through companies and inject the 'isActuallyPaid' boolean
    const processedCompanies = companies.map((company: any) => {
      const email = (company.email || "").toLowerCase().trim();
      
      // Determine if they are paid via DB field OR via completed service
      const isPaid = 
        company.planType === 'paid' || 
        company.plan === 'paid' || 
        paidEmails.has(email);

      return {
        ...company,
        isActuallyPaid: isPaid
      };
    });

    return NextResponse.json(processedCompanies);
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}