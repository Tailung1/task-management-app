import { useBoards } from "../board.queries";
import { useParams } from "react-router-dom";

function useActiveBoard() {
  const { id } = useParams();
  const { data } = useBoards();
  const board = data?.find((item) => item.id === id);

  return board;
}

export default useActiveBoard;
