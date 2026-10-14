import type { BoardColumn } from "../column/column.types";

interface BoardSummary {
  id: string;
  name: string;
}

interface Board extends BoardSummary {
  columns: BoardColumn[];
}

type CreateBoardInput = Pick<BoardSummary, "name"> & { columns: string[] };
type UpdateBoardInput = Partial<BoardSummary>;

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
