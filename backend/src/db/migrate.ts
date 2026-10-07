import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pool from "./pool.js";

const __filename = fileURLToPath(import.meta.url);
// file:///Users/user/Desktop/task-management-app/backend/src/db/migrate.ts
// → /Users/user/Desktop/task-management-app/backend/src/db/migrate.ts

const __dirname = path.dirname(__filename);
// /Users/user/Desktop/task-management-app/backend/src/db/migrate.ts
// → /Users/user/Desktop/task-management-app/backend/src/db

const migrationsDir = path.join(__dirname, "migrations");
// /Users/user/Desktop/task-management-app/backend/src/db + migrations
// → /Users/user/Desktop/task-management-app/backend/src/db/migrations

// !!!!! Reason for using path.join !!!!!!!!

// path.join() safely builds file paths and uses the correct path separator
// for each operating system (/ on macOS/Linux, \ on Windows).

async function migrate() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    const files = (await fs.readdir(migrationsDir)).filter((file) => file.endsWith(".sql")).sort();

    for (const file of files) {
      const result = await client.query("SELECT 1 FROM migrations WHERE name = $1", [file]);

      if (result.rows.length > 0) {
        continue;
      }

      const sql = await fs.readFile(path.join(migrationsDir, file), "utf8");

      await client.query("BEGIN");

      try {
        await client.query(sql);

        await client.query("INSERT INTO migrations (name) VALUES ($1)", [file]);

        await client.query("COMMIT");
        // E.g. users table is created but INSERT migration fails;
        // ROLLBACK undoes both, while COMMIT makes both permanent.

        console.log(`Applied: ${file}`);
      } catch (error) {
        console.log(`error: ${error}`);

        await client.query("ROLLBACK");
        throw error;
      }
    }
  } finally {
    client.release();
  }
}

migrate()
  .catch(console.error)
  .finally(() => pool.end());
