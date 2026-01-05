import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  )

  // Cookie delete karein (aapka jo bhi cookie name hai, jaise 'token')
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // Past date se cookie expire ho jayegi
  })

  return response
}