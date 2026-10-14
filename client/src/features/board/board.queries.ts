import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, getBoardDetails, getBoards } from "./board.api";
import type { CreateBoardInput } from "./board.types";
import useAuthContext from "../../contexts/AuthContext";

export const boardKeys = {
  all: ["boards"] as const,
  lists: () => [...boardKeys.all, "list"] as const,
  detail: (boardId: string) => [...boardKeys.all, "detail", boardId] as const,
};

export function useBoards() {
  const { isAuthenticated } = useAuthContext();
  return useQuery({
    queryKey: boardKeys.lists(),
    queryFn: getBoards,
    enabled: isAuthenticated,
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
