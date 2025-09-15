import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const heroes = await prisma.superhero.findUnique({
      where: { id: Number(id) },
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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    await prisma.superhero.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: "Hero deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { err: "Hero not found or could not be deleted" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const {
      nickname,
      real_name,
      origin_description,
      superpower,
      catch_phrase,
      images,
    } = body;

    const updatedHero = await prisma.superhero.update({
      where: { id: Number(id) },
      data: {
        nickname,
        real_name,
        origin_description,
        superpower,
        catch_phrase,
        images: images
          ? {
              deleteMany: {},
              create: images,
            }
          : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json(updatedHero, { status: 200 });
  } catch (err) {
    console.error("Error updating hero", err);
    return NextResponse.json({ err: "Failed to update hero" }, { status: 500 });
  }
}
