import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const superman = await prisma.superhero.create({
    data: {
      nickname: "Superman",
      real_name: "Clark Kent",
      origin_description: "Born on Krypton, sent to Earth as a baby",
      superpower: "Flight, Heat Vision, Super Strength",
      catch_phrase: "Look up in the sky!",
      images: {
        create: [
          {
            image_url:
              "https://cms-assets.unrealengine.com/cm6l5gfpm05kr07my04cqgy2x/cmcc8gbpu00c907oehvo5algh",
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
