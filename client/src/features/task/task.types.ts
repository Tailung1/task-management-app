interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type { Task };
