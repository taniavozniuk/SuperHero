import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://postgres:20tania05@localhost:5432/superherodatabase?schema=public",
});

export default pool;
