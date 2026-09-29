import BoardItem from "./BoardItem";
import CustomBoardIcon from "../CustomBoardIcon";
import type { Boards } from "../board.types";

export default function BoardList() {
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
      <p className='pb-4'>
        ALL BOARDS <span>({boards.length})</span>
      </p>
      <section className='flex flex-col pb-3'>
        {boards.map((board, index) => (
          <BoardItem board={board} key={index} />
        ))}
      </section>
      <div className='flex items-cente gap-2 pb-6'>
        <CustomBoardIcon />
        <div className='flex gap-1 items-center'>
          <span>+</span>
          <p className='text-[18px] text-[#7230db]'>Create New Board</p>
        </div>
      </div>
    </div>
  );
}
