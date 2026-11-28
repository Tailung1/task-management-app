import { useModalContext } from "../../contexts/ModalContext";
import CreateBoardModal from "../../features/board/components/modals/CreateBoardModal";
import CreateColumnModal from "../../features/column/CreateColumnModal";
import ModalOverlay from "./ModalOverlay";
import CreateTaskModal from "../../features/task/CreateTaskModal";
import TaskDetailsModal from "../../features/task/modals/TaskDetailsModal";
import EditTaskModal from "../../features/task/EditTaskModal";
import BoardActionModal from "../../features/board/components/modals/BoardActionModal";
import type { Task } from "../../features/task/task.types";
import type { Board } from "../../features/board/board.types";
import DeleteTaskModal from "../../features/task/modals/DeleteTaskModal";

type ModalRendererProps = {
  task: Task | null;
  boardName: string;
  board?: Board;
};

export default function ModalRenderer({ task, boardName, board }: ModalRendererProps) {
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
      if (board) {
        activeModalForDisplay = <CreateColumnModal board={board} />;
      }
      break;
    case "create-task":
      if (board) {
        activeModalForDisplay = <CreateTaskModal boardId={board.id} boardColumns={board.columns} />;
      }
      break;
    case "edit-task":
      if (task && board) {
        activeModalForDisplay = <EditTaskModal task={task} boardId={board.id} />;
      }
      break;
    case "show-task-details":
      if (task && board) {
        activeModalForDisplay = (
          <TaskDetailsModal task={task} boardName={boardName} boardId={board.id} />
        );
      }
      break;
    case "delete-task":
      if (task && board) {
        activeModalForDisplay = <DeleteTaskModal taskId={task.id} boardId={board.id} />;
      }
  }
  return <ModalOverlay>{activeModalForDisplay}</ModalOverlay>;
}
