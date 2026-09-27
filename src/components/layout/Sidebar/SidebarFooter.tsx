import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import eyeHide from "../../../assets/images/eye-hide.png";

export default function SidebarFooter() {
  const { setShowSidebar } = useSidebarContext();
  return (
    <div className='flex flex-col items-center justify-end w-full h-full'>
      <div className='flex w-full flex-col items-start'>
        <ThemeToggle />
        <div
          onClick={() => setShowSidebar(false)}
          className='hidden md:flex gap-2 items-center pt-5 cursor-pointer'
        >
          <img className='w-6 h-6' src={eyeHide} alt='Hide eye icon' />
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
}
