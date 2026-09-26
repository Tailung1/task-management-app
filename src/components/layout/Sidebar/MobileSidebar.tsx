import SidebarContent from "./SidebarContent";

export default function MobileSidebar() {
  return (
    <div className='md:hidden flex flex-col w-75 gap-2 p-4 bg-green-500 rounded-lg absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2'>
      <SidebarContent />
    </div>
  );
}
