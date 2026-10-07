import {
  createTask,
  updateTask,
  deleteTask,
} from "../db/queries/task.query.js";

export const addTask = async (
  columnId: string,
  title: string,
  description: string,
  position: number
) => {
  return createTask(columnId, title, description, position);
};

export const editTask = async (taskId: string, title: string, description: string) => {
  return updateTask(taskId, title, description);
};

export const removeTask = async (taskId: string) => {
  return deleteTask(taskId);
};
