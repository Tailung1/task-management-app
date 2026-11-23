import pool from "../pool.js";

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
    [boardId, userId, name, position],
  );

  return result.rows[0];
};
