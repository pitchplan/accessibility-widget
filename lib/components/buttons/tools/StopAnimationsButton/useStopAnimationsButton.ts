import { useLayoutEffect } from "react";

const styleID = "acc-stop-animations-style";
const rootClass = "acc-stop-animations";

export const useStopAnimationsButton = (
  isStopAnimations: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isStopAnimations) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} *,
        html.${rootClass} *::before,
        html.${rootClass} *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }
        html.${rootClass} video,
        html.${rootClass} [autoplay] {
          animation-play-state: paused !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isStopAnimations, isGettingReady]);
};
