import SidebarContent from "./SidebarContent";

export default function TabletSidebar() {
  return (
    <div className='hidden md:flex flex-col gap-2 p-4 bg-green-500  absolute'>
      <SidebarContent />
    </div>
  );
}
