import { PanelsTopLeft } from "lucide-react";
import BoardItem from "./BoardItem";
import BoardListSkeleton from "./BoardListSkeleton";
import "./scrollbar.css";
import { useBoards } from "../board.queries";
import { useModalContext } from "../../../contexts/ModalContext";

export default function BoardList() {
  const { data, isPending, isError, error } = useBoards();
  const { setActiveModal } = useModalContext();

  if (isPending) return <BoardListSkeleton />;

  if (isError) return <p role='alert'>{error.message}</p>;

  return (
    <div>
      <p className='pb-4 text-xs font-bold tracking-wide text-[#828FA3]'>
        ALL BOARDS <span>({data.length})</span>
      </p>

      <div className='-ml-8 mb-8 max-h-58.5 overflow-y-auto pr-10 scrollbar'>
        <ul>
          {data.map((board) => (
            <li key={board.id}>
              <BoardItem board={board} />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setActiveModal("create-board")}
        type='button'
        className='mb-6 flex cursor-pointer items-center gap-2 text-[#7230db] transition-opacity duration-200 hover:opacity-70'
      >
        <PanelsTopLeft size={20} strokeWidth={2} className='text-[#635FC7]' />

        <span className='flex items-center gap-1 text-[18px]'>
          <span aria-hidden='true'>+</span>
          Create New Board
        </span>
      </button>
    </div>
  );
}
