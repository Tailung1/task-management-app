import type { BoardColumn } from "../column/column.types";

interface Board {
  id: number;
  name: string;
  isActive: boolean;
  columns: BoardColumn[];
}

type CreateBoardInput=Omit<Board,"id">
type UpdateBoardInput = Partial<Board>;


type BoardViewProps = {
  columns: BoardColumn[];
};

export type { Board, BoardColumn, BoardViewProps, CreateBoardInput, UpdateBoardInput };
