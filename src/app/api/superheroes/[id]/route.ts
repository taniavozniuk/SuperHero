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
    console.log(err)
    return NextResponse.json(
      { err: "Hero not found or could not be deleted" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
      where: { id: Number(params.id) },
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
    console.log("Error updating hero", err);
    return NextResponse.json({ err: "Failed to update hero" }, { status: 500 });
  }
}
