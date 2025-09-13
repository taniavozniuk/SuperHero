import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const heroes = await prisma.superhero.findMany({ include: { images: true } });
    return NextResponse.json(heroes);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
