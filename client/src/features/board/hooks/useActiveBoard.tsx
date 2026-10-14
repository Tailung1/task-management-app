import { useBoardDetails } from "../board.queries";
import { useParams } from "react-router-dom";

function useActiveBoard() {
  const { id } = useParams();
  return useBoardDetails(id);
}

export default useActiveBoard;
