import {
  createColumn,
  updateColumn,
  deleteColumn,
} from "../db/queries/column.query.js";


export const addColumn = async (
  boardId: string,
  userId: string,
  name: string,
  position: number,
) => {
  return createColumn(boardId, userId, name, position);
};

export const editColumn = async (columnId: string, userId: string, name: string) => {
  return updateColumn(columnId, userId, name);
};

export const removeColumn = async (columnId: string, userId: string) => {
  return deleteColumn(columnId, userId);
};
