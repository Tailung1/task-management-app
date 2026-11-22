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

type CreateTaskVariables = {
  columnId: string;
  data: CreateTaskInput;
};

export type { Task, CreateTaskInput, CreateTaskVariables };
