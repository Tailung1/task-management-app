import { PanelsTopLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { Board } from "../board.types";

export default function BoardItem({ board }: { board: Board }) {
  const slug = `/board/${board.name.replaceAll(" ", "-")}`;

  return (
    <Link
      to={slug}
      className={`flex w-67 md:w-55 items-center gap-2  rounded-r-3xl py-3 pl-8 ${
        board.isActive ? "bg-[#7230db]" : "hover:bg-[#E9E7F8]"
      }`}
    >
      <PanelsTopLeft
        size={24}
        strokeWidth={2}
        className={board.isActive ? "text-white" : "text-[#828FA3]"}
      />

      <span className={board.isActive ? "text-[18px] text-white" : "text-[18px] text-[#828FA3]"}>
        {board.name}
      </span>
    </Link>
  );
}
