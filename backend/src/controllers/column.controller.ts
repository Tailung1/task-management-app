import type { Request, Response } from "express";
import { addColumn, editColumn, removeColumn } from "../services/column.service.js";
import { isRequestBody, isUuid } from "../utils/request.validation.js";

export const createColumnController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;

    if (!isUuid(boardId)) {
      res.status(400).json({ message: "Invalid board ID" });
      return;
    }

    if (!isRequestBody(req.body)) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    const { name, position } = req.body;

    if (typeof name !== "string" || !name.trim() || name.length > 255) {
      res.status(400).json({ message: "Column name must be between 1 and 255 characters" });
      return;
    }
    if (typeof position !== "number" || !Number.isInteger(position) || position < 0) {
      res.status(400).json({ message: "Column position must be a non-negative integer" });
      return;
    }

    const column = await addColumn(boardId, req.user.id, name.trim(), position);

    if (!column) {
      res.status(404).json({ message: "Board not found" });
      return;
    }

    res.status(201).json(column);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create column" });
  }
};

export const updateColumnController = async (req: Request, res: Response) => {
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
    const { name } = req.body;

    if (typeof name !== "string" || !name.trim() || name.length > 255) {
      res.status(400).json({ message: "Column name must be between 1 and 255 characters" });
      return;
    }

    const column = await editColumn(columnId, req.user.id, name.trim());

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

    if (!isUuid(columnId)) {
      res.status(400).json({ message: "Invalid column ID" });
      return;
    }

    const column = await removeColumn(columnId, req.user.id);

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
