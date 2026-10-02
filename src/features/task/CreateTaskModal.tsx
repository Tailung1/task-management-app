import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function CreateTaskModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [subtasks, setSubtasks] = useState([""]);

  function addSubtask() {
    setSubtasks((current) => [...current, ""]);
  }

  function updateSubtask(index: number, value: string) {
    setSubtasks((current) => current.map((subtask, i) => (i === index ? value : subtask)));
  }

  function removeSubtask(index: number) {
    setSubtasks((current) => current.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    // Create task here
  }

  return (
    <div className='w-full max-w-130 rounded-xl bg-white p-6 shadow-2xl dark:bg-[#2B2C37]'>
      <h2 className='mb-6 text-lg font-bold text-[#20212C] dark:text-white'>Add New Task</h2>

      {/* Title */}
      <div className='mb-5'>
        <label htmlFor='task-title' className='mb-2 block text-xs font-bold text-[#828FA3]'>
          Title
        </label>

        <input
          id='task-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='e.g. Take coffee break'
          className='h-11 w-full rounded-md border border-[#D9D9D9] bg-transparent px-4 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white'
        />
      </div>

      {/* Description */}
      <div className='mb-5'>
        <label htmlFor='task-description' className='mb-2 block text-xs font-bold text-[#828FA3]'>
          Description
        </label>

        <textarea
          id='task-description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. It's always good to take a break..."
          rows={4}
          className='w-full resize-none rounded-md border border-[#D9D9D9] bg-transparent px-4 py-3 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white'
        />
      </div>

      {/* Subtasks */}
      <div className='mb-5'>
        <p className='mb-2 text-xs font-bold text-[#828FA3]'>Subtasks</p>

        <div className='flex flex-col gap-3'>
          {subtasks.map((subtask, index) => (
            <div key={index} className='flex items-center gap-2'>
              <input
                value={subtask}
                onChange={(e) => updateSubtask(index, e.target.value)}
                placeholder='e.g. Make a cup of coffee'
                className='h-11 flex-1 rounded-md border border-[#D9D9D9] bg-transparent px-4 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white'
              />

              <button
                type='button'
                onClick={() => removeSubtask(index)}
                className='cursor-pointer text-[#828FA3] transition-colors hover:text-[#EA5555]'
                aria-label={`Remove subtask ${index + 1}`}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          type='button'
          onClick={addSubtask}
          className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#635FC7]/10 py-2.5 text-sm font-bold text-[#635FC7] transition-colors hover:bg-[#635FC7]/20'
        >
          <Plus size={18} />
          Add New Subtask
        </button>
      </div>

      {/* Status */}
      <div className='mb-6'>
        <label htmlFor='task-status' className='mb-2 block text-xs font-bold text-[#828FA3]'>
          Status
        </label>

        <select
          id='task-status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='h-11 w-full cursor-pointer rounded-md border border-[#D9D9D9] bg-transparent px-4 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white'
        >
          <option value='' disabled>
            Select status
          </option>
          <option value='todo'>Todo</option>
          <option value='doing'>Doing</option>
          <option value='done'>Done</option>
        </select>
      </div>

      <button
        type='button'
        onClick={handleSubmit}
        className='w-full cursor-pointer rounded-full bg-[#635FC7] py-3 text-sm font-bold text-white transition-colors hover:bg-[#7A75E0]'
      >
        Create Task
      </button>
    </div>
  );
}
