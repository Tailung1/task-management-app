import { PanelsTopLeft } from "lucide-react";
import BoardItem from "./BoardItem";
// import type { Boards } from "../board.types";
import { useModalContext } from "../../../contexts/ModalContext";
import "./scrollbar.css";
import data from "../../../data.json";

export default function BoardList() {
  const { setActiveModal } = useModalContext();

  return (
    <div>
      <p className='pb-4 text-xs font-bold tracking-wide text-[#828FA3]'>
        ALL BOARDS <span>({data.length})</span>
      </p>
      <div className='-ml-8 mb- 8 max-h-58.5 overflow-y-auto pr-10 scrollbar'>
        <ul>
          {data.map((board, index) => (
            <li key={`${board.name}-${index}`}>
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
