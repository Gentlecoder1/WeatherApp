import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(ref: React.RefObject<T | null>, onClose: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // If the click is on a toggle button, ignore it
      const target = event.target as HTMLElement;
      if (target.closest('[data-unit-toggle],[data-day-toggle]')) return;
      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
}
