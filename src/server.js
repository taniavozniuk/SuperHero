import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post("/superheros", async (req, res) => {
  const {
    nickname,
    real_name,
    origin_description,
    superpower,
    catch_phrase,
    images,
  } = req.body;

  try {
    const hero = await prisma.superhero.create({
      data: {
        nickname,
        real_name,
        origin_description,
        superpower,
        catch_phrase,
        images: {
          create: images,
        },
      },
      include: { images: true },
    });
    res.json(hero);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/superheros", async (req, res) => {
  const heros = await prisma.superhero.findMany({
    include: { images: true },
  });
  res.json(heros);
});

app.listen(3000, () => console.log("server running on http://localhost:3000"));
const heroes = await prisma.superhero.findMany();
console.log(heroes);
