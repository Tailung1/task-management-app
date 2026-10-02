// import { useModalContext } from "../../contexts/ModalContext";
import CreateBoardModal from "../../features/board/components/CreateBoardModal";
import ModalOverlay from "./ModalOverlay";

export default function ModalRenderer() {
//   const { activeModal } = useModalContext();
  return (
    <ModalOverlay>
      <CreateBoardModal />
    </ModalOverlay>
  );
}
