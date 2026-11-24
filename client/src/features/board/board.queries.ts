import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, deleteBoard, getBoardDetails, getBoards, updateBoard } from "./board.api";
import type { CreateBoardInput, UpdateBoardInput } from "./board.types";
import useAuthContext from "../../contexts/AuthContext";

export const boardKeys = {
  all: ["boards"] as const,
  list: () => [...boardKeys.all, "list"] as const,
  detail: (boardId: string) => [...boardKeys.all, "detail", boardId] as const,
};

export function useBoards() {
  const { isAuthenticated } = useAuthContext();
  return useQuery({
    queryKey: boardKeys.list(),
    queryFn: getBoards,
    enabled: isAuthenticated,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateBoardInput) => createBoard(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.list() });
    },
  });
}

export function useBoardDetails(boardId: string | undefined) {
  const { isAuthenticated } = useAuthContext();

  return useQuery({
    queryKey: boardKeys.detail(boardId ?? ""),
    queryFn: () => {
      if (!boardId) {
        throw new Error("A board ID is required to fetch board details");
      }
      return getBoardDetails(boardId);
    },
    enabled: isAuthenticated && Boolean(boardId),
  });
}

export function useUpdateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateBoardInput) => updateBoard(input),
    onSuccess: (updatedBoard) => {
      queryClient.invalidateQueries({
        queryKey: boardKeys.detail(updatedBoard.id),
      });
      queryClient.invalidateQueries({ queryKey: boardKeys.list() });
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBoard(id),

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: boardKeys.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: boardKeys.list(),
      });
    },
  });
}
