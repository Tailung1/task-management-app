import { createColumn } from "../db/queries/column.query.js";

export const addColumn = async (
  boardId: string,
  userId: string,
  name: string,
  position: number,
) => {
  return createColumn(boardId, userId, name, position);
};
