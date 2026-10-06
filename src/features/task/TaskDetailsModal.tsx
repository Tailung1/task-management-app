import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";

const task = {
  id: "1",
  title: "Create dashboard UI",
  boardName: "Personal",
  status: "Todo",
  subtasks: [
    {
      id: "1",
      title: "Create dashboard layout",
      status: "Done",
    },
    {
      id: "2",
      title: "Create navigation",
      status: "Done",
    },
    {
      id: "3",
      title: "Build dashboard cards",
      status: "Todo",
    },
    {
      id: "4",
      title: "Make dashboard responsive",
      status: "Todo",
    },
    {
      id: "5",
      title: "Add loading states",
      status: "Todo",
    },
  ],
};

const statuses = ["Todo", "Doing", "Done"];

export default function TaskDetailsModal() {
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [status, setStatus] = useState(task.status);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const completedCount = subtasks.filter((subtask) => subtask.status === "Done").length;

  const toggleSubtask = (id: string) => {
    setSubtasks((currentSubtasks) =>
      currentSubtasks.map((subtask) =>
        subtask.id === id
          ? {
              ...subtask,
              status: subtask.status === "Done" ? "Todo" : "Done",
            }
          : subtask
      )
    );
  };

  return (
    <div
      className='w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-[#2B2C37]'
      onClick={(event) => event.stopPropagation()}
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h2 className='text-lg font-bold text-[#20212C] dark:text-white'>{task.title}</h2>

          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>From {task.boardName}</p>
        </div>

        <button
          type='button'
          aria-label='Close task details'
          className='text-gray-500 transition hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
        >
          <X size={20} />
        </button>
      </div>

      <div className='mt-6'>
        <p className='mb-3 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
          Subtasks ({completedCount} of {subtasks.length})
        </p>

        <div className='space-y-2'>
          {subtasks.map((subtask) => {
            const isCompleted = subtask.status === "Done";

            return (
              <button
                key={subtask.id}
                type='button'
                onClick={() => toggleSubtask(subtask.id)}
                className='flex w-full items-center gap-3 rounded bg-[#F4F4F5] px-3 py-3 text-left transition hover:bg-[#EDEDED] dark:bg-[#20212C] dark:hover:bg-[#262735]'
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                    isCompleted
                      ? "border-[#635FC7] bg-[#635FC7]"
                      : "border-gray-300 bg-white dark:border-gray-600 dark:bg-[#2B2C37]"
                  }`}
                >
                  {isCompleted && <Check size={12} strokeWidth={3} className='text-white' />}
                </span>

                <span
                  className={`text-sm font-medium ${
                    isCompleted ? "text-gray-400 line-through" : "text-[#20212C] dark:text-white"
                  }`}
                >
                  {subtask.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className='relative mt-6'>
        <p className='mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400'>
          Current Status
        </p>

        <button
          type='button'
          onClick={() => setShowStatusMenu((current) => !current)}
          className='flex w-full items-center justify-between rounded border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-[#20212C] dark:border-gray-600 dark:bg-[#2B2C37] dark:text-white'
        >
          {status}

          <ChevronDown
            size={18}
            className={`transition-transform ${showStatusMenu ? "rotate-180" : ""}`}
          />
        </button>

        {showStatusMenu && (
          <div className='absolute left-0 right-0 bottom-0 z-10  rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-[#2B2C37]'>
            {statuses.map((option) => (
              <button
                key={option}
                type='button'
                onClick={() => {
                  setStatus(option);
                  setShowStatusMenu(false);
                }}
                className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-[#20212C] ${
                  option === status
                    ? "font-semibold text-[#635FC7]"
                    : "text-[#20212C] dark:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
