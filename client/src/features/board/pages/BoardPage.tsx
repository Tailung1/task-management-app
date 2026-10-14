import { useState } from "react";
import EmptyBoardState from "./EmptyBoardState";
import NoBoardState from "./NoBoardState";
import BoardView from "./BoardView";
import { useModalContext } from "../../../contexts/ModalContext";
import ModalRenderer from "../../../components/modal/ModalRenderer";
import useActiveBoard from "../hooks/useActiveBoard";

export default function BoardPage() {
  const { activeModal, setActiveModal } = useModalContext();
  const { data: board, isPending, isFetching, isError, error } = useActiveBoard();
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  if (isPending && isFetching) {
    return (
      <p className='m-auto text-sm text-gray-500' role='status'>
        Loading board...
      </p>
    );
  }

  if (isError) {
    return (
      <p className='m-auto text-sm text-red-500' role='alert'>
        {error.message}
      </p>
    );
  }

  if (!board) {
    return <NoBoardState />;
  }

  const activeTask = board.columns
    .flatMap((column) => column.tasks)
    .find((task) => task.id === activeTaskId);

  const handleTaskSelect = (taskId: string) => {
    setActiveTaskId(taskId);
    setActiveModal("show-task-details");
  };

  return (
    <>
      {activeModal ? (
        <ModalRenderer task={activeTask ?? null} boardName={board.name} />
      ) : board.columns.length === 0 ? (
        <div className='flex flex-1 items-center justify-center'>
          <EmptyBoardState />
        </div>
      ) : (
        <BoardView columns={board.columns} onSelectTask={handleTaskSelect} />
      )}
    </>
  );
}
