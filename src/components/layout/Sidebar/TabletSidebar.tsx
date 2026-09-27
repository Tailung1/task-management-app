import SidebarContent from "./SidebarContent";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function TabletSidebar() {
  const { showSidebar } = useSidebarContext();
  return (
    <div
      className={`hidden md:flex flex-col h-full fixed items-center gap-2 p-4 bg-green-500
    transition-transform duration-700 ease
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
  `}
    >
      <SidebarContent />
    </div>
  );
}
