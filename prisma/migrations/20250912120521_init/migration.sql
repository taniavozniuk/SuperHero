-- CreateTable
CREATE TABLE "public"."Superhero" (
    "id" SERIAL NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "origin_description" TEXT NOT NULL,
    "superpower" TEXT NOT NULL,
    "catch_phrase" TEXT NOT NULL,

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SuperheroImage" (
    "id" SERIAL NOT NULL,
    "superheroId" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "SuperheroImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."SuperheroImage" ADD CONSTRAINT "SuperheroImage_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "public"."Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
