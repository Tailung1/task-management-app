import { type ReactNode } from "react";

export default function ModalOverlay({ children }: { children: ReactNode }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]'>
      {children}
    </div>
  );
}