import type { BoardColumn } from "../column/column.types";

interface Board {
  id: number;
  name: string;
  isActive: boolean;
  columns: BoardColumn[];
}

type BoardViewProps = {
  columns: BoardColumn[];
};

export type { Board, BoardColumn, BoardViewProps };
