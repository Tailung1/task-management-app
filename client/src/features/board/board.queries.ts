import { useQuery } from "@tanstack/react-query";
import { getBoards } from "./board.api";

const isAuthenticated = !!localStorage.getItem("token");

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    enabled: isAuthenticated,
  });
}
