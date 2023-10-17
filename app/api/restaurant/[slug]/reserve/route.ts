import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { times } from "../../../../../data";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const { day, time, partySize } = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );

  if (!day || !time || !partySize) {
    return new NextResponse("Invalid data provided", {
      status: 400,
    });
  }

  return NextResponse.json({ slug, day, time, partySize });
}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-05-27&time=15:00:00.000Z&partySize=4
