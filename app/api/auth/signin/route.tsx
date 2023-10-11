import { ThemeProvider } from "@emotion/react";
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
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: "Password is invalid",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) {
    return NextResponse.json({ errorMessage: JSON.stringify(errors) });
  }

  const userWitEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userWitEmail) {
    return NextResponse.json({
      message: "Email or password is invalid",
      status: 401,
    });
  }

  const isMatch = await bcrypt.compare(password, userWitEmail.password);

  if (!isMatch) {
    return NextResponse.json({
      message: "Email or password is invalid",
      status: 401,
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
