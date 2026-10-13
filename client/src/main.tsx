import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./contexts/ThemeContext.tsx";
import SidebarProvider from "./contexts/SidebarContext.tsx";
import ModalProvider from "./contexts/ModalContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SidebarProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
