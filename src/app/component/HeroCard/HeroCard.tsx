"use client";
import { Hero } from "@/types/Hero";
import styles from "./HeroCard.module.css";
import Link from "next/link";
import React from "react";

interface HeroCardProps {
  hero: Hero;
  onDalete: (id: number) => void;
  onEdit: (hero: Hero) => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ hero, onDalete, onEdit }) => {
  return (
    <div className={styles.heroCard}>
      <h2 className={styles.nickName}>{hero.nickname}</h2>
      {hero.images.map((img) => (
        <img key={img.id} src={img.image_url} className={styles.image} />
      ))}
      <div className={styles.wrap}>
        <Link href={`/superheroes/${hero.id}`} className={styles.details}>
          Details
        </Link>
        <button className={styles.delete} onClick={() => onDalete(hero.id)}>
          Delete
        </button>
        <button className={styles.edit} onClick={() => onEdit(hero)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
