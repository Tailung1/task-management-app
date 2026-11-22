import apiClient from "../../api/clientApi";
import type { Task, CreateTaskVariables } from "./task.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
function decodeTask(value: unknown): Task {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    (value.description !== undefined && typeof value.description !== "string") ||
    typeof value.status !== "string" ||
    !Array.isArray(value.subtasks)
  ) {
    throw new Error("Invalid task response");
  }

  return {
    id: value.id,
    title: value.title,
    description: value.description ?? undefined,
    status: value.status,
    subtasks: value.subtasks,
  };
}

export const createTask = (taskData: CreateTaskVariables) => {
  return apiClient("tasks", decodeTask, {
    method: "POST",
    body: taskData.data,
  });
};
