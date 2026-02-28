import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ token: data.token });

  response.cookies.set("token", data.token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
