type BoardOptionsMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function BoardOptionsMenu({ onEdit, onDelete }: BoardOptionsMenuProps) {
  return (
    <div className='absolute right-0 top-[120%] z-20 mt-2 w-40 rounded-lg border border-[#E4EBFA] bg-white p-2 shadow-lg dark:border-[#3E3F4E] dark:bg-[#2B2C37]'>
      <button
        type='button'
        onClick={onEdit}
        className='w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#2B2C37] hover:bg-[#F4F7FD] dark:text-white dark:hover:bg-[#20212C]'
      >
        Edit board
      </button>

      <button
        type='button'
        onClick={onDelete}
        className='w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#EA5555] hover:bg-[#F4F7FD] dark:hover:bg-[#20212C]'
      >
        Delete board
      </button>
    </div>
  );
}
