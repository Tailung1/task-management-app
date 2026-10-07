import { pool } from "../db/pool.js";
export const findBoardsByUserId = async (userId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        created_at,
        updated_at
      FROM boards
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `,
    [userId]
  );

  return result.rows;
};

export const findBoardById = async (boardId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        user_id,
        created_at,
        updated_at
      FROM boards
      WHERE id = $1;
    `,
    [boardId]
  );

  return result.rows[0] ?? null;
};

export const createBoard = async (userId: string, name: string) => {
  const result = await pool.query(
    `
      INSERT INTO boards (user_id, name)
      VALUES ($1, $2)
      RETURNING
        id,
        name,
        user_id,
        created_at,
        updated_at;
    `,
    [userId, name]
  );

  return result.rows[0];
};

export const updateBoard = async (boardId: string, name: string) => {
  const result = await pool.query(
    `
      UPDATE boards
      SET
        name = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING
        id,
        name,
        user_id,
        created_at,
        updated_at;
    `,
    [name, boardId]
  );

  return result.rows[0] ?? null;
};

export const deleteBoard = async (boardId: string) => {
  const result = await pool.query(
    `
      DELETE FROM boards
      WHERE id = $1
      RETURNING id;
    `,
    [boardId]
  );

  return result.rows[0] ?? null;
};
