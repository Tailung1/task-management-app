import { useQuery } from "@tanstack/react-query";
import { getBoards } from "./board.api";
import useAuthContext from "../../contexts/AuthContext";

const { isAuthenticated } = useAuthContext();

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: getBoards,
    enabled: isAuthenticated,
  });
}
