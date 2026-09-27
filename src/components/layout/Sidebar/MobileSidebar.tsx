import SidebarContent from "./SidebarContent";
import { createPortal } from "react-dom";

export default function MobileSidebar() {
  return createPortal(
    <div
      className="md:hidden flex flex-col w-75 gap-2 p-4 h-125 bg-green-500 rounded-lg fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2"
    >
      <SidebarContent />
    </div>,
    document.body
  );
}
