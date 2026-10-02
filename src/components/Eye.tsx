import eyeOpen from "../assets/images/eyes-open.png";
import { useSidebarContext } from "../contexts/SidebarContext";

export default function Eye() {
  const { showSidebar, setShowSidebar } = useSidebarContext();
  return (
    <button
      onClick={() => setShowSidebar(true)}
      className={`${
        showSidebar ? "md:hidden" : "md:flex"
      } hidden bg-[rgb(99,95,199)] hover:bg-[rgb(120,116,220)] w-16 items-center justify-center p-4 rounded-r-4xl fixed bottom-20 cursor-pointer`}
    >
      <img className='w-6 h-6' src={eyeOpen} alt='opened eyes icon ' />
    </button>
  );
}

