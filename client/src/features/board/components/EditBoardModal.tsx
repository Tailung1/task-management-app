import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useModalContext } from "../../../contexts/ModalContext";

type Board = {
  id: string;
  name: string;
  columns: {
    id: string;
    name: string;
  }[];
};

type EditBoardModalProps = {
  board: Board;
};

export default function EditBoardModal({ board }: EditBoardModalProps) {
  const { setActiveModal } = useModalContext();

  const [boardName, setBoardName] = useState(board.name);
  const [columns, setColumns] = useState(board.columns);

  function updateColumnName(id: string, name: string) {
    setColumns((current) =>
      current.map((column) => (column.id === id ? { ...column, name } : column))
    );
  }

  function addColumn() {
    setColumns((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "",
      },
    ]);
  }

  function removeColumn(id: string) {
    setColumns((current) => current.filter((column) => column.id !== id));
  }

  function handleSubmit() {
    const updatedBoard = {
      ...board,
      name: boardName,
      columns,
    };

    console.log(updatedBoard);

    setActiveModal(null);
  }

  return (
    <div className='w-full max-w-130 rounded-xl bg-white p-6 shadow-2xl dark:bg-[#2B2C37]'>
      <h2 className='mb-6 text-lg font-bold text-[#20212C] dark:text-white'>Edit Board</h2>

      {/* Board name */}
      <div className='mb-6'>
        <label htmlFor='board-name' className='mb-2 block text-xs font-bold text-[#828FA3]'>
          Board Name
        </label>

        <input
          id='board-name'
          type='text'
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className='h-11 w-full rounded-md border border-[#D9D9D9] bg-transparent px-4 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white'
        />
      </div>

      {/* Columns */}
      <div className='mb-6'>
        <p className='mb-2 text-xs font-bold text-[#828FA3]'>Board Columns</p>

        <div className='flex flex-col gap-3'>
          {columns.map((column) => (
            <div key={column.id} className='flex items-center gap-2'>
              <input
                type='text'
                value={column.name}
                onChange={(e) => updateColumnName(column.id, e.target.value)}
                className='h-11 flex-1 rounded-md border border-[#D9D9D9] bg-transparent px-4 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white'
              />

              <button
                type='button'
                onClick={() => removeColumn(column.id)}
                className='cursor-pointer text-[#828FA3] transition-colors hover:text-[#EA5555]'
                aria-label={`Delete ${column.name || "column"}`}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          type='button'
          onClick={addColumn}
          className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#635FC7]/10 py-2.5 text-sm font-bold text-[#635FC7] transition-colors hover:bg-[#635FC7]/20'
        >
          <Plus size={18} />
          Add New Column
        </button>
      </div>

      <button
        type='button'
        onClick={handleSubmit}
        className='w-full cursor-pointer rounded-full bg-[#635FC7] py-3 text-sm font-bold text-white transition-colors hover:bg-[#7A75E0]'
      >
        Save Changes
      </button>
    </div>
  );
}
