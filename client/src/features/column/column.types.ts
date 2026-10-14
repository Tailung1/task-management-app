import type { Task } from "../task/task.types";

type BoardColumn = {
  id: string;
  name: string;
  tasks: Task[];
};

export type { BoardColumn };
