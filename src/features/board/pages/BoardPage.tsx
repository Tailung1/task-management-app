import EmptyBoardState from "./EmptyBoardState";

export default function BoardPage() {
  return (
    <div className='flex-1  flex items-center justify-center bg-sky-200 dark:bg-gray-800 '>
      <EmptyBoardState />
    </div>
  );
}
