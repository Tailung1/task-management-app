import type { Request, Response } from "express";
import { addTask, editTask, removeTask } from "../services/task.service.js";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;
    const { title, description, position } = req.body;

    if (typeof columnId !== "string") {
      res.status(400).json({ message: "Invalid column ID" });
      return;
    }

    const task = await addTask(columnId, title, description, position);

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description } = req.body;

    if (typeof taskId !== "string") {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }

    const task = await editTask(taskId, title, description);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    if (typeof taskId !== "string") {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }

    const task = await removeTask(taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
