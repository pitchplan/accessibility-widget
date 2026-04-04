import { useEffect, useRef, useCallback } from "react";

const READING_GUIDE_PORTAL_ID = "acc-portal-[readingGuide-container]";

export const useReadingGuide = (
  showReadingGuide: boolean,
  gap: number,
  isGettingReady?: boolean
) => {
  const topEl = useRef<HTMLDivElement | null>(null);
  const bottomEl = useRef<HTMLDivElement | null>(null);
  const lastY = useRef(0);
  const frozenHeight = useRef(0);

  const applyPosition = useCallback((y: number) => {
    lastY.current = y;
    if (!frozenHeight.current) frozenHeight.current = window.innerHeight;
    const h = frozenHeight.current;
    const halfGap = gap / 2;
    if (topEl.current) topEl.current.style.height = `${Math.max(0, y - halfGap)}px`;
    if (bottomEl.current) bottomEl.current.style.height = `${Math.max(0, h - y - halfGap)}px`;
  }, [gap]);

  // Re-apply when gap changes via +/- buttons
  useEffect(() => {
    if (showReadingGuide && lastY.current > 0) {
      applyPosition(lastY.current);
    }
  }, [gap, showReadingGuide, applyPosition]);

  useEffect(() => {
    if (isGettingReady) return;

    if (showReadingGuide) {
      const container = document.getElementById(READING_GUIDE_PORTAL_ID)!;
      container.style.display = "block";
      frozenHeight.current = window.innerHeight;

      if (!topEl.current) {
        const el = document.createElement("div");
        el.id = "acc-readingGuide-top";
        el.className = "acc-readingGuide";
        container.appendChild(el);
        topEl.current = el;
      }
      if (!bottomEl.current) {
        const el = document.createElement("div");
        el.id = "acc-readingGuide-bottom";
        el.className = "acc-readingGuide";
        el.style.top = "auto";
        el.style.bottom = "0";
        container.appendChild(el);
        bottomEl.current = el;
      }

      // ── Desktop: follow mouse ──────────────────────────────────────────
      const onMouse = (e: MouseEvent) => applyPosition(e.clientY);

      // ── Mobile: follow touch position ──────────────────────────────────
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        applyPosition(e.touches[0].clientY);
      };

      window.addEventListener("mousemove", onMouse);
      window.addEventListener("touchstart", onTouchStart, { passive: true });

      return () => {
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("touchstart", onTouchStart);
      };
    } else {
      const container = document.getElementById(READING_GUIDE_PORTAL_ID);
      if (container) container.style.display = "none";
      if (topEl.current) { topEl.current.remove(); topEl.current = null; }
      if (bottomEl.current) { bottomEl.current.remove(); bottomEl.current = null; }
      lastY.current = 0;
      frozenHeight.current = 0;
    }
  }, [showReadingGuide, isGettingReady, gap, applyPosition]);
};
