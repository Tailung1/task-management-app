import EmptyBoardState from "./EmptyBoardState";
import BoardView from "./BoardView";
import { useModalContext } from "../../../contexts/ModalContext";
import ModalRenderer from "../../../components/modal/ModalRenderer";
import columns from "../../../../data.json";
import data from "../../../../data.json"
import type { Board } from "../board.types";

export default function BoardPage() {
  const { activeModal } = useModalContext();
const activeBoard = data.find((board: Board) => board.isActive);
  return (
    <>
      {activeModal ? (
        <ModalRenderer />
      ) : columns.length === 0 ? (
        <div className='flex flex-1 items-center justify-center'>
          <EmptyBoardState />
        </div>
      ) : (
        <BoardView columns={activeBoard} />
      )}
    </>
  );
}
