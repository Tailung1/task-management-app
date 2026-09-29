import EmptyBoardState from "./EmptyBoardState";
import { useParams } from "react-router-dom";

export default function BoardPage() {
  const params = useParams();
  console.log(params);
  return (
    <div className='flex-1  flex items-center justify-center bg-sky-200 dark:bg-gray-800 '>
      <EmptyBoardState />
    </div>
  );
}
