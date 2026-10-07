import {
  findBoardsByUserId,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../db/queries/board.query.js";

export const getBoards = async (userId: string) => {
  return findBoardsByUserId(userId);
};

export const addBoard = async (userId: string, name: string) => {
  return createBoard(userId, name);
};

export const editBoard = async (boardId: string, name: string) => {
  return updateBoard(boardId, name);
};

export const removeBoard = async (boardId: string) => {
  return deleteBoard(boardId);
};
