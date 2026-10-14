import useActiveBoard from "../../hooks/useActiveBoard";
import EditBoardModal from "./EditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";
import { useModalContext } from "../../../../contexts/ModalContext";

export default function BoardActionModal() {
  const { activeModal } = useModalContext();
  const board = useActiveBoard();
  if (!board) return;

  switch (activeModal) {
    case "edit-board":
      return <EditBoardModal board={board} />;
    case "delete-board":
      return <DeleteBoardModal board={board} />;
  }
}
