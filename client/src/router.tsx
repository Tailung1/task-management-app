import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import BoardPage from "./features/board/pages/BoardPage";
import NoBoardState from "./features/board/pages/NoBoardState";
import AuthLayout from "./features/auth/components/AuthLayout";
import RequireAuth from "./features/auth/components/RequireAuth";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <NoBoardState />,
      },
      {
        path: "board/:id/:boardName",
        element: <BoardPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

export default router;
