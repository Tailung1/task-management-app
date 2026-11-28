import type { Request, Response } from "express";
import { addTask, editTask, removeTask } from "../services/task.service.js";
import { isRequestBody, isUuid } from "../utils/request.validation.js";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;

    if (!isUuid(columnId)) {
      res.status(400).json({ message: "Invalid column ID" });
      return;
    }

    if (!isRequestBody(req.body)) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    const { title, description, position, subtasks = [] } = req.body;

    if (typeof title !== "string" || !title.trim() || title.length > 255) {
      res.status(400).json({ message: "Task title must be between 1 and 255 characters" });
      return;
    }
    if (description !== undefined && description !== null && typeof description !== "string") {
      res.status(400).json({ message: "Task description must be a string" });
      return;
    }
    if (typeof description === "string" && description.length > 10000) {
      res.status(400).json({ message: "Task description must be 10,000 characters or fewer" });
      return;
    }
    if (typeof position !== "number" || !Number.isInteger(position) || position < 0) {
      res.status(400).json({ message: "Task position must be a non-negative integer" });
      return;
    }
    if (
      !Array.isArray(subtasks) ||
      subtasks.length > 100 ||
      subtasks.some(
        (subtask: unknown) =>
          !isRequestBody(subtask) ||
          typeof subtask.title !== "string" ||
          !subtask.title.trim() ||
          subtask.title.length > 255 ||
          (subtask.isCompleted !== undefined && typeof subtask.isCompleted !== "boolean"),
      )
    ) {
      res.status(400).json({ message: "Invalid subtasks" });
      return;
    }

    const task = await addTask(
      columnId,
      req.user.id,
      title.trim(),
      description ?? null,
      position,
      subtasks.map((subtask: { title: string; isCompleted?: boolean }) => ({
        title: subtask.title.trim(),
        isCompleted: subtask.isCompleted ?? false,
      })),
    );

    if (!task) {
      res.status(404).json({ message: "Column not found" });
      return;
    }

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    if (!isUuid(taskId)) {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }

    if (!isRequestBody(req.body)) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    const { title, description, subtasks } = req.body;

    if (typeof title !== "string" || !title.trim() || title.length > 255) {
      res.status(400).json({ message: "Task title must be between 1 and 255 characters" });
      return;
    }
    if (description !== undefined && description !== null && typeof description !== "string") {
      res.status(400).json({ message: "Task description must be a string" });
      return;
    }
    if (typeof description === "string" && description.length > 10000) {
      res.status(400).json({ message: "Task description must be 10,000 characters or fewer" });
      return;
    }
    if (subtasks !== undefined) {
      if (
        !Array.isArray(subtasks) ||
        subtasks.length > 100 ||
        subtasks.some(
          (subtask: unknown) =>
            !isRequestBody(subtask) ||
            typeof subtask.title !== "string" ||
            !subtask.title.trim() ||
            subtask.title.length > 255 ||
            (subtask.id !== undefined && !isUuid(subtask.id)) ||
            (subtask.isCompleted !== undefined && typeof subtask.isCompleted !== "boolean"),
        )
      ) {
        res.status(400).json({ message: "Invalid subtasks" });
        return;
      }

      const subtaskIds = subtasks
        .map((subtask: { id?: string }) => subtask.id)
        .filter((id: string | undefined): id is string => Boolean(id));
      if (new Set(subtaskIds).size !== subtaskIds.length) {
        res.status(400).json({ message: "Subtask IDs must be unique" });
        return;
      }
    }

    const task = await editTask(
      taskId,
      req.user.id,
      title.trim(),
      description ?? null,
      subtasks?.map((subtask: { id?: string; title: string; isCompleted?: boolean }) => ({
        id: subtask.id,
        title: subtask.title.trim(),
        isCompleted: subtask.isCompleted ?? false,
      })),
    );

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
    
    if (!isUuid(taskId)) {
      res.status(400).json({ message: "Invalid task ID" });
      return;
    }

    const task = await removeTask(taskId, req.user.id);

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
