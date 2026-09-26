import MobileHeader from "./MobileHeader";
import TabletHeader from "./TabletHeader";
export default function Header() {
  return (
    <header className='bg-red-300'>
      <div className='md:hidden'>
        <MobileHeader />
      </div>
      <TabletHeader />
    </header>
  );
}
