import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import * as jose from "jose";

export async function middleware(request: NextRequest, response: NextResponse) {
  console.log("I AM THE MIDDLEWARE AND I WAS CALLED BEFORE ENDPOINT");
  const headersList = headers();
  // get token from request header
  const bearerToken = headersList.get("Authorization");

  if (!bearerToken) {
    return NextResponse.json({
      message: "Unauthorized request (no bearer)",
      status: 401,
    });
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return NextResponse.json({
      message: "Unauthorized request (no token)",
      status: 401,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // verify token
  try {
    await jose.jwtVerify(token, secret);
  } catch (e) {
    return NextResponse.json({
      message: "Unauthorized request (jwt)",
      status: 401,
    });
  }
}

// Only run middleware before this endpoint
export const config = {
  matcher: ["/api/auth/me"],
};
