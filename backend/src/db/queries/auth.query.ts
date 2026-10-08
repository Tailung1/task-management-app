import pool from "../pool.js";

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
      SELECT
      id
      FROM users
      WHERE email = $1;
    `,
    [email]
  );

  return result.rows[0] ?? null;
};

export const createUser = async (name: string, email: string, password: string) => {
  const result = await pool.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        name,
        email,
        created_at,
        updated_at;
    `,
    [name, email, password]
  );

  return result.rows[0];
};
