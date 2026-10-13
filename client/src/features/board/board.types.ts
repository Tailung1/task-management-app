import type { BoardColumn } from "../column/column.types";

interface Board {
  id: string;
  name: string;
  columns: BoardColumn[];
}

type CreateBoardInput = Omit<Board, "id">;
type UpdateBoardInput = Partial<Board>;

type BoardViewProps = {
  columns: BoardColumn[];
};

export type { Board, BoardColumn, BoardViewProps, CreateBoardInput, UpdateBoardInput };
