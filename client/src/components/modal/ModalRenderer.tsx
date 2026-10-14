import { useModalContext } from "../../contexts/ModalContext";
import CreateBoardModal from "../../features/board/components/modals/CreateBoardModal";
import CreateColumnModal from "../../features/column/CreateColumnModal";
import ModalOverlay from "./ModalOverlay";
import CreateTaskModal from "../../features/task/CreateTaskModal";
import TaskDetailsModal from "../../features/task/TaskDetailsModal";
import EditTaskModal from "../../features/task/EditTaskModal";
import BoardActionModal from "../../features/board/components/modals/BoardActionModal";
import type { Task } from "../../features/task/task.types";

type ModalRendererProps = {
  task: Task | null;
  boardName: string;
};

export default function ModalRenderer({ task, boardName }: ModalRendererProps) {
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
      if (task) {
        activeModalForDisplay = <TaskDetailsModal task={task} boardName={boardName} />;
      }
      break;
  }
  return <ModalOverlay>{activeModalForDisplay}</ModalOverlay>;
}
