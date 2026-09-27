import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function EmptyBoardState() {
  const { showSidebar } = useSidebarContext();

  return (
    <div
      className={`flex flex-col  font-bold  gap-4 items-center absolute w-73 top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 transition-transform duration-700 ease-in-out ${
        showSidebar ? "md:-translate-x-1/5" : "-translate-x-1/2"
      }`}
    >
      <p className='text-[18px] text-center leading-tight'>
        This board is empty. Create a new column to get started.
      </p>
      <button className='flex gap-2 items-center cursor-pointer bg-violet-400 w-fit py-3 px-4 rounded-full hover:bg-violet-300'>
        <span>+</span>
        <p className='text-white'>Add New Column</p>
      </button>
    </div>
  );
}
