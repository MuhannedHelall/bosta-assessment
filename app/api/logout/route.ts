import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return response;
}
