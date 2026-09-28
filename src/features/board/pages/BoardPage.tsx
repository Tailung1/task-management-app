import EmptyBoardState from "../components/EmptyBoardState";
import { useThemeContext } from "../../../contexts/ThemeContext";

export default function BoardPage() {
  const { theme } = useThemeContext();
  return (
    <div
      className={`flex-1  flex items-center justify-center transition-transform duration-300 ease-in-out ${
        theme === "dark" ? "bg-gray-800" : "bg-sky-200"
      }`}
    >
      <EmptyBoardState />
    </div>
  );
}
