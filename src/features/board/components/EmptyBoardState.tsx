import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function EmptyBoardState() {
  const { showSidebar } = useSidebarContext();

  return (
    <div
      className={`flex flex-col absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 transition-transform duration-700 ease-in-out ${
        showSidebar ? "md:-translate-x-1/5" : "-translate-x-1/2"
      }`}
    >
      <p>This board is empty. Create a new column to get started.</p>
      <button>
        <span>+</span>
        <p>Add New Column</p>
      </button>
    </div>
  );
}
