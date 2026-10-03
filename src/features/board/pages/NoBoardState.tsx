import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function NoBoardState() {
  const { showSidebar } = useSidebarContext();
  return (
    <div
      className={`flex flex-col font-bold  gap-4 items-center absolute text-red-500 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-transform md:duration-700 ease-in-out ${
        showSidebar && "md:translate-x-8"
      }`}
    >
      Please select the board
    </div>
  );
}
