import logo from "../../../assets/images/logo.png";
import arrowDown from "../../../assets/images/arrow-down.png";
import menuDots from "../../../assets/images/menu-dots.png";
import plus from "../../../assets/images/plus.png";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function MobileHeader() {
  const { showSidebar } = useSidebarContext();
  return (
    <div className='flex justify-between p-2 w-full'>
      <div className='flex justify-between items-center gap-3'>
        <img className='w-10 h-10 md:hidden' src={logo} alt='logo' />

        <div
          className={`flex items-center gap-1 transition-transform duration-1000 ease ${
            showSidebar ? "md:translate-x-12" : "translate-x-0"
          }   `}
        >
          <h3 className='font-bold text-lg'>Personal board</h3>
          <img className='w-5 h-5' src={arrowDown} alt='arrow-down-icon' />
        </div>
      </div>

      <div className='flex'>
        <button className='rounded-[20px] px-5 bg-violet-400'>
          <img className='w-4 h-4' src={plus} alt='X button' />
        </button>{" "}
        <img className='w-10 h-10' src={menuDots} alt='menu-dots-icon' />
      </div>
    </div>
  );
}
