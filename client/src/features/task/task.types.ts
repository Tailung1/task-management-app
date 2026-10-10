interface Task {
  id: number;
  title: string;
  description: string;
  currentStatus: string;
  subtasks: Subtask[];
}

interface Subtask {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export type { Task };
