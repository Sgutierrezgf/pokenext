import { NextResponse } from "next/server";

import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, name } = body;

    if (!email || !password || !name)
      return new NextResponse("Missing info", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "REGISTRATION ERROR");
    return new NextResponse("Internal server error", { status: 500 });
  }
}