import type { Request, Response } from "express";
import {
  getBoards,
  getBoardDetails,
  addBoard,
  editBoard,
  removeBoard,
} from "../services/board.service.js";
import { isRequestBody, isUuid } from "../utils/request.validation.js";

export const getBoardsController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const boards = await getBoards(userId);
    res.status(200).json(boards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch boards" });
  }
};

export const getBoardDetailsController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;

    if (!isUuid(boardId)) {
      res.status(400).json({ message: "Invalid board ID" });
      return;
    }

    const board = await getBoardDetails(boardId, req.user.id);

    if (!board) {
      res.status(404).json({ message: "Board not found" });
      return;
    }

    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch board details" });
  }
};


export const createBoardController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    if (!isRequestBody(req.body)) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    const { name, columns = [] } = req.body;

    if (typeof name !== "string" || !name.trim() || name.length > 255) {
      res.status(400).json({ message: "Board name must be between 1 and 255 characters" });
      return;
    }

    if (
      !Array.isArray(columns) ||
      columns.length > 50 ||
      columns.some((column: unknown) => typeof column !== "string" || !column.trim())
    ) {
      res.status(400).json({ message: "Columns must contain up to 50 non-empty names" });
      return;
    }
    if (columns.some((column: string) => column.length > 255)) {
      res.status(400).json({ message: "Column names must be 255 characters or fewer" });
      return;
    }

    const board = await addBoard(
      userId,
      name.trim(),
      columns.map((column: string) => column.trim()),
    );

    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create board" });
  }
};

export const updateBoardController = async (req: Request, res: Response) => {
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
    const { name } = req.body;

    if (typeof name !== "string" || !name.trim() || name.length > 255) {
      res.status(400).json({ message: "Board name must be between 1 and 255 characters" });
      return;
    }

    const board = await editBoard(boardId, req.user.id, name.trim());

    if (!board) {
      res.status(404).json({ message: "Board not found" });
      return;
    }

    res.status(200).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update board" });
  }
};

export const deleteBoardController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;

    if (!isUuid(boardId)) {
      res.status(400).json({ message: "Invalid board ID" });
      return;
    }

    const board = await removeBoard(boardId, req.user.id);

    if (!board) {
      res.status(404).json({ message: "Board not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete board" });
  }
};
