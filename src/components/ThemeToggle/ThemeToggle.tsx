import sun from "../../assets/images/sun.png";
import moon from "../../assets/images/moon.png";
import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const { setTheme } = useThemeContext();
  return (
    <div className='flex items-center justify-center gap-5 rounded-full bg-slate-200 px-3 py-2 shadow-lg'>
      <img className='h-6 w-6' src={sun} alt='sun icon' />

      <button
        onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
        className={` cursor-pointer relative h-7 w-12 rounded-full transition-colors duration-300 ${
          activeTheme === "dark" ? "bg-slate-700" : "bg-violet-500"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white  transition-transform duration-300 ${
            activeTheme === "dark" ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>

      <img className='h-5 w-5' src={moon} alt='moon icon' />
    </div>
  );
}
