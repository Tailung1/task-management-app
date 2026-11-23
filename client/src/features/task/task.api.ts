import apiClient from "../../api/clientApi";
import type { CreatedTask, CreateTaskVariables, UpdateTaskVariables } from "./task.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
function decodeCreatedTask(value: unknown): CreatedTask {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.column_id !== "string" ||
    typeof value.title !== "string" ||
    (value.description !== null && typeof value.description !== "string") ||
    typeof value.position !== "number"
  ) {
    throw new Error("Invalid created task response");
  }

  return {
    id: value.id,
    columnId: value.column_id,
    title: value.title,
    description: value.description,
    position: value.position,
  };
}

export const createTask = ({ columnId, data }: CreateTaskVariables) => {
  return apiClient(`columns/${encodeURIComponent(columnId)}/tasks`, decodeCreatedTask, {
    method: "POST",
    body: data,
  });
};

export const updateTask = ({ taskId, data }: UpdateTaskVariables) => {
  return apiClient(`tasks/${encodeURIComponent(taskId)}`, decodeCreatedTask, {
    method: "PATCH",
    body: data,
  });
};
