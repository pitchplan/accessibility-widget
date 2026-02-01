import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AccessibilikState } from "../types";
import { getAccInitState } from "../utils";

const ACC_SESSION_STORAGE_KEY = "accessibilik";

/**
 * SSR-safe sessionStorage-backed state. Only accesses sessionStorage on the client
 * (in useLayoutEffect/useEffect), so it never runs during server render.
 */
export default function useAccSessionState(): [
  AccessibilikState,
  React.Dispatch<React.SetStateAction<AccessibilikState>>
] {
  const [accState, setAccState] = useState<AccessibilikState>(getAccInitState);
  const hasReadStorage = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(ACC_SESSION_STORAGE_KEY);
      console.log('raw',raw)
      if (raw) {
        const parsed = JSON.parse(raw) as AccessibilikState;
        console.log('parsed',parsed)
        setAccState(parsed);
      }
    } catch {
      // ignore invalid stored state
    }
    hasReadStorage.current = true;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasReadStorage.current) return;
    try {
      sessionStorage.setItem(ACC_SESSION_STORAGE_KEY, JSON.stringify(accState));
    } catch {
      // ignore quota / private mode
    }
  }, [accState]);

  return [accState, setAccState];
}
