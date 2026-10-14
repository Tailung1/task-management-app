import useActiveBoard from "../../hooks/useActiveBoard";
import EditBoardModal from "./EditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";
import { useModalContext } from "../../../../contexts/ModalContext";

export default function BoardActionModal() {
  const { activeModal } = useModalContext();
  const { data: board, isPending, isFetching, isError, error } = useActiveBoard();

  if (isPending && isFetching) return <p role='status'>Loading board...</p>;
  if (isError) return <p role='alert'>{error.message}</p>;
  if (!board) return null;

  switch (activeModal) {
    case "edit-board":
      return <EditBoardModal board={board} />;
    case "delete-board":
      return <DeleteBoardModal board={board} />;
  }
}
