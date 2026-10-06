import { useState } from "react";
import { X } from "lucide-react";

export default function EditTaskModal() {
  const [title, setTitle] = useState("Create dashboard UI");
  const [description, setDescription] = useState(
    "Create the dashboard interface with responsive layout and reusable components."
  );

  return (
    <div
      className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-[#2B2C37]'
      onClick={(event) => event.stopPropagation()}
    >
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold text-[#20212C] dark:text-white'>Edit Task</h2>

        <button
          type='button'
          aria-label='Close edit task modal'
          className='text-gray-500 transition hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
        >
          <X size={20} />
        </button>
      </div>

      <form className='mt-6 space-y-5'>
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
            <div className='flex items-center gap-3'>
              <input
                type='text'
                defaultValue='Create dashboard layout'
                className='flex-1 rounded border border-gray-300 bg-white px-4 py-3 text-sm text-[#20212C] outline-none focus:border-[#635FC7] dark:border-gray-600 dark:bg-[#2B2C37] dark:text-white'
              />

              <button
                type='button'
                className='text-gray-400 transition hover:text-red-500'
                aria-label='Remove subtask'
              >
                <X size={18} />
              </button>
            </div>

            <div className='flex items-center gap-3'>
              <input
                type='text'
                defaultValue='Create navigation'
                className='flex-1 rounded border border-gray-300 bg-white px-4 py-3 text-sm text-[#20212C] outline-none focus:border-[#635FC7] dark:border-gray-600 dark:bg-[#2B2C37] dark:text-white'
              />

              <button
                type='button'
                className='text-gray-400 transition hover:text-red-500'
                aria-label='Remove subtask'
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <button
            type='button'
            className='mt-3 w-full rounded-full bg-[#F0EFFA] px-4 py-3 text-sm font-bold text-[#635FC7] transition hover:bg-[#E5E3F5] dark:bg-white dark:hover:bg-gray-200'
          >
            + Add New Subtask
          </button>
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
