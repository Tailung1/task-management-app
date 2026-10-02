import { createContext, useContext, useState } from "react";

type ModalType =
  | "create-board"
  | "edit-board"
  | "delete-board"
  | "create-column"
  | "create-task"
  | "edit-task";

type ModalContextType = {
  activeModal: ModalType | null;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalType | null>>;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }

  return context;
};
