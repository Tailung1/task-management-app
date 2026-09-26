import MobileHeader from "./MobileHeader";
import LogoWrapper from "../../shared/LogoWrapper";

export default function TabletHeader() {
  return (
    <div className='hidden md:flex gap-4'>
      <LogoWrapper />
      <div className='w-0.5 min-h-full ml-9 bg-black'></div>
      <MobileHeader />
    </div>
  );
}
