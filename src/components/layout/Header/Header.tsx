import MobileHeader from "./MobileHeader";
import TabletHeader from "./TabletHeader";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function Header() {
  const { theme } = useThemeContext();

  return (
    <header
      className={`transition-colors duration-600 ${theme === "dark" ? "bg-[#2B2C37]" : "bg-white"}`}
    >
      <div className='md:hidden'>
        <MobileHeader />
      </div>
      <TabletHeader />
    </header>
  );
}
