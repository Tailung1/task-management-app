import { pool } from "../db/pool.js";

export const findTasksByBoardId = async (boardId: string) => {
  const result = await pool.query(
    `
      SELECT
        t.id,
        t.column_id,
        t.title,
        t.description,
        t.position,
        t.created_at,
        t.updated_at
      FROM tasks t
      JOIN columns c
        ON c.id = t.column_id
      WHERE c.board_id = $1
      ORDER BY t.position ASC;
    `,
    [boardId]
  );

  return result.rows;
};

export const findTaskById = async (taskId: string) => {
  const result = await pool.query(
    `
      SELECT
        id,
        column_id,
        title,
        description,
        position,
        created_at,
        updated_at
      FROM tasks
      WHERE id = $1;
    `,
    [taskId]
  );

  return result.rows[0] ?? null;
};

export const createTask = async (
  columnId: string,
  title: string,
  description: string | null,
  position: number
) => {
  const result = await pool.query(
    `
      INSERT INTO tasks (
        column_id,
        title,
        description,
        position
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        column_id,
        title,
        description,
        position,
        created_at,
        updated_at;
    `,
    [columnId, title, description, position]
  );

  return result.rows[0];
};

export const updateTask = async (taskId: string, title: string, description: string | null) => {
  const result = await pool.query(
    `
      UPDATE tasks
      SET
        title = $1,
        description = $2,
        updated_at = NOW()
      WHERE id = $3
      RETURNING
        id,
        column_id,
        title,
        description,
        position,
        created_at,
        updated_at;
    `,
    [title, description, taskId]
  );

  return result.rows[0] ?? null;
};

export const deleteTask = async (taskId: string) => {
  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING id;
    `,
    [taskId]
  );

  return result.rows[0] ?? null;
};
