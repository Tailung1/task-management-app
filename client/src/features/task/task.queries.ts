import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "../board/board.queries";
import { createTask } from "./task.api";
import type { CreateTaskVariables } from "./task.types";

export const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskVariables) => createTask(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
    },
  });
};
