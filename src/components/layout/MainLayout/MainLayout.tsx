import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
// import useDeviceType from "../../../hooks/useMediaQuery";
import Eye from "../../../utility/Eye";

export default function MainLayout() {
  //   const deviceType = useDeviceType();
  return (
    <div className='flex flex-col h-screen  relative'>
      <Sidebar />
      <Eye />
      <Header />
      <main className='flex flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
