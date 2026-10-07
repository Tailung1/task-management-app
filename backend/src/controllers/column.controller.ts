import type { Request, Response } from "express";
import { addColumn, editColumn, removeColumn } from "../services/column.service.js";

export const createColumnController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { name, position } = req.body;

    if (typeof boardId !== "string") {
      res.status(400).json({ message: "Invalid board ID" });
      return;
    }

    const column = await addColumn(boardId, name, position);

    res.status(201).json(column);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create column" });
  }
};

export const updateColumnController = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;
    const { name } = req.body;

    if (typeof columnId !== "string") {
      res.status(400).json({ message: "Invalid column ID" });
      return;
    }

    const column = await editColumn(columnId, name);

    if (!column) {
      res.status(404).json({ message: "Column not found" });
      return;
    }

    res.status(200).json(column);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update column" });
  }
};

export const deleteColumnController = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;

    if (typeof columnId !== "string") {
      res.status(400).json({ message: "Invalid column ID" });
      return;
    }

    const column = await removeColumn(columnId);

    if (!column) {
      res.status(404).json({ message: "Column not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete column" });
  }
};
