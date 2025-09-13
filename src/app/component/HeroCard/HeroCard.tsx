"use client";
import { Hero } from "@/type/Hero";
import styles from "./HeroCard.module.css";
import Link from "next/link";

export default function HeroCard({ hero }: { hero: Hero }) {
  return (
    <div className={styles.heroCard}>
      <h2 className={styles.nickName}>{hero.nickname}</h2>
      {hero.images.map((img) => (
        <img key={img.id} src={img.image_url} className={styles.image} />
      ))}
      <Link href={`/superheroes/${hero.id}`} className={styles.details}>
        Details
      </Link>
    </div>
  );
}
