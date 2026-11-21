import { useState, type SubmitEvent } from "react";
import { Plus, X } from "lucide-react";
import { useModalContext } from "../../contexts/ModalContext";
import { useUpdateBoard } from "../board/board.queries";
import type { Board } from "../board/board.types";

export default function CreateColumnModal({ board }: { board: Board }) {
  const { setActiveModal } = useModalContext();
  const updateBoard = useUpdateBoard();
  const [columns, setColumns] = useState([""]);
  const [errors, setErrors] = useState<string[]>([]);
  const [formError, setFormError] = useState("");

  function addColumn() {
    if (board.columns.length + columns.length >= 50) {
      return;
    }

    setColumns((current) => [...current, ""]);
    setErrors((current) => [...current, ""]);
    setFormError("");
  }

  function updateColumn(index: number, value: string) {
    setColumns((current) => current.map((column, i) => (i === index ? value : column)));

    setErrors((current) => current.map((error, i) => (i === index ? "" : error)));
    setFormError("");
  }

  function removeColumn(index: number) {
    setColumns((current) => current.filter((_, i) => i !== index));
    setErrors((current) => current.filter((_, i) => i !== index));
    setFormError("");
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (updateBoard.isPending) {
      return;
    }

    const newErrors = columns.map((column) => {
      if (!column.trim()) {
        return "Can't be empty";
      }

      return column.trim().length > 255 ? "Must be 255 characters or fewer" : "";
    });
    setErrors(newErrors);
    const exceedsColumnLimit = board.columns.length + columns.length > 50;
    setFormError(
      columns.length === 0
        ? "Add at least one column."
        : exceedsColumnLimit
          ? "A board can have up to 50 columns."
          : "",
    );

    if (columns.length === 0 || exceedsColumnLimit || newErrors.some(Boolean)) {
      return;
    }

    updateBoard.mutate(
      {
        id: board.id,
        name: board.name,
        columns: [
          ...board.columns.map(({ id, name }) => ({ id, name })),
          ...columns.map((name) => ({ name: name.trim() })),
        ],
      },
      { onSuccess: () => setActiveModal(null) },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-130 rounded-xl bg-white p-6 shadow-2xl dark:bg-[#2B2C37]'
    >
      <h2 className='mb-6 text-lg font-bold text-[#20212C] dark:text-white'>Add New Columns</h2>

      <div className='mb-6'>
        <p className='mb-2 text-xs font-bold text-[#828FA3]'>Column Names</p>

        <div className='flex flex-col gap-3 max-h-40 overflow-y-auto scrollbar [scrollbar-gutter:stable]'>
          {columns.map((column, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div className='relative flex-1'>
                <input
                  type='text'
                  value={column}
                  onChange={(e) => updateColumn(index, e.target.value)}
                  maxLength={255}
                  aria-label={`Column name ${index + 1}`}
                  aria-invalid={Boolean(errors[index])}
                  aria-describedby={errors[index] ? `column-error-${index}` : undefined}
                  placeholder={`Column ${index + 1}`}
                  className={`h-11 w-full rounded-md border bg-transparent px-4 pr-28 text-sm text-[#20212C] outline-none transition placeholder:text-[#828FA3] dark:text-white ${
                    errors[index]
                      ? "border-[#EA5555] focus:border-[#EA5555] focus:ring-1 focus:ring-[#EA5555]"
                      : "border-[#D9D9D9] focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:focus:border-[#A8A4FF] dark:focus:ring-[#A8A4FF]"
                  }`}
                />

                {errors[index] && (
                  <span
                    id={`column-error-${index}`}
                    className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#EA5555]'
                  >
                    {errors[index]}
                  </span>
                )}
              </div>

              <button
                type='button'
                onClick={() => removeColumn(index)}
                className='cursor-pointer pr-2 text-[#828FA3] hover:text-[#EA5555]2'
                aria-label={`Remove ${column || "column"}`}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <button
          type='button'
          onClick={addColumn}
          disabled={board.columns.length + columns.length >= 50}
          className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#635FC7]/10 py-2.5 text-sm font-bold text-[#635FC7] hover:bg-[#635FC7]/20 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <Plus size={18} />
          Add Another Column
        </button>
      </div>

      <button
        type='submit'
        disabled={updateBoard.isPending}
        className='w-full cursor-pointer rounded-full bg-[#635FC7] py-3 text-sm font-bold text-white hover:bg-[#7A75E0] disabled:cursor-not-allowed disabled:opacity-60'
      >
        {updateBoard.isPending ? "Creating..." : "Create Columns"}
      </button>
      {formError && (
        <p className='mt-3 text-sm text-red-500' role='alert'>
          {formError}
        </p>
      )}
      {updateBoard.isError && (
        <p className='mt-3 text-sm text-red-500' role='alert'>
          {updateBoard.error.message}
        </p>
      )}
    </form>
  );
}
