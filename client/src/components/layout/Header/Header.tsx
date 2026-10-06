import MobileHeader from "./MobileHeader";
import TabletHeader from "./TabletHeader";

export default function Header() {
  return (
    <header className='transition-colors duration-600 bg-white dark:bg-[#2B2C37]'>
      {/* <header className='transition-colors duration-600 light:bg-white dark:bg-[#2B2C37]'> */}
      <div className='md:hidden'>
        <MobileHeader />
      </div>
      <TabletHeader />
    </header>
  );
}
