import type { BoardColumn } from "../column/column.types";

interface BoardSummary {
  id: string;
  name: string;
}

interface Board extends BoardSummary {
  columns: BoardColumn[];
}

// intersection type                        intersection operator
type CreateBoardInput = Pick<BoardSummary, "name"> & { columns?: string[] };
type UpdateBoardInput = {
  id: string;
  name: string;
  columns?: { id?: string; name: string }[];
};

type BoardViewProps = {
  columns: BoardColumn[];
  onSelectTask: (taskId: string) => void;
};

export type {
  Board,
  BoardSummary,
  BoardColumn,
  BoardViewProps,
  CreateBoardInput,
  UpdateBoardInput,
};
