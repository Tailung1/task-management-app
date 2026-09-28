import SidebarContent from "./SidebarContent";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function TabletSidebar() {
  const { showSidebar } = useSidebarContext();
  const { theme } = useThemeContext();

  return (
    <div
      className={`hidden md:flex flex-col h-full fixed items-center gap-2 p-4 
    transition-all duration-800 ease
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
${theme === "dark" ? "bg-[#2B2C37]" : "bg-white"}
  `}
    >
      <SidebarContent />
    </div>
  );
}
