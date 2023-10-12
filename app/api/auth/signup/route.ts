import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";

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
    return new NextResponse(JSON.stringify(errors[0]), { status: 400 });
  }

  const userWitEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWitEmail) {
    return new NextResponse("Email is associated with another account", {
      status: 400,
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

  cookies().set("jwt", token, { maxAge: 60 * 6 * 24 });

  return NextResponse.json({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,
  });
}
