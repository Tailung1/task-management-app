import { PanelsTopLeft } from "lucide-react";
import BoardItem from "./BoardItem";
import type { Boards } from "../board.types";
import { useModalContext } from "../../../contexts/ModalContext";

export default function BoardList() {
  const { setActiveModal } = useModalContext();
  const boards: Boards = [
    {
      name: "Personal board",
      isActive: true,
    },
    {
      name: "Task1",
      isActive: false,
    },
  ];

  return (
    <div>
      <p className='pb-4 text-xs font-bold tracking-wide text-[#828FA3]'>
        ALL BOARDS <span>({boards.length})</span>
      </p>

      <ul className='flex flex-col pb-3'>
        {boards.map((board) => (
          <li key={board.name}>
            <BoardItem board={board} />
          </li>
        ))}
      </ul>

      <button
        onClick={() => setActiveModal("create-board")}
        type='button'
        className='flex cursor-pointer items-center gap-2 pb-6 text-[#7230db] transition-opacity duration-200 hover:opacity-70'
      >
        <PanelsTopLeft size={24} strokeWidth={2} className='text-[#635FC7]' />

        <span className='flex items-center gap-1 text-[18px]'>
          <span aria-hidden='true'>+</span>
          Create New Board
        </span>
      </button>
    </div>
  );
}
