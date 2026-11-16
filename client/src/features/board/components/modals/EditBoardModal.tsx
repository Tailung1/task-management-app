import { useState } from "react";
import { Plus, RotateCcw, X } from "lucide-react";
import { useModalContext } from "../../../../contexts/ModalContext";
import { useUpdateBoard } from "../../board.queries";
import type { Board, UpdateBoardInput } from "../../board.types";

export default function EditBoardModal({ board }: { board: Board }) {
  const { setActiveModal } = useModalContext();
  const updateBoardMutation = useUpdateBoard();
  const [boardName, setBoardName] = useState(board.name);
  const [columns, setColumns] = useState(board.columns);
  const [columnsMarkedForDeletion, setColumnsMarkedForDeletion] = useState<Set<string>>(
    () => new Set(),
  );

  function updateColumnName(id: string, name: string) {
    setColumns((current) =>
      current.map((column) => (column.id === id ? { ...column, name } : column)),
    );
  }

  function addColumn() {
    setColumns((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "",
        tasks: [],
      },
    ]);
  }

  function removeColumn(id: string) {
    setColumnsMarkedForDeletion((current) => {
      const updated = new Set(current);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  }

  function handleSubmit() {
    if (updateBoardMutation.isPending) {
      return;
    }

    const existingColumnIds = new Set(board.columns.map((column) => column.id));
    const input: UpdateBoardInput = {
      id: board.id,
      name: boardName.trim(),
      columns: columns
        .filter((column) => !columnsMarkedForDeletion.has(column.id))
        .map((column) => ({
          ...(existingColumnIds.has(column.id) ? { id: column.id } : {}),
          name: column.name.trim(),
        })),
    };

    updateBoardMutation.mutate(input, {
      onSuccess: () => setActiveModal(null),
    });
  }

  return (
    <div className='w-full max-w-130 rounded-xl bg-white p-6 shadow-2xl dark:bg-[#2B2C37]'>
      <h2 className='mb-6 text-lg font-bold text-[#20212C] dark:text-white'>Edit Board</h2>

      {/* Board name */}
      <div className='mb-6'>
        <label htmlFor='board-name' className='mb-2 block text-xs font-bold text-[#828FA3]'>
          Board Name
        </label>

        <input
          id='board-name'
          type='text'
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className='h-11 w-full rounded-md border border-[#D9D9D9] bg-transparent px-4 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white'
        />
      </div>

      {/* Columns */}
      <div className='mb-6'>
        <p className='mb-2 text-xs font-bold text-[#828FA3]'>Board Columns</p>

        <div className='flex flex-col gap-3'>
          {columns.map((column) => (
            <div
              key={column.id}
              className={`flex items-center gap-2 ${
                columnsMarkedForDeletion.has(column.id) ? "opacity-50" : ""
              }`}
            >
              <input
                type='text'
                value={column.name}
                onChange={(e) => updateColumnName(column.id, e.target.value)}
                disabled={columnsMarkedForDeletion.has(column.id)}
                className={`h-11 flex-1 rounded-md border border-[#D9D9D9] bg-transparent px-4 text-sm text-[#20212C] outline-none transition focus:border-[#635FC7] focus:ring-1 focus:ring-[#635FC7] dark:border-[#4B4C5C] dark:text-white ${
                  columnsMarkedForDeletion.has(column.id) ? "line-through" : ""
                }`}
              />
              {columnsMarkedForDeletion.has(column.id) && (
                <span className='text-xs text-[#EA5555]'>Deletes on save</span>
              )}

              <button
                type='button'
                onClick={() => removeColumn(column.id)}
                className='cursor-pointer text-[#828FA3] transition-colors hover:text-[#EA5555]'
                aria-label={
                  columnsMarkedForDeletion.has(column.id)
                    ? `Undo deletion of ${column.name || "column"}`
                    : `Mark ${column.name || "column"} for deletion`
                }
                title={
                  columnsMarkedForDeletion.has(column.id) ? "Undo deletion" : "Mark for deletion"
                }
              >
                {columnsMarkedForDeletion.has(column.id) ? (
                  <RotateCcw size={20} />
                ) : (
                  <X size={20} />
                )}
              </button>
            </div>
          ))}
        </div>

        <button
          type='button'
          onClick={addColumn}
          className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#635FC7]/10 py-2.5 text-sm font-bold text-[#635FC7] transition-colors hover:bg-[#635FC7]/20'
        >
          <Plus size={18} />
          Add New Column
        </button>
      </div>

      <button
        type='button'
        onClick={handleSubmit}
        disabled={!boardName.trim() || updateBoardMutation.isPending}
        className='w-full cursor-pointer rounded-full bg-[#635FC7] py-3 text-sm font-bold text-white transition-colors hover:bg-[#7A75E0] disabled:cursor-not-allowed disabled:opacity-60'
      >
        {updateBoardMutation.isPending ? "Saving..." : "Save Changes"}
      </button>
      {updateBoardMutation.isError && (
        <p className='mt-3 text-sm text-red-500' role='alert'>
          {updateBoardMutation.error.message}
        </p>
      )}
    </div>
  );
}
