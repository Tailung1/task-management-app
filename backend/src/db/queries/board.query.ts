import pool from "../pool.js";
import type { QueryResultRow } from "pg";

interface BoardDetailsRow extends QueryResultRow {
  board_id: string;
  board_name: string;
  column_id: string | null;
  column_name: string | null;
  task_id: string | null;
  task_title: string | null;
  task_description: string | null;
  task_status: string | null;
  subtask_id: string | null;
  subtask_title: string | null;
  subtask_is_completed: boolean | null;
}

export const findBoardsByUserId = async (userId: string) => {
  const result = await pool.query(
    `
      SELECT
      id,
      name
      FROM boards
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `,
    [userId],
  );
  return result.rows;
};

export const findBoardDetailsById = async (boardId: string, userId: string) => {
  const result = await pool.query<BoardDetailsRow>(
    `
      SELECT
        b.id AS board_id,
        b.name AS board_name,
        c.id AS column_id,
        c.name AS column_name,
        t.id AS task_id,
        t.title AS task_title,
        t.description AS task_description,
        c.name AS task_status,
        s.id AS subtask_id,
        s.title AS subtask_title,
        s.is_completed AS subtask_is_completed
      FROM boards b
      LEFT JOIN columns c ON c.board_id = b.id
      LEFT JOIN tasks t ON t.column_id = c.id
      LEFT JOIN subtasks s ON s.task_id = t.id
      WHERE b.id = $1 AND b.user_id = $2
      ORDER BY c.position ASC, t.position ASC, s.position ASC;
    `,
    [boardId, userId],
  );

  if (result.rows.length === 0) {
    return null;
  }

  const board = {
    id: result.rows[0].board_id,
    name: result.rows[0].board_name,
    columns: [] as {
      id: string;
      name: string;
      tasks: {
        id: string;
        title: string;
        description: string;
        status: string;
        subtasks: { id: string; title: string; isCompleted: boolean }[];
      }[];
    }[],
  };
  const columnsById = new Map<string, (typeof board.columns)[number]>();
  const tasksById = new Map<string, (typeof board.columns)[number]["tasks"][number]>();

  for (const row of result.rows) {
    if (!row.column_id || !row.column_name) {
      continue;
    }

    let column = columnsById.get(row.column_id);
    if (!column) {
      column = { id: row.column_id, name: row.column_name, tasks: [] };
      columnsById.set(row.column_id, column);
      board.columns.push(column);
    }

    if (!row.task_id || row.task_title === null || row.task_status === null) {
      continue;
    }

    let task = tasksById.get(row.task_id);
    if (!task) {
      task = {
        id: row.task_id,
        title: row.task_title,
        description: row.task_description ?? "",
        status: row.task_status,
        subtasks: [],
      };
      tasksById.set(row.task_id, task);
      column.tasks.push(task);
    }

    if (row.subtask_id && row.subtask_title !== null) {
      task.subtasks.push({
        id: row.subtask_id,
        title: row.subtask_title,
        isCompleted: row.subtask_is_completed ?? false,
      });
    }
  }

  return board;
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
    [userId, name],
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
    [name, boardId],
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
    [boardId],
  );

  return result.rows[0] ?? null;
};
