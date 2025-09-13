"use client";
import { useEffect, useState } from "react";
import HeroCard from "./component/HeroCard/HeroCard";
import { Hero } from "@/type/Hero";
import styles from "./page.module.css";
import Header from "./component/Header/Header";
import HeroFrom from "./component/HeroForm/HeroForm";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         Hello
//       </main>
//     </div>
//   );
// }

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetch("/api/superheroes")
      .then((res) => res.json())
      .then(setHeroes);
  }, []);

  return (
    <div className={styles.pageCard}>
      <Header setCreate={setCreate} />
      {create && <HeroFrom setCreate={setCreate} />}
      <div className={styles.cardConteiner}>
        {heroes.map((hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
      </div>
    </div>
  );
}
