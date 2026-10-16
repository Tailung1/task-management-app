import { createTask, updateTask, deleteTask } from "../db/queries/task.query.js";

export const addTask = async (
  columnId: string,
  userId: string,
  title: string,
  description: string | null,
  position: number
) => {
  return createTask(columnId, userId, title, description, position);
};

export const editTask = async (
  taskId: string,
  userId: string,
  title: string,
  description: string | null,
) => {
  return updateTask(taskId, userId, title, description);
};

export const removeTask = async (taskId: string, userId: string) => {
  return deleteTask(taskId, userId);
};
