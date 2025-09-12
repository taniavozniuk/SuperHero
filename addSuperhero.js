// import pool from "./bd";

// async function addSuperhero() {
//   const query =
//     "INSERT INTO superheroTable (nickmane, real_name, origin_description, superpower, catch_phrase) Values ($1, $2, $3, $4, $5) RETURNING";
//   const values = [
//     'Superman',
//     'Clark Kent',
//     'he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...',
//     'solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
//     'Look, up in the sky, it's a bird, it's a plane, it's Superman!'
//   ]
  
//   const result = await pool.query(query, values);
//   console.log('Added superhero', result.rows[0])
// }
