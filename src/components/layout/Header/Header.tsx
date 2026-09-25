import logo from "../../../assets/images/logo.png";
import arrowDown from "../../../assets/images/arrow-down.png";
import menuDots from "../../../assets/images/menu-dots.png";

export default function Header() {
  return (
    <header>
      <div>
        <img src={logo} alt='logo' />

        <div>
          <h3>Platform Launch</h3>
          <img src={arrowDown} alt='arrow-down-icon' />
        </div>
      </div>

      <div>
        <button>+</button>
        <img src={menuDots} alt='menu-dots-icon' />
      </div>
    </header>
  );
}
