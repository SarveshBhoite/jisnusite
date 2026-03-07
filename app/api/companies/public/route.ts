import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const query = searchParams.get("query");

    const skip = (page - 1) * limit;

    // 1. Build the match filter
    let matchFilter: any = { status: "verified" };

    if (category && category !== "All Categories") {
      matchFilter.category = category;
    }

    if (location && location !== "All Locations") {
      matchFilter.location = { $regex: location, $options: "i" };
    }

    if (query) {
      matchFilter.$or = [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } }
      ];
    }

    const companies = await Company.aggregate([
      // 1. Initial Filtering
      { $match: matchFilter }, 
      
      // 2. Look into the 'servicerequests' collection
      {
        $lookup: {
          from: "servicerequests",
          localField: "email",
          foreignField: "email",
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
                  { $eq: ["$planType", "paid"] },
                  { $gt: [
                    { $size: { 
                      $filter: {
                        input: "$history",
                        as: "item",
                        cond: { $eq: ["$$item.status", "Completed"] }
                      }
                    }}, 
                    0
                  ]}
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
      
      // 5. Pagination
      { $skip: skip },
      { $limit: limit },

      // 6. Clean up data before sending to frontend
      { $project: { history: 0 } }
    ]);

    // Optional: Get total count for pagination info if needed
    // const totalCount = await Company.countDocuments(matchFilter);

    return NextResponse.json({
      success: true,
      data: companies,
      page,
      limit
    });
  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}