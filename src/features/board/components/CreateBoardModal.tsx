import { useState } from "react";
import { useModalContext } from "../../../contexts/ModalContext";
import { Plus, X, GripVertical } from "lucide-react";

export default function CreateBoardModal() {
  const { setActiveModal } = useModalContext();
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState(["Todo", "Doing", "Done"]);

  function addColumn() {
    setColumns((current) => [...current, ""]);
  }

  function updateColumn(index: number, value: string) {
    setColumns((current) => current.map((column, i) => (i === index ? value : column)));
  }

  function removeColumn(index: number) {
    setColumns((current) => current.filter((_, i) => i !== index));
  }

  return (
    <div className='w-full max-w-130 overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-[#2B2C37]'>
      {/* Header */}
      <div className='flex items-start justify-between px-7 pt-7'>
        <div>
          <h2 className='text-xl font-bold tracking-tight text-[#20212C] dark:text-white'>
            Add New Board
          </h2>

          <p className='mt-1 text-sm text-gray-500 dark:text-[#828FA3]'>
            Create a board and set up its columns.
          </p>
        </div>

        <button
          onClick={() => setActiveModal(null)}
          type='button'
          className='rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-[#3E3F4E] dark:hover:text-white'
        >
          <X size={19} />
        </button>
      </div>

      {/* Content */}
      <div className='px-7 py-7'>
        <div>
          <label className='mb-2 block text-xs font-bold text-[#828FA3]'>BOARD NAME</label>

          <input
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder='e.g. Website Redesign'
            className='
                h-11 w-full rounded-md border
                border-[#D9D9D9]
                bg-transparent px-4
                text-sm text-[#20212C]
                outline-none transition
                placeholder:text-[#828FA3]
                focus:border-[#635FC7]
                focus:ring-1 focus:ring-[#635FC7]
                dark:border-[#4B4C5C]
                dark:text-white
                dark:focus:border-[#A8A4FF]
                dark:focus:ring-[#A8A4FF]
              '
          />
        </div>

        {/* Columns */}
        <div className='mt-7'>
          <div className='mb-3 flex items-center justify-between'>
            <label className='text-xs font-bold text-[#828FA3]'>BOARD COLUMNS</label>

            <span className='text-xs text-[#828FA3]'>{columns.length}</span>
          </div>

          <div className='space-y-2.5'>
            {columns.map((column, index) => (
              <div
                key={index}
                className='
                    group flex items-center gap-2
                    rounded-md border
                    border-[#E4E4E7]
                    bg-[#FAFAFA]
                    p-1.5
                    transition
                    focus-within:border-[#635FC7]
                    dark:border-[#454653]
                    dark:bg-[#20212C]
                    dark:focus-within:border-[#A8A4FF]
                  '
              >
                <button
                  type='button'
                  className='cursor-grab px-1.5 text-[#828FA3] opacity-0 transition group-hover:opacity-100'
                  aria-label='Reorder column'
                >
                  <GripVertical size={17} />
                </button>

                <input
                  value={column}
                  onChange={(e) => updateColumn(index, e.target.value)}
                  placeholder={`Column ${index + 1}`}
                  className='
                      min-w-0 flex-1
                      bg-transparent
                      px-1
                      py-2
                      text-sm
                      text-[#20212C]
                      outline-none
                      placeholder:text-[#828FA3]
                      dark:text-white
                    '
                />

                <button
                  type='button'
                  onClick={() => removeColumn(index)}
                  className='
                      rounded-md p-2
                      text-[#828FA3]
                      transition
                      hover:bg-[#635FC7]/10
                      hover:text-[#635FC7]
                      dark:hover:bg-[#635FC7]/10
                      dark:hover:text-[#A8A4FF]
                    '
                  aria-label={`Remove ${column || "column"}`}
                >
                  <X size={17} />
                </button>
              </div>
            ))}
          </div>

          {/* Add column */}
          <button
            type='button'
            onClick={addColumn}
            className='
                mt-3 flex w-full items-center justify-center
                gap-2 rounded-md
                border border-dashed
                border-[#D9D9D9]
                py-2.5
                text-sm font-bold
                text-[#635FC7]
                transition
                hover:border-[#635FC7]
                hover:bg-[#635FC7]/5
                dark:border-[#4B4C5C]
                dark:text-[#A8A4FF]
                dark:hover:border-[#A8A4FF]
                dark:hover:bg-[#635FC7]/10
              '
          >
            <Plus size={16} />
            Add New Column
          </button>
        </div>
      </div>

      <div className='bg-[#F8F8F8] px-7 py-5 dark:bg-[#20212C]'>
        <button
          type='button'
          className='
              w-full rounded-full
              bg-[#635FC7]
              py-3
              text-sm font-bold text-white
              transition
              hover:bg-[#A8A4FF]
              active:scale-[0.99]
            '
        >
          Create New Board
        </button>
      </div>
    </div>
  );
}
