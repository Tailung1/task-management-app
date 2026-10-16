import apiClient from "../../api/clientApi";
import type { Board, BoardSummary, CreateBoardInput, UpdateBoardInput } from "./board.types";
import type { BoardColumn } from "../column/column.types";
import type { Task } from "../task/task.types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function decodeBoardSummary(value: unknown): BoardSummary {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.name !== "string") {
    throw new Error("Invalid board response");
  }

  return { id: value.id, name: value.name };
}

function decodeBoardSummaries(value: unknown): BoardSummary[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid board list response");
  }

  return value.map(decodeBoardSummary);
}

function decodeTask(value: unknown): Task {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.title !== "string" ||
    typeof value.description !== "string" ||
    typeof value.status !== "string" ||
    !Array.isArray(value.subtasks)
  ) {
    throw new Error("Invalid task response");
  }

  const subtasks = value.subtasks.map((subtask): Task["subtasks"][number] => {
    if (
      !isRecord(subtask) ||
      typeof subtask.id !== "string" ||
      typeof subtask.title !== "string" ||
      typeof subtask.isCompleted !== "boolean"
    ) {
      throw new Error("Invalid subtask response");
    }

    return {
      id: subtask.id,
      title: subtask.title,
      isCompleted: subtask.isCompleted,
    };
  });

  return {
    id: value.id,
    title: value.title,
    description: value.description,
    status: value.status,
    subtasks,
  };
}

function decodeBoardColumn(value: unknown): BoardColumn {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.name !== "string" ||
    !Array.isArray(value.tasks)
  ) {
    throw new Error("Invalid board column response");
  }

  return { id: value.id, name: value.name, tasks: value.tasks.map(decodeTask) };
}

function decodeBoard(value: unknown): Board {
  if (!isRecord(value) || !Array.isArray(value.columns)) {
    throw new Error("Invalid board response");
  }

  const { id, name } = decodeBoardSummary(value);
  return { id, name, columns: value.columns.map(decodeBoardColumn) };
}

const decodeNoContent = (value: unknown): void => {
  if (value !== undefined && value !== null) {
    throw new Error("Unexpected response body");
  }
};

export const getBoards = () => apiClient("boards", decodeBoardSummaries, { method: "GET" });

export const getBoardDetails = (boardId: string) =>
  apiClient(`boards/${encodeURIComponent(boardId)}`, decodeBoard, { method: "GET" });

export const createBoard = (data: CreateBoardInput) =>
  apiClient("boards", decodeBoardSummary, {
    method: "POST",
    body: data,
  });

export const updateBoard = (boardId: string, data: UpdateBoardInput) =>
  apiClient(`boards/${encodeURIComponent(boardId)}`, decodeBoardSummary, {
    method: "PATCH",
    body: data,
  });

export const deleteBoard = (boardId: string) =>
  apiClient(`boards/${encodeURIComponent(boardId)}`, decodeNoContent, {
    method: "DELETE",
  });
