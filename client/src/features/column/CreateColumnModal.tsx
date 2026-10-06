import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function CreateColumnModal() {
  const [columns, setColumns] = useState([""]);
  const [errors, setErrors] = useState<string[]>([]);

  function addColumn() {
    setColumns((current) => [...current, ""]);
    setErrors((current) => [...current, ""]);
  }

  function updateColumn(index: number, value: string) {
    setColumns((current) => current.map((column, i) => (i === index ? value : column)));

    setErrors((current) => current.map((error, i) => (i === index ? "" : error)));
  }

  function removeColumn(index: number) {
    setColumns((current) => current.filter((_, i) => i !== index));
    setErrors((current) => current.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    const newErrors = columns.map((column) => (column.trim() === "" ? "Can't be empty" : ""));

    setErrors(newErrors);

    if (newErrors.some(Boolean)) {
      return;
    }

    // Create columns here
  }

  return (
    <div className='w-full max-w-130 rounded-xl bg-white p-6 shadow-2xl dark:bg-[#2B2C37]'>
      <h2 className='mb-6 text-lg font-bold text-[#20212C] dark:text-white'>Add New Columns</h2>

      <div className='mb-6'>
        <p className='mb-2 text-xs font-bold text-[#828FA3]'>Column Names</p>

        <div className='flex flex-col gap-3'>
          {columns.map((column, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div className='relative flex-1'>
                <input
                  value={column}
                  onChange={(e) => updateColumn(index, e.target.value)}
                  placeholder={`Column ${index + 1}`}
                  className={`h-11 w-full rounded-md border bg-transparent px-4 pr-28 text-sm text-[#20212C] outline-none transition placeholder:text-[#828FA3] dark:text-white ${
                    errors[index]
                      ? "border-[#EA5555] focus:border-[#EA5555] focus:ring-1 focus:ring-[#EA5555]"
                      : "border-[#D9D9D9] focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:focus:border-[#A8A4FF] dark:focus:ring-[#A8A4FF]"
                  }`}
                />

                {errors[index] && (
                  <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#EA5555]'>
                    {errors[index]}
                  </span>
                )}
              </div>

              <button
                type='button'
                onClick={() => removeColumn(index)}
                className='cursor-pointer text-[#828FA3] hover:text-[#EA5555]'
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
          className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#635FC7]/10 py-2.5 text-sm font-bold text-[#635FC7] hover:bg-[#635FC7]/20'
        >
          <Plus size={18} />
          Add Another Column
        </button>
      </div>

      <button
        type='button'
        onClick={handleSubmit}
        className='w-full cursor-pointer rounded-full bg-[#635FC7] py-3 text-sm font-bold text-white hover:bg-[#7A75E0]'
      >
        Create Columns
      </button>
    </div>
  );
}
