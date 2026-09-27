import boardIcon from "../../../assets/images/board-icon.svg";

export default function BoardItem({ board }: {  board: any }) {
  return (
    <div

      className={`flex items-center py-4 gap-2  rounded-r-3xl  ${
        board.isActive && "bg-[#7230db] -ml-4 pl-4"
      }`}
    >
      {" "}
      <img className='w-6 h-6' src={boardIcon} alt='logo' />
      <p className='text-[18px]'>{board.name}</p>
    </div>
  );
}
