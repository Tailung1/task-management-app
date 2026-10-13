import {  useQuery } from "@tanstack/react-query";
import { getBoards } from "./board.api";

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
  });
}
