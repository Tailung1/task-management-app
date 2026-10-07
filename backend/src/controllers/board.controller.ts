import type { Request, Response } from "express";
import {
  getBoards,
  addBoard,
  editBoard,
  removeBoard,
} from "../services/board.service.js";

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



export const createBoardController = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const board = await addBoard(userId, name);

    res.status(201).json(board);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create board" });
  }
};

export const updateBoardController = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    const { name } = req.body;

    if (typeof boardId !== "string") {
      res.status(400).json({ message: "Invalid board ID" });
      return;
    }

    const board = await editBoard(boardId, name);

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

    if (typeof boardId !== "string") {
      res.status(400).json({ message: "Invalid board ID" });
      return;
    }

    const board = await removeBoard(boardId);

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
