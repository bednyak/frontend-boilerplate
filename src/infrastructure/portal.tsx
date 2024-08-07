'use client'
import { PropsWithChildren, useEffect, useRef, } from "react";
import { createPortal } from "react-dom";
interface IClientPortalInterface {
  show?: boolean;
  onClose?: () => void;
  selector: string;
}

export function ClientPortal({ children, selector, show }: PropsWithChildren<IClientPortalInterface>) {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  return show && ref.current ? createPortal(children, ref.current) : null;
}