import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import BoardPage from "./features/board/pages/BoardPage";
import NoBoardState from "./features/board/pages/NoBoardState";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <NoBoardState />,
      },
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
      {
        path: "auth/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "auth/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "board/:id/:boardName",
        element: <BoardPage />,
      },
    ],
  },
]);

export default router;
