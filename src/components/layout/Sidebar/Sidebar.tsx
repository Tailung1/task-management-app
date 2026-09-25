import logo from "../../../assets/images/logo.png";
import boardIcon from "../../../assets/images/board-icon.svg";

export default function Sidebar() {
  const boards = ["Personal board"];
  return (
    <div>
      <div>
        <img src={logo} alt='logo' />
        <h2>Kanban</h2>
      </div>

      <p>
        ALL BOARDS <span>(3)</span>
      </p>
      <section className='flex flex-col gap-2'>
        {boards.map((board) => (
          <div className='flex items-center gap-1'>
            <img className='w-3 h-3' src={boardIcon} alt='logo' />
            <p>{board}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
