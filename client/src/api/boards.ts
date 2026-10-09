import { apiClient } from "./clientApi";
import type { Board, CreateBoardInput, UpdateBoardInput } from "../features/board/board.types";

export const getBoards = () => apiClient<Board[]>("/boards");


export const createBoard = (data: CreateBoardInput) =>
  apiClient<Board>("/boards", {
    method: "POST",
    body: data,
  });

export const updateBoard = (boardId: string, data: UpdateBoardInput) =>
  apiClient<Board>(`/boards/${boardId}`, {
    method: "PATCH",
    body: data,
  });

export const deleteBoard = (boardId: string) =>
  apiClient<void>(`/boards/${boardId}`, {
    method: "DELETE",
  });
