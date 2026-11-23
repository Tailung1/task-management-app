import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "../board/board.queries";
import { createTask, updateTask } from "./task.api";
import type { CreateTaskVariables, UpdateTaskVariables } from "./task.types";

export const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskVariables) => createTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
};

export const useUpdateTask = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateTaskVariables) => updateTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
};
