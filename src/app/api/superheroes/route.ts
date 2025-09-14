import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const heroes = await prisma.superhero.findMany({
      include: { images: true },
    });
    return NextResponse.json(heroes);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const hero = await prisma.superhero.create({
      data: {
        nickname,
        real_name,
        origin_description,
        superpower,
        catch_phrase,
        images: { create: images || [] },
      },
      include: { images: true },
    });

    return NextResponse.json(hero, { status: 201 });
  } catch (error) {
    console.log("error creating hero", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await prisma.superhero.delete({
//       where: { id: Number(params.id) },
//     });
//     return NextResponse.json(
//       { message: "Hero deleted successfully" },
//       { status: 200 }
//     );
//   } catch (err) {
//     return NextResponse.json(
//       { err: "Hero not found or could not be deleted" },
//       { status: 400 }
//     );
//   }
// }
