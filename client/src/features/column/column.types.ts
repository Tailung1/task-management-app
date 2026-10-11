import type { Task } from "../task/task.types";

type BoardColumn = {
  id: number;
  name: string;
  tasks: Task[];
};

export type { BoardColumn };
