import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function NoBoardState() {
  const { showSidebar } = useSidebarContext();
  return (
    <div
      className={`flex flex-col font-bold  gap-4 items-center absolute text-red-500 top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 transition-transform duration-700 ease-in-out ${
        showSidebar ? "translate-x-10" : "-translate-x-1/2"
      }`}
    >
      Please select the board
    </div>
  );
}
