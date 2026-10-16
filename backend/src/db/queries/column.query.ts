import pool  from "../pool.js";

export const createColumn = async (
  boardId: string,
  userId: string,
  name: string,
  position: number,
) => {
  const result = await pool.query(
    `
      INSERT INTO columns (board_id, name, position)
      SELECT b.id, $3, $4
      FROM boards b
      WHERE b.id = $1 AND b.user_id = $2
      RETURNING
        id,
        board_id,
        name,
        position,
        created_at,
        updated_at;
    `,
    [boardId, userId, name, position]
  );

  return result.rows[0];
};

export const updateColumn = async (columnId: string, userId: string, name: string) => {
  const result = await pool.query(
    `
      UPDATE columns
      SET
        name = $1,
        updated_at = NOW()
      WHERE id = $2
        AND EXISTS (
          SELECT 1
          FROM boards b
          WHERE b.id = columns.board_id AND b.user_id = $3
        )
      RETURNING
        id,
        board_id,
        name,
        position,
        created_at,
        updated_at;
    `,
    [name, columnId, userId]
  );

  return result.rows[0] ?? null;
};

export const deleteColumn = async (columnId: string, userId: string) => {
  const result = await pool.query(
    `
      DELETE FROM columns
      WHERE id = $1
        AND EXISTS (
          SELECT 1
          FROM boards b
          WHERE b.id = columns.board_id AND b.user_id = $2
        )
      RETURNING id;
    `,
    [columnId, userId]
  );

  return result.rows[0] ?? null;
};
