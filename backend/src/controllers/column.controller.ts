import {
  findColumnsByBoardId,
  createColumn,
  updateColumn,
  deleteColumn,
} from "../db/queries/column.query.js";

export const getColumnsByBoardId = async (boardId: string) => {
  return findColumnsByBoardId(boardId);
};

export const addColumn = async (boardId: string, name: string, position: number) => {
  return createColumn(boardId, name, position);
};

export const editColumn = async (columnId: string, name: string) => {
  return updateColumn(columnId, name);
};

export const removeColumn = async (columnId: string) => {
  return deleteColumn(columnId);
};
