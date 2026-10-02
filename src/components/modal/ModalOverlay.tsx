import { type ReactNode } from "react";
import { useModalContext } from "../../contexts/ModalContext";

export default function ModalOverlay({ children }: { children: ReactNode }) {
  const { activeModal, setActiveModal } = useModalContext();

  const handleModalOff = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && activeModal === "create-task") {
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
