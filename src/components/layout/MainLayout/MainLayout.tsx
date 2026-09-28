import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Eye from "../../Eye";
import { useSidebarContext } from "../../../contexts/SidebarContext";

export default function MainLayout() {
  const { showSidebar, setShowSidebar } = useSidebarContext();
  return (
    <div className='flex flex-col h-screen  relative'>
      <div
        onClick={() => setShowSidebar(false)}
        className={`layer md:hidden  bg-black/50 fixed min-w-screen min-h-screen ${
          showSidebar ? "flex" : "hidden"
        }`}
      />
      <Sidebar />
      <Eye />
      <Header />
      <main className='flex flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
