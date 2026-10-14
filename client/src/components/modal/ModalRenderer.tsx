import { useModalContext } from "../../contexts/ModalContext";
import CreateBoardModal from "../../features/board/components/CreateBoardModal";
import CreateColumnModal from "../../features/column/CreateColumnModal";
import ModalOverlay from "./ModalOverlay";
import CreateTaskModal from "../../features/task/CreateTaskModal";
import TaskDetailsModal from "../../features/task/TaskDetailsModal";
import EditTaskModal from "../../features/task/EditTaskModal";
import BoardActionModal from "../../features/board/components/modals/BoardActionModal";

export default function ModalRenderer() {
  const { activeModal } = useModalContext();
  let activeModalForDisplay;
  switch (activeModal) {
    case "create-board":
      activeModalForDisplay = <CreateBoardModal />;
      break;
    case "delete-board":
    case "edit-board":
      activeModalForDisplay = <BoardActionModal />;
      break;
    case "create-column":
      activeModalForDisplay = <CreateColumnModal />;
      break;
    case "create-task":
      activeModalForDisplay = <CreateTaskModal />;
      break;
    case "edit-task":
      activeModalForDisplay = <EditTaskModal />;
      break;
    case "show-task-details":
      activeModalForDisplay = <TaskDetailsModal />;
      break;
  }
  return <ModalOverlay>{activeModalForDisplay}</ModalOverlay>;
}
