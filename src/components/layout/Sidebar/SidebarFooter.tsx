import { EyeOff } from "lucide-react";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function SidebarFooter() {
  const { setShowSidebar } = useSidebarContext();

  return (
    <div className='flex h-full w-full flex-col items-center justify-end'>
      <div className='flex w-full flex-col items-start'>
        <ThemeToggle />

        <div
          onClick={() => setShowSidebar(false)}
          className='hidden items-center gap-2 pt-5 text-[#828FA3] cursor-pointer md:flex'
        >
          <EyeOff size={24} strokeWidth={2} aria-hidden='true' />
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
}
