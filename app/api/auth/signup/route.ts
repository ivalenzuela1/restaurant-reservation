import { ThemeProvider } from "@emotion/react";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phone, city, password } =
    await request.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, { min: 1, max: 20 }),
      message: "First name is invalid",
    },
    {
      valid: validator.isLength(lastName, { min: 1, max: 20 }),
      message: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      message: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      message: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, { min: 1, max: 20 }),
      message: "City is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      message: "Password is not Strong enough",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.message);
    }
  });

  if (errors.length) {
    return NextResponse.json({ message: errors[0], status: 404 });
  }

  const userWitEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWitEmail) {
    return NextResponse.json({
      message: "Email is associated with another account",
      status: 404,
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      password: hashPassword,
      city,
      phone,
      email,
    },
  });

  const alg = "HS256";
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  return NextResponse.json({ token });
}
