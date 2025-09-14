import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const heroes = await prisma.superhero.findUnique({
      where: { id: Number(params.id) },
      include: { images: true },
    });

    if (!heroes) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }
    return NextResponse.json(heroes);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.superhero.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(
      { message: "Hero deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { err: "Hero not found or could not be deleted" },
      { status: 400 }
    );
  }
}
