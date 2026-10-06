import logo from "../../assets/images/logo.png"

export default function LogoWrapper() {
  return (
    <div className='flex items-center gap-3'>
      <img className='w-10 h-10' src={logo} alt='logo' />
      <h2 className='text-[25px] font-bold'>Kanban</h2>
    </div>
  );
}
