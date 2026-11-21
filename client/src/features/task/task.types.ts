interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

type CreateTaskInput = Omit<Task, "id">;

export type { Task, CreateTaskInput };
