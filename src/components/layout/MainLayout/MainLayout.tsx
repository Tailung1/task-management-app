import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
// import Sidebar from "../Sidebar/Sidebar";
// import useDeviceType from "../../../hooks/useMediaQuery";
import Eye from "../../../utility/Eye";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";

export default function MainLayout() {
//   const deviceType = useDeviceType();
  return (
    <div className='flex flex-col'>
        <ThemeToggle/>
        <Eye />
      <Header />
      <main className='flex flex-col h-screen'>
        <Outlet />
      </main>
    </div>
  );
}
