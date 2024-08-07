import { PropsWithChildren } from "react";
import { ClientPortal } from "@/infrastructure/portal";

interface IProps {
  selector: string;
  show?: boolean;
  onClose?: () => void;
}

export function Modal({ children, show, selector, onClose }: PropsWithChildren<IProps>) {
  function closeModal() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <ClientPortal selector={selector} show={show} onClose={onClose}>
      <div className="static">
        <div className="absolute top-0 left-0 inset-0 overflow-y-auto flex items-center justify-center">
          <div onClick={closeModal} className="fixed bg-modal-backdrop opacity-50 overflow-y-auto h-full w-full" />
          <div className="bg-white shadow-lg m-4 max-w-4xl w-full relative">
            {children}
          </div>
        </div>
      </div>
    </ClientPortal>
  )
}
