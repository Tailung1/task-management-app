import pool from "../pool.js";

export const createTask = async (
  columnId: string,
  userId: string,
  title: string,
  description: string | null,
  position: number,
  subtasks: { title: string; isCompleted: boolean }[],
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(
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
      [columnId, userId, title, description, position],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    for (const [positionIndex, subtask] of subtasks.entries()) {
      await client.query(
        `
          INSERT INTO subtasks (task_id, title, is_completed, position)
          VALUES ($1, $2, $3, $4);
        `,
        [result.rows[0].id, subtask.title, subtask.isCompleted, positionIndex],
      );
    }

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const updateTask = async (
  taskId: string,
  userId: string,
  title: string,
  description: string | null,
  subtasks?: { id?: string; title: string; isCompleted: boolean }[],
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const result = await client.query(
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
      [title, description, taskId, userId],
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return null;
    }

    if (subtasks !== undefined) {
      const currentSubtasks = await client.query<{ id: string }>(
        "SELECT id FROM subtasks WHERE task_id = $1 FOR UPDATE;",
        [taskId],
      );
      const currentIds = new Set(currentSubtasks.rows.map((subtask) => subtask.id));
      const requestedIds = subtasks.flatMap((subtask) => (subtask.id ? [subtask.id] : []));

      if (requestedIds.some((id) => !currentIds.has(id))) {
        await client.query("ROLLBACK");
        return null;
      }

      await client.query(
        "DELETE FROM subtasks WHERE task_id = $1 AND NOT (id = ANY($2::uuid[]));",
        [taskId, requestedIds],
      );

      for (const [position, subtask] of subtasks.entries()) {
        if (subtask.id) {
          await client.query(
            `
              UPDATE subtasks
              SET title = $1, is_completed = $2, position = $3, updated_at = NOW()
              WHERE id = $4 AND task_id = $5;
            `,
            [subtask.title, subtask.isCompleted, position, subtask.id, taskId],
          );
        } else {
          await client.query(
            `
              INSERT INTO subtasks (task_id, title, is_completed, position)
              VALUES ($1, $2, $3, $4);
            `,
            [taskId, subtask.title, subtask.isCompleted, position],
          );
        }
      }
    }

    await client.query("COMMIT");
    return result.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
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
