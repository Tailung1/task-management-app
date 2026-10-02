import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./contexts/ThemeContext.tsx";
import SidebarProvider from "./contexts/SidebarContext.tsx";
import ModalProvider from "./contexts/ModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>
);
