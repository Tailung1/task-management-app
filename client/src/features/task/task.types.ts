interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type { Task };
