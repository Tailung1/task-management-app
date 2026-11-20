import { createBrowserRouter, Navigate, Outlet, useLocation, useRoutes } from "react-router-dom";
import type { Location } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import BoardPage from "./features/board/pages/BoardPage";
import NoBoardState from "./features/board/pages/NoBoardState";
import AuthLayout from "./features/auth/components/AuthLayout";
import RequireAuth from "./features/auth/components/RequireAuth";
import ForgotPasswordPage from "./features/auth/pages/ForgotPasswordPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";

const appRoutes = [
  {
    index: true,
    element: <NoBoardState />,
  },
  {
    path: "board/:id/:boardName",
    element: <BoardPage />,
  },
];

const backgroundRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: appRoutes,
  },
];

function isLocation(value: unknown): value is Location {
  return (
    typeof value === "object" &&
    value !== null &&
    "pathname" in value &&
    typeof value.pathname === "string" &&
    "search" in value &&
    typeof value.search === "string" &&
    "hash" in value &&
    typeof value.hash === "string" &&
    "key" in value &&
    typeof value.key === "string"
  );
}

function AuthBackgroundLayout() {
  const location = useLocation();
  const [rememberedBackground, setRememberedBackground] = useState<Location | null>(null);
  const authRoute = location.pathname.startsWith("/auth");
  const state = location.state;
  const requestedBackground =
    typeof state === "object" && state !== null && "from" in state && isLocation(state.from)
      ? state.from
      : null;

  useEffect(() => {
    if (requestedBackground) {
      setRememberedBackground(requestedBackground);
    } else if (!authRoute) {
      setRememberedBackground(null);
    }
  }, [authRoute, requestedBackground]);

  const backgroundLocation = authRoute
    ? (requestedBackground ??
      rememberedBackground ?? {
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default",
      })
    : undefined;
  const background = useRoutes(authRoute ? backgroundRoutes : [], backgroundLocation);

  return (
    <>
      {authRoute && (
        <div aria-hidden='true' className='fixed inset-0'>
          {background}
        </div>
      )}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthBackgroundLayout />,
    children: [
      {
        element: (
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        ),
        children: appRoutes,
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to='login' replace />,
          },
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
    ],
  },
]);

export default router;
