import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, deleteBoard, getBoards, updateBoard } from "./board.api";

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
}
