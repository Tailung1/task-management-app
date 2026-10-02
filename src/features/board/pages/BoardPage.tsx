import EmptyBoardState from "./EmptyBoardState";
import { useModalContext } from "../../../contexts/ModalContext";
import ModalRenderer from "../../../components/modal/ModalRenderer";
import { useParams } from "react-router-dom";

export default function BoardPage() {
  const { activeModal } = useModalContext();
  const params = useParams();
  console.log(params);
  return (
    <>
      {activeModal ? (
        <ModalRenderer />
      ) : (
        <div className='flex-1  flex items-center justify-center'>
          <EmptyBoardState />
        </div>
      )}
    </>
  );
}
