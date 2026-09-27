import { createContext, useContext } from "react";
import { useState } from "react";

type SidebarContextType = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export default function SidebarProvider({ children }: { children: any }) {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used inside SidebarProvider");
  }

  return context;
};
