import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@repo/db/client";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);
  try {
    const newuser = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ msg: "User created", userInfo: newuser });
  } catch (error) {
    return NextResponse.json({
      msg: "Error while registering user",
      Error: error,
    });
  }
}
