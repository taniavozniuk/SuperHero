import { PrismaClient } from "@prisma/client";
import styles from "./HeroPage.module.css";
import Link from "next/link";

const prisma = new PrismaClient();

interface HeroPageProps {
  params: { id: string };
}

export default async function HeroPage({ params }: HeroPageProps) {
    const { id } = await params;
  const hero = await prisma.superhero.findUnique({
    where: { id: Number(id) },
    include: { images: true },
  });

  if (!hero) {
    return <p>Hero not found</p>;
  }

  return (
    <div className={styles.heroCard}>
      <h2 className={styles.nickName}>{hero.nickname}</h2>
      <div className={styles.wrap}>
        <div className={styles.wrapImg}>
          {hero.images.map((img) => (
            <img key={img.id} src={img.image_url} className={styles.image} />
          ))}
        </div>
        <div className={styles.wrapInfo}>
          <p className={styles.realName}>Real name: {hero.real_name}</p>
          <p className={styles.description}>
            Origin description: {hero.origin_description}
          </p>
          <p>Superpowers: {hero.superpower}</p>
          <p>
            Catch phrase:
            <em> {hero.catch_phrase}</em>
          </p>

          <Link href="/">
            <button className={styles.details}>Back to list</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
