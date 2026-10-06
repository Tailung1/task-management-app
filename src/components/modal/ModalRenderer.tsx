import { useModalContext } from "../../contexts/ModalContext";
import CreateBoardModal from "../../features/board/components/CreateBoardModal";
import CreateColumnModal from "../../features/column/CreateColumnModal";
import ModalOverlay from "./ModalOverlay";
import CreateTaskModal from "../../features/task/CreateTaskModal";
import DeleteBoardModal from "../../features/board/components/DeleteBoardModal";
// import EditBoardModal from "../../features/board/components/EditBoardModal";
import TaskDetailsModal from "../../features/task/TaskDetailsModal";
import EditTaskModal from "../../features/task/EditTaskModal";

export default function ModalRenderer() {
  const { activeModal } = useModalContext();
  let activeModalForDisplay;
  switch (activeModal) {
    case "create-board":
      activeModalForDisplay = <CreateBoardModal />;
      break;
    case "delete-board":
      activeModalForDisplay = <DeleteBoardModal />;
      break;
    // case "edit-board":
    //   activeModalForDisplay = <EditBoardModal />;
    //   break;
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
