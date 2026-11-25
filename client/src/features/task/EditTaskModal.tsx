import { useState } from "react";
import { X } from "lucide-react";
import type { SubtaskInput, TaskDetailsModalProps } from "./task.types";
import { useUpdateTask } from "./task.queries";
import { useModalContext } from "../../contexts/ModalContext";

export default function EditTaskModal({
  task,
  boardId,
}: Pick<TaskDetailsModalProps, "task"> & { boardId: string }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [subTasks, setSubtasks] = useState<SubtaskInput[]>(task.subtasks);
  const updateTaskMutation = useUpdateTask(boardId);
  const { setActiveModal } = useModalContext();

  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [subtaskError, setSubtaskError] = useState(false);

  const handleSubtaskRemove = (id: string | undefined) => {
    if (!id) return;
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
  };

  const handleSubtaskTitleChange = (id: string | undefined, title: string) => {
    if (!id) return;
    setSubtasks((prev) =>
      prev.map((subtask) => (subtask.id === id ? { ...subtask, title } : subtask)),
    );
  };

  const handleSubtaskCancel = () => {
    setNewSubtaskTitle("");
    setIsAddingSubtask(false);
    setSubtaskError(false);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (isAddingSubtask && !newSubtaskTitle.trim()) {
      setSubtaskError(true);
      return;
    }

    const updatedSubtasks = isAddingSubtask
      ? [
          ...subTasks.map((subtask) => ({
            ...subtask,
            title: subtask.title.trim(),
          })),
          {
            title: newSubtaskTitle.trim(),
            isCompleted: false,
          },
        ]
      : subTasks.map((subtask) => ({
          ...subtask,
          title: subtask.title.trim(),
        }));

    updateTaskMutation.mutate(
      {
        taskId: task.id,
        boardId,
        data: {
          title: title.trim(),
          description: description.trim() || null,
          subtasks: updatedSubtasks,
        },
      },
      {
        onSuccess: () => setActiveModal(null),
      },
    );
  };

  return (
    <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-[#2B2C37]'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold text-[#20212C] dark:text-white'>Edit Task</h2>

        <button
          type='button'
          aria-label='Close edit task modal'
          onClick={() => setActiveModal(null)}
          className='text-gray-500 transition hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className='mt-6 space-y-5'>
        <div>
          <label
            htmlFor='task-title'
            className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400'
          >
            Title
          </label>

          <input
            id='task-title'
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className='w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-[#20212C] outline-none focus:border-[#635FC7] dark:border-gray-600 dark:bg-[#2B2C37] dark:text-white'
          />
        </div>

        <div>
          <label
            htmlFor='task-description'
            className='mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400'
          >
            Description
          </label>

          <textarea
            id='task-description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className='w-full resize-none rounded border border-gray-300 bg-white px-4 py-3 text-sm text-[#20212C] outline-none focus:border-[#635FC7] dark:border-gray-600 dark:bg-[#2B2C37] dark:text-white'
          />
        </div>

        <div>
          <p className='mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
            Subtasks
          </p>

          <div className='space-y-2'>
            {subTasks.map((subtask, index) => (
              <div key={subtask.id ?? index} className='flex items-center gap-3'>
                <input
                  type='text'
                  value={subtask.title}
                  onChange={(event) => handleSubtaskTitleChange(subtask.id, event.target.value)}
                  className='flex-1 rounded border border-gray-300 bg-white px-4 py-3 text-sm text-[#20212C] outline-none focus:border-[#635FC7] dark:border-gray-600 dark:bg-[#2B2C37] dark:text-white'
                />

                <button
                  type='button'
                  onClick={() => handleSubtaskRemove(subtask.id)}
                  className='text-gray-400 transition hover:text-red-500'
                  aria-label='Remove subtask'
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          {isAddingSubtask ? (
            <div className='mt-3 flex items-center gap-3'>
              <input
                autoFocus
                type='text'
                value={newSubtaskTitle}
                onChange={(event) => {
                  setNewSubtaskTitle(event.target.value);

                  if (subtaskError && event.target.value.trim()) {
                    setSubtaskError(false);
                  }
                }}
                placeholder='Enter subtask title'
                className={`min-w-0 flex-1 rounded border bg-white px-4 py-3 text-sm outline-none focus:border-[#635FC7] dark:bg-[#2B2C37] dark:text-white ${
                  subtaskError ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
              />

              <button
                type='button'
                onClick={handleSubtaskCancel}
                aria-label='Cancel subtask creation'
                className='text-gray-400 transition hover:text-red-500'
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              type='button'
              onClick={() => setIsAddingSubtask(true)}
              className='mt-3 w-full rounded-full bg-[#F0EFFA] px-4 py-3 text-sm font-bold text-[#635FC7] transition hover:bg-[#E5E3F5] dark:bg-white dark:hover:bg-gray-200'
            >
              + Add New Subtask
            </button>
          )}
        </div>

        <button
          type='submit'
          className='w-full rounded-full bg-[#635FC7] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#5046A8]'
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
