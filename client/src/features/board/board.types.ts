import type {Task} from "../task/task.types"
interface Board {
  name: string;
  isActive: boolean;
}
type Boards = Board[];



type BoardColumn = {
  id: string;
  name: string;
  tasks: Task[];
};

type BoardViewProps = {
  columns: BoardColumn[];
};

export type { Board, Boards, Task, BoardColumn, BoardViewProps };
