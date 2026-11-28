import { useModalContext } from "../../../contexts/ModalContext";
import { useDeleteTask } from "../task.queries";
import type { DeleteTaskVariables } from "../task.types";

export default function DeleteTaskModal({ taskId, boardId }: DeleteTaskVariables) {
  const { setActiveModal } = useModalContext();
  const deleteTask = useDeleteTask();

  function handleDelete({ taskId, boardId }: DeleteTaskVariables) {
    deleteTask.mutate(
      { taskId, boardId },
      {
        onSuccess: () => setActiveModal(null),
      },
    );
  }

  return (
    <div className='w-full max-w-130 rounded-xl bg-white p-6 shadow-2xl dark:bg-[#2B2C37]'>
      <h2 className='mb-6 text-lg font-bold text-[#EA5555]'>Delete this task?</h2>

      <p className='mb-6 text-sm leading-relaxed text-[#828FA3]'>
        Are you sure you want to delete this task? This action will remove all subtasks within it.
        This action cannot be undone.
      </p>

      <div className='flex flex-col gap-3'>
        <button
          type='button'
          onClick={() => handleDelete({ taskId, boardId })}
          className='w-full cursor-pointer rounded-full bg-[#EA5555] py-3 text-sm font-bold text-white transition-colors hover:bg-[#FF6B6B]'
        >
          Delete
        </button>

        <button
          type='button'
          onClick={() => setActiveModal(null)}
          className='w-full cursor-pointer rounded-full bg-[#E4E4E7] py-3 text-sm font-bold text-[#20212C] transition-colors hover:bg-[#D4D4D8] dark:bg-[#4B4C5C] dark:text-white dark:hover:bg-[#5A5B6B]'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
