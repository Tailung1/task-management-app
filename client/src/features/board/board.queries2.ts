import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, deleteBoard, getBoards, updateBoard } from "./board.api";
import type { CreateBoardInput, UpdateBoardInput } from "./board.types";

export const boardKeys = {
  all: ["boards"] as const,
  lists: () => [...boardKeys.all, "list"] as const,
  detail: (boardId: string) => [...boardKeys.all, "detail", boardId] as const,
};

export function useBoards() {
  return useQuery({
    queryKey: boardKeys.lists(),
    queryFn: getBoards,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBoardInput) => createBoard(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
    },
  });
}

export function useUpdateBoard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateBoardInput) => updateBoard(boardId, input),
    onSuccess: (updatedBoard) => {
      queryClient.setQueryData(boardKeys.detail(boardId), updatedBoard);
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: string) => deleteBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
    },
  });
}
