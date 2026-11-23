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

type SubtaskInput = Omit<Subtask, "id"> & { id?: string };

type CreateTaskInput = {
  title: string;
  description: string | null;
  subtasks: SubtaskInput[];
  position: number;
};

type UpdateTaskInput = {
  title: string;
  description: string | null;
  subtasks: SubtaskInput[];
};

type UpdateTaskVariables = {
  taskId: string;
  boardId: string;
  data: UpdateTaskInput;
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
  SubtaskInput,
  CreateTaskInput,
  CreateTaskVariables,
  CreatedTask,
  UpdateTaskInput,
  UpdateTaskVariables,
  CreateTaskModalProps,
  TaskDetailsModalProps,
};
