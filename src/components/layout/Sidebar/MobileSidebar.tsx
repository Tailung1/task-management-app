import SidebarContent from "./SidebarContent";
import { createPortal } from "react-dom";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function MobileSidebar() {
  const { showSidebar } = useSidebarContext();
  return createPortal(
    <div
      className={` ${
        showSidebar ? "flex" : "hidden"
      } overflow-hidden md:hidden flex flex-col bg-white dark:bg-[#2B2C37] w-75 gap-2 p-4 h-125 rounded-lg fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2
  transition-colors duration-500
  `}
    >
      <SidebarContent />
    </div>,
    document.body
  );
}
