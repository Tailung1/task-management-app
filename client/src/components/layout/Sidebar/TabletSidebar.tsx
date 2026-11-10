import SidebarContent from "./SidebarContent";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function TabletSidebar() {
  const { showSidebar } = useSidebarContext();

  return (
    <div
      className={`z-1 hidden md:flex w-65 shrink-0 flex-col border-r-[0.5px] border-gray-600 h-full fixed items-center gap-2 p-4  bg-white dark:bg-[#2B2C37]
    transition-all duration-800 ease
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      <SidebarContent />
    </div>
  );
}
