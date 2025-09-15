import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const hero = await prisma.superhero.findUnique({
      where: { id: Number(id) },
      include: { images: true },
    });

    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await prisma.superhero.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Hero not found or could not be deleted" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

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
        images: images ? { deleteMany: {}, create: images } : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json(updatedHero);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update hero" },
      { status: 500 }
    );
  }
}
