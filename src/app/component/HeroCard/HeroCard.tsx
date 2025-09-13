import { Hero } from "@/type/Hero";
import styles from "./HeroCard.module.css";

export default function HeroCard({ hero }: { hero: Hero }) {
  return (
    <div className={styles.heroCard}>
      <h2 className={styles.nickName}>{hero.nickname}</h2>
      {/* <p className={styles.realName}>Real name: {hero.real_name}</p>
      <p className={styles.description}>
        Origin description: {hero.origin_description}
      </p>
      <p>Superpowers: {hero.superpower}</p>
      <p>Catch phrase:
        <em> {hero.catch_phrase}</em>
      </p> */}
      {hero.images.map((img) => (
        <img key={img.id} src={img.image_url} className={styles.image} />
      ))}
      {/* <div className={styles.buttonWrap}> */}
        <button className={styles.details}>Details</button>
        {/* <button>Edit</button> */}
      {/* </div> */}
    </div>
  );
}
