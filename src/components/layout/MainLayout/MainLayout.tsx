import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Eye from "../../Eye";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function MainLayout() {
  const { showSidebar, setShowSidebar } = useSidebarContext();
  return (
    <div className='flex flex-col h-screen  relative'>
      {/* Mobile sidebar overlay */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`overlay md:hidden fixed inset-0  ease ${
          showSidebar ? "flex bg-black/70" : "animate-bg-out"
        }`}
      />
      <Sidebar />
      <Eye />
      <Header />
      <main className='flex flex-1 bg-[#f2f2f3] dark:bg-[#20212C]'>
        <Outlet />
      </main>
    </div>
  );
}
