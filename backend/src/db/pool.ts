import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set.");
}

const pool = new Pool({
  connectionString,
});
export default pool;
