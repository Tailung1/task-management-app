import SidebarContent from "./SidebarContent";
import { createPortal } from "react-dom";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function MobileSidebar() {
  const { theme } = useThemeContext();
  return createPortal(
    <div
      className={`md:hidden flex flex-col bg-white w-75 gap-2 p-4 h-125 rounded-lg fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2
  transition-colors duration-500
  ${theme === "dark" && "bg-[#2B2C37]"}
  `}
    >
      <SidebarContent />
    </div>,
    document.body
  );
}
