ALTER TABLE columns
DROP CONSTRAINT columns_board_id_fkey,
ADD CONSTRAINT columns_board_id_fkey
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;

ALTER TABLE tasks
DROP CONSTRAINT tasks_column_id_fkey,
ADD CONSTRAINT tasks_column_id_fkey
  FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE;

ALTER TABLE subtasks
DROP CONSTRAINT subtasks_task_id_fkey,
ADD CONSTRAINT subtasks_task_id_fkey
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE;

DO $$
BEGIN
  IF EXISTS (
    SELECT LOWER(email)
    FROM users
    GROUP BY LOWER(email)
    HAVING COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'Cannot enforce case-insensitive email uniqueness: duplicate accounts exist';
  END IF;
END;
$$;

CREATE UNIQUE INDEX IF NOT EXISTS users_email_lower_unique ON users (LOWER(email));
