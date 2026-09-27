import EmptyBoardState from "../components/EmptyBoardState";
export default function BoardPage() {

  return (
    <div
      className="h-full flex items-center justify-center transition-transform duration-300 ease-in-out "
    >
      <EmptyBoardState />
    </div>
  );
}