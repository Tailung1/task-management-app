import type { BoardColumn } from "../column/column.types";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

type CreateTaskInput = Omit<Task, "id">;

type CreateTaskVariables = {
  columnId: string;
  data: CreateTaskInput;
};

type CreateTaskModalProps = {
  boardColumns: BoardColumn[] | undefined;
};

export type { Task, CreateTaskInput, CreateTaskVariables, CreateTaskModalProps };
