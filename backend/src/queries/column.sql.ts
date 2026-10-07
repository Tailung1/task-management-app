import { pool } from "../db/pool.js";

export const findColumnsByBoardId = async (boardId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        board_id,
        name,
        position,
        created_at,
        updated_at
      FROM columns
      WHERE board_id = $1
      ORDER BY position ASC;
    `,
    [boardId]
  );

  return result.rows;
};

export const findColumnById = async (columnId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        board_id,
        name,
        position,
        created_at,
        updated_at
      FROM columns
      WHERE id = $1;
    `,
    [columnId]
  );

  return result.rows[0] ?? null;
};

export const createColumn = async (boardId: string, name: string, position: number) => {
  const result = await pool.query(
    `
      INSERT INTO columns (board_id, name, position)
      VALUES ($1, $2, $3)
      RETURNING
        id,
        board_id,
        name,
        position,
        created_at,
        updated_at;
    `,
    [boardId, name, position]
  );

  return result.rows[0];
};

export const updateColumn = async (columnId: string, name: string) => {
  const result = await pool.query(
    `
      UPDATE columns
      SET
        name = $1,
        updated_at = NOW()
      WHERE id = $2
      RETURNING
        id,
        board_id,
        name,
        position,
        created_at,
        updated_at;
    `,
    [name, columnId]
  );

  return result.rows[0] ?? null;
};

export const deleteColumn = async (columnId: string) => {
  const result = await pool.query(
    `
      DELETE FROM columns
      WHERE id = $1
      RETURNING id;
    `,
    [columnId]
  );

  return result.rows[0] ?? null;
};
