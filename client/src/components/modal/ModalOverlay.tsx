import { useEffect, type ReactNode } from "react";
import { useModalContext } from "../../contexts/ModalContext";

export default function ModalOverlay({ children }: { children: ReactNode }) {
  const { setActiveModal } = useModalContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setActiveModal]);

  const handleModalOff = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setActiveModal(null);
    }
  };

  return (
    <div
      onClick={handleModalOff}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]'
    >
      {children}
    </div>
  );
}
