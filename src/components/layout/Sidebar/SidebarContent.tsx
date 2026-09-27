import LogoWrapper from "../../shared/LogoWrapper";
import BoardList from "../../../features/board/components/BoardList";
import SidebarFooter from "./SidebarFooter";

export default function SidebarContent() {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <LogoWrapper />
        <BoardList />
      </div>
      <SidebarFooter />
    </>
  );
}
