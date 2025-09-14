"use client";
import { useEffect, useState } from "react";
import HeroCard from "./component/HeroCard/HeroCard";
import { Hero } from "@/types/Hero";
import styles from "./page.module.css";
import Header from "./component/Header/Header";
import HeroFrom from "./component/HeroForm/HeroForm";
import { heroDelete, heroGet } from "./api/superheroes/api";

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState<Hero | null>(null);

  const fetchHeroes = async () => {
    try {
      const data = await heroGet();
      setHeroes(data);
    } catch (err) {
      console.error("error fetching heroes", err);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleDalete = async (id: number) => {
    try {
      await heroDelete(id);
      setHeroes((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Failed to delete hero", err);
    }
  };

  const handleEdit = (hero: Hero) => {
    setEdit(hero);
    setCreate(true);
  };

  return (
    <div className={styles.pageCard}>
      <Header setCreate={setCreate} />
      {create && (
        <HeroFrom
          setCreate={setCreate}
          fetchHero={fetchHeroes}
          edit={edit}
          setEdit={() => setEdit(null)}
        />
      )}
      <div className={styles.cardConteiner}>
        {heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            onDalete={handleDalete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
