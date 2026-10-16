import pool from "../pool.js";

export const createTask = async (
  columnId: string,
  userId: string,
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
      SELECT c.id, $3, $4, $5
      FROM columns c
      JOIN boards b ON b.id = c.board_id
      WHERE c.id = $1 AND b.user_id = $2
      RETURNING
        id,
        column_id,
        title,
        description,
        position,
        created_at,
        updated_at;
    `,
    [columnId, userId, title, description, position]
  );

  return result.rows[0];
};

export const updateTask = async (
  taskId: string,
  userId: string,
  title: string,
  description: string | null,
) => {
  const result = await pool.query(
    `
      UPDATE tasks
      SET
        title = $1,
        description = $2,
        updated_at = NOW()
      WHERE id = $3
        AND EXISTS (
          SELECT 1
          FROM columns c
          JOIN boards b ON b.id = c.board_id
          WHERE c.id = tasks.column_id AND b.user_id = $4
        )
      RETURNING
        id,
        column_id,
        title,
        description,
        position,
        created_at,
        updated_at;
    `,
    [title, description, taskId, userId]
  );

  return result.rows[0] ?? null;
};

export const deleteTask = async (taskId: string, userId: string) => {
  const result = await pool.query(
    `
      DELETE FROM tasks
      WHERE id = $1
        AND EXISTS (
          SELECT 1
          FROM columns c
          JOIN boards b ON b.id = c.board_id
          WHERE c.id = tasks.column_id AND b.user_id = $2
        )
      RETURNING id;
    `,
    [taskId, userId]
  );

  return result.rows[0] ?? null;
};
