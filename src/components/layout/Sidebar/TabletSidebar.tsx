import SidebarContent from "./SidebarContent";

export default function TabletSidebar() {
  return (
    <div className='hidden md:flex flex-col h-full fixed items-center gap-2 p-4 bg-green-500  animate-slide-in'>
      <SidebarContent />
    </div>
  );
}
