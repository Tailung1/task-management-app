import apiClient from "../../api/clientApi";
import type { Board, BoardSummary, CreateBoardInput, UpdateBoardInput } from "./board.types";

export const getBoards = () => apiClient<BoardSummary[]>("boards", { method: "GET" });

export const getBoardDetails = (boardId: string) =>
  apiClient<Board>(`boards/${boardId}`, { method: "GET" });

export const createBoard = (data: CreateBoardInput) =>
  apiClient<BoardSummary>("boards", {
    method: "POST",
    body: data,
  });

export const updateBoard = (boardId: string, data: UpdateBoardInput) =>
  apiClient<BoardSummary>(`boards/${boardId}`, {
    method: "PATCH",
    body: data,
  });

export const deleteBoard = (boardId: string) =>
  apiClient<void>(`boards/${boardId}`, {
    method: "DELETE",
  });
