import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "../board/board.queries";
import { createTask, updateTask, deleteTask } from "./task.api";
import type { CreateTaskVariables, UpdateTaskVariables, DeleteTaskVariables } from "./task.types";

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

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId }: DeleteTaskVariables) => deleteTask(taskId),
    onSuccess: (_, { boardId }) => {
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
};
