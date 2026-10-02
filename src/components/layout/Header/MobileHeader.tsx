import { useState } from "react";
import { ChevronDown, EllipsisVertical, Plus } from "lucide-react";
import logo from "../../../assets/images/logo.png";
import { useSidebarContext } from "../../../contexts/SidebarContext";
import { useModalContext } from "../../../contexts/ModalContext";
import BoardOptionsMenu from "../../../features/board/components/BoardOptionsMenu";
import { useLocation } from "react-router-dom";

export default function MobileHeader() {
  const { showSidebar } = useSidebarContext();
  const { setActiveModal } = useModalContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleModalOpen = () => {
    if (location.pathname === "/") return;
    setActiveModal("create-task");
  };

  return (
    <div className='flex w-full justify-between p-2'>
      {" "}
      <div className='flex items-center justify-between gap-3'>
        {" "}
        <img className='h-10 w-10 md:hidden' src={logo} alt='logo' />{" "}
        <div
          className={`flex items-center gap-1 transition-transform duration-1000 ease ${
            showSidebar ? "md:translate-x-12" : "translate-x-0"
          }`}
        >
          {" "}
          <h3 className='text-lg font-bold'>Personal board</h3>{" "}
          <ChevronDown size={20} strokeWidth={2} aria-hidden='true' />{" "}
        </div>{" "}
      </div>{" "}
      <div className='flex items-center gap-1'>
        {" "}
        <button
          onClick={handleModalOpen}
          type='button'
          className='flex cursor-pointer items-center gap-2 rounded-[30px] bg-[#635FC7] px-3 py-3 text-white hover:bg-[#7A75E0]'
          aria-label='Add New Task'
        >
          {" "}
          <Plus size={18} strokeWidth={2.5} aria-hidden='true' />{" "}
          <span className='font-bold'>Add New Task</span>{" "}
        </button>{" "}
        <div className='relative'>
          {" "}
          <button
            type='button'
            className='cursor-pointer'
            aria-label='More options'
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {" "}
            <EllipsisVertical
              size={30}
              strokeWidth={2}
              className='text-[#828FA3]'
              aria-hidden='true'
            />{" "}
          </button>{" "}
          {isMenuOpen && (
            <BoardOptionsMenu
              onEdit={() => {
                setIsMenuOpen(false);
                setActiveModal("edit-board");
              }}
              onDelete={() => {
                setIsMenuOpen(false);
                setActiveModal("delete-board");
              }}
            />
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
