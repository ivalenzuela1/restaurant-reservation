import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      message: "Email is invalid",
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      message: "Password is invalid",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.message);
    }
  });

  if (errors.length) {
    return new NextResponse(JSON.stringify(errors[0]), { status: 400 });
  }

  const userWitEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userWitEmail) {
    return new NextResponse("Email or password is invalid (userWitEmail)", {
      status: 400,
    });
  }

  const isMatch = await bcrypt.compare(password, userWitEmail.password);

  if (!isMatch) {
    return new NextResponse("Email or password is invalid (isMatch)", {
      status: 400,
    });
  }

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email: userWitEmail.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  return NextResponse.json({ token });
}
