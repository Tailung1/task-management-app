import { Eye as EyeIcon } from "lucide-react";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function Eye() {
  const { showSidebar, setShowSidebar } = useSidebarContext();

  return (
    <button
      onClick={() => setShowSidebar(true)}
      className={`${
        showSidebar ? "md:hidden" : "md:flex"
      } hidden fixed bottom-20 w-16 items-center justify-center rounded-r-4xl bg-[rgb(99,95,199)] p-4 cursor-pointer hover:bg-[rgb(120,116,220)]`}
      aria-label='Show sidebar'
    >
      <EyeIcon size={24} strokeWidth={2} className='text-white' aria-hidden='true' />
    </button>
  );
}
