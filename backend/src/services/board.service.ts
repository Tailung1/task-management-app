import {
  findBoardsByUserId,
  findBoardDetailsById,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../db/queries/board.query.js";

export const getBoards = async (userId: string) => {
  return findBoardsByUserId(userId);
};

export const getBoardDetails = async (boardId: string, userId: string) => {
  return findBoardDetailsById(boardId, userId);
};

export const addBoard = async (userId: string, name: string, columnNames: string[]) => {
  return createBoard(userId, name, columnNames);
};

export const editBoard = async (boardId: string, userId: string, name: string) => {
  return updateBoard(boardId, userId, name);
};

export const removeBoard = async (boardId: string, userId: string) => {
  return deleteBoard(boardId, userId);
};
