import { useModalContext } from "../../contexts/ModalContext";
import CreateBoardModal from "../../features/board/components/CreateBoardModal";
import CreateColumnModal from "../../features/column/CreateColumnModal";
import ModalOverlay from "./ModalOverlay";
import CreateTaskModal from "../../features/task/CreateTaskModal";

export default function ModalRenderer() {
  const { activeModal } = useModalContext();
  let activeModalForDisplay;
  switch (activeModal) {
    case "create-board":
      activeModalForDisplay = <CreateBoardModal />;
      break;
    case "create-column":
      activeModalForDisplay = <CreateColumnModal />;
      break;
    case "create-task":
      activeModalForDisplay = <CreateTaskModal />;
      break;
  }
  return <ModalOverlay>{activeModalForDisplay}</ModalOverlay>;
}
