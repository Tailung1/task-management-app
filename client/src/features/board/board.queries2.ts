// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { createBoard, deleteBoard, getBoards, updateBoard } from "./board.api";
// import { boardKeys } from "./board.queries";
// import type { CreateBoardInput, UpdateBoardInput } from "./board.types";

// export function useBoards() {
//   return useQuery({
//     queryKey: boardKeys.lists(),
//     queryFn: getBoards,
//   });
// }

// export function useCreateBoard() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (input: CreateBoardInput) => createBoard(input),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
//     },
//   });
// }

// export function useUpdateBoard(boardId: string) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (input: UpdateBoardInput) => updateBoard(boardId, input),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: boardKeys.detail(boardId) });
//       queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
//     },
//   });
// }

// export function useDeleteBoard() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (boardId: string) => deleteBoard(boardId),
//     onSuccess: (_result, boardId) => {
//       queryClient.removeQueries({ queryKey: boardKeys.detail(boardId) });
//       queryClient.invalidateQueries({ queryKey: boardKeys.lists() });
//     },
//   });
// }
