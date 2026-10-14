import { PanelsTopLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { BoardSummary } from "../board.types";
import { useLocation } from "react-router-dom";

export default function BoardItem({ board }: { board: BoardSummary }) {
  const { pathname } = useLocation();
  const isActive = pathname.split("/")[2] === board.id;
  const slug = `/board/${board.id}/${board.name.replaceAll(" ", "-")}`;

  return (
    <Link
      to={slug}
      className={`flex w-67 md:w-55 items-center gap-2 rounded-r-3xl py-2.5 pl-8 ${
        isActive ? "bg-[#7230db]" : "hover:bg-[#E9E7F8]"
      }`}
    >
      <PanelsTopLeft
        size={20}
        strokeWidth={2}
        className={`shrink-0 ${isActive ? "text-white" : "text-[#828FA3]"}`}
      />

      <span
        className={
          isActive ? "text-[18px] text-white truncate" : "text-[18px] text-[#828FA3] truncate"
        }
      >
        {board.name}
      </span>
    </Link>
  );
}
