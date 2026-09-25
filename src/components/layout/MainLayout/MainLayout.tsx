import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className='flex flex-col'>
      <Header />
      <main className='flex flex-col h-screen'>
        <Outlet />
      </main>
    </div>
  );
}
