import { createTask, updateTask, deleteTask } from "../db/queries/task.query.js";

export type SubtaskInput = { id?: string; title: string; isCompleted: boolean };

export const addTask = async (
  columnId: string,
  userId: string,
  title: string,
  description: string | null,
  position: number,
  subtasks: SubtaskInput[],
) => {
  return createTask(columnId, userId, title, description, position, subtasks);
};

export const editTask = async (
  taskId: string,
  userId: string,
  title: string,
  description: string | null,
  subtasks?: SubtaskInput[],
) => {
  return updateTask(taskId, userId, title, description, subtasks);
};

export const removeTask = async (taskId: string, userId: string) => {
  return deleteTask(taskId, userId);
};
