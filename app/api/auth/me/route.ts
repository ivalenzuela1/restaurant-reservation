import { ThemeProvider } from "@emotion/react";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";

import { headers } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const headersList = headers();
  // get token from request header
  const bearerToken = headersList.get("Authorization") as string;
  const token = bearerToken.split(" ")[1];

  // decode token to get payload
  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return new NextResponse("Unauthorized request (no email)", {
      status: 400,
    });
  }

  // Fetch user from DB using email from payload
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    // select fields (we should never return password)
    select: {
      id: true,
      first_name: true,
      last_name: true,
      phone: true,
      city: true,
      email: true,
    },
  });

  if (!user) {
    return new NextResponse("User not found!", {
      status: 401,
    });
  }

  return NextResponse.json({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    city: user.city,
    phone: user.phone,
  });
}
