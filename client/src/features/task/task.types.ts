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

type CreateTaskInput = {
  title: string;
  description: string | null;
  subtasks: Subtask[];
  position: number;
};

type CreateTaskVariables = {
  columnId: string;
  data: CreateTaskInput;
};

type CreatedTask = {
  id: string;
  columnId: string;
  title: string;
  description: string | null;
  position: number;
};

type CreateTaskModalProps = {
  boardId: string;
  boardColumns: BoardColumn[];
};
 type TaskDetailsModalProps = {
  task: Task;
  boardName: string;
};

export type {
  Task,
  Subtask,
  CreateTaskInput,
  CreateTaskVariables,
  CreatedTask,
  CreateTaskModalProps,
  TaskDetailsModalProps,
};
