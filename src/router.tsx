import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import EmptyBoardState from "./features/board/components/EmptyBoardState";
import BoardPage from "./features/board/pages/BoardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <EmptyBoardState />,
      },

      {
        path: "boards/:boardnamethere",
        element: <BoardPage />,
      },
    ],
  },
]);

export default router;
