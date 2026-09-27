import LogoWrapper from "../../shared/LogoWrapper";
import eyeHide from "../../../assets/images/eye-hide.png";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import boardIcon from "../../../assets/images/board-icon.svg";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

export default function SidebarContent() {
  const { setShowSidebar } = useSidebarContext();
  const boards = [
    {
      name: "Personal board",
      isActive: true,
    },
    {
      name: "Task1",
      isActive: false,
    },
  ];
  return (
    <>
      <div className='flex flex-col gap-3'>
        <LogoWrapper />
        <p>
          ALL BOARDS <span>(3)</span>
        </p>
        <section className='flex flex-col'>
          {boards.map((board, index) => (
            <div
              key={index}
              className={`flex items-center py-4   gap-2  rounded-r-3xl  ${
                board.isActive && "bg-[#7230db] -ml-4 pl-4"
              }`}
            >
              {" "}
              <img className='w-6 h-6' src={boardIcon} alt='logo' />
              <p className='text-[18px]'>{board.name}</p>
            </div>
          ))}
        </section>
        <div className='flex items-cente gap-2 pb-6'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect x='3' y='4' width='18' height='16' rx='2.5' stroke='#7230db' strokeWidth='2' />
            <path d='M3 10H21' stroke='#7230db' strokeWidth='2' />
            <path d='M15 10V20' stroke='#7230db' strokeWidth='2' />{" "}
          </svg>
          <div className='flex gap-1 items-center'>
            <span>+</span>
            <p className='text-[18px] text-[#7230db]'>Create New Board</p>
          </div>
        </div>
      </div>
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
    </>
  );
}
