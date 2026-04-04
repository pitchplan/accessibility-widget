import { useLayoutEffect } from "react";

const styleID = "acc-focus-indicator-style";
const rootClass = "acc-focus-indicator";

export const useFocusIndicatorButton = (
  isFocusIndicator: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isFocusIndicator) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} *:focus {
          outline: 3px solid #1a73e8 !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.3) !important;
        }
        html.${rootClass} *:focus:not(:focus-visible) {
          outline: 3px solid #1a73e8 !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.3) !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isFocusIndicator, isGettingReady]);
};
