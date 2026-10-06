import { Plus } from "lucide-react";
import { useModalContext } from "../../../contexts/ModalContext";
import type { BoardViewProps } from "../board.types";

const columnColors = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-cyan-500",
];

function getColumnColor(id: string) {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % columnColors.length;

  return columnColors[index];
}

export default function BoardView({ columns }: BoardViewProps) {
  const { setActiveModal } = useModalContext();

  const handleCreateColumn = () => {
    setActiveModal("create-column");
  };

  return (
    <div className='flex gap-6 p-6'>
      {columns.map((column) => (
        <section key={column.id} className='flex h-full w-70 flex-col '>
          {/* Column header */}
          <div className='mb-4 flex h-5 items-center gap-2'>
            <span
              className={`h-2.5 w-2.5 rounded-full ${getColumnColor(column.id)}`}
              aria-hidden='true'
            />

            <h2 className='overflow-x-auto whitespace-nowrap scrollbar text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200'>
              {column.name}
            </h2>

            <span className='text-sm font-semibold text-gray-400'>{column.tasks.length}</span>
          </div>

          {/* Tasks */}
          <div className='overflow-y-auto pr-1 flex flex-col gap-3 pb-2 scrollbar'>
            {column.tasks.map((task) => (
              <article
              onClick={()=>setActiveModal("show-task-details")}
                key={task.id}
                className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-[#3E3F4E] dark:bg-[#2B2C37]'
              >
                <h3 className='text-[15px] font-bold leading-5 text-gray-800 dark:text-white'>
                  {task.title}
                </h3>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* New column */}
      <button
        type='button'
        onClick={handleCreateColumn}
        className='mt-8 flex h-12 w-70 shrink-0 items-center justify-center gap-2 rounded-lg bg-gray-200/70 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-300 hover:text-gray-700 dark:bg-[#20212C] dark:text-gray-400 dark:hover:bg-[#2B2C37] dark:hover:text-white'
      >
        <Plus size={18} aria-hidden='true' />
        New Column
      </button>
    </div>
  );
}
