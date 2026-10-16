CREATE INDEX IF NOT EXISTS boards_user_created_idx
  ON boards (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS columns_board_position_idx
  ON columns (board_id, position);

CREATE INDEX IF NOT EXISTS tasks_column_position_idx
  ON tasks (column_id, position);

CREATE INDEX IF NOT EXISTS subtasks_task_position_idx
  ON subtasks (task_id, position);
