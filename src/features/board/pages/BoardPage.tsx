import EmptyBoardState from "./EmptyBoardState";
import { useModalContext } from "../../../contexts/ModalContext";
import ModalRenderer from "../../../components/modal/ModalRenderer";

export default function BoardPage() {
  const { activeModal } = useModalContext();
  return (
    <>
      {activeModal ? (
        <ModalRenderer />
      ) : (
        <div className='flex-1 flex items-center justify-center'>
          <EmptyBoardState />
        </div>
      )}
    </>
  );
}
