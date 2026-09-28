import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import BoardPage from "./features/board/pages/BoardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <BoardPage />,
      },

      {
        path: "boards/:boardnamethere",
        element: <BoardPage />,
      },
    ],
  },
]);

export default router;
