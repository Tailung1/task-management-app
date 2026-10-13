import { useQuery } from "@tanstack/react-query";
import { getBoards } from "./board.api";
import useAuthContext from "../../contexts/AuthContext";

export function useBoards() {
  const { isAuthenticated } = useAuthContext();
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    enabled: isAuthenticated,
  });
}
