import { useLayoutEffect } from "react";

const styleID = "acc-reduce-motion-style";
const rootClass = "acc-reduce-motion";

export const useReduceMotionButton = (
  isReduceMotion: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isReduceMotion) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        @media (prefers-reduced-motion: no-preference) {
          html.${rootClass} *,
          html.${rootClass} *::before,
          html.${rootClass} *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isReduceMotion, isGettingReady]);
};
