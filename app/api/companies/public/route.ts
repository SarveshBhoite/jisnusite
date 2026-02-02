import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();

    const companies = await Company.aggregate([
      // 1. Only get verified companies
      { $match: { status: "verified" } }, 
      
      // 2. Look into the 'servicerequests' collection
      {
        $lookup: {
          from: "servicerequests",   // MongoDB automatically names the collection this
          localField: "email",       // Company email
          foreignField: "email",     // ServiceRequest email
          as: "history"
        }
      },
      
      // 3. Logic to determine if they are 'paid'
      {
        $addFields: {
          planType: {
            $cond: {
              if: { 
                $or: [
                  { $eq: ["$planType", "paid"] }, // Already marked paid in database
                  { $gt: [
                    { $size: { 
                      $filter: {
                        input: "$history",
                        as: "item",
                        cond: { $eq: ["$$item.status", "Completed"] }
                      }
                    }}, 
                    0
                  ]} // OR has a Completed service request
                ]
              },
              then: "paid",
              else: "free"
            }
          }
        }
      },
      
      // 4. Sorting: Paid companies at the top
      { $sort: { planType: 1, createdAt: -1 } },
      
      // 5. Clean up data before sending to frontend
      { $project: { history: 0 } }
    ]);

    return NextResponse.json(companies);
  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}