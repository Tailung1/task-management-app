import EmptyBoardState from "./EmptyBoardState";
import BoardView from "./BoardView";
import { useModalContext } from "../../../contexts/ModalContext";
import ModalRenderer from "../../../components/modal/ModalRenderer";
import columns from "../../../data.json";

export default function BoardPage() {
  const { activeModal } = useModalContext();

  return (
    <>
      {activeModal ? (
        <ModalRenderer />
      ) : columns.length === 0 ? (
        <div className='flex flex-1 items-center justify-center'>
          <EmptyBoardState />
        </div>
      ) : (
        <BoardView columns={columns} />
      )}
    </>
  );
}
