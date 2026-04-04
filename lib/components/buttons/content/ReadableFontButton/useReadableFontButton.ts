import { useLayoutEffect } from "react";

const styleID = "acc-readable-font-style";
const rootClass = "acc-readable-font";

export const useReadableFontButton = (
  isReadableFont: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isReadableFont) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} {
          font-family: Arial, Helvetica, sans-serif !important;
        }
        html.${rootClass} *, html.${rootClass} *::before, html.${rootClass} *::after {
          font-family: Arial, Helvetica, sans-serif !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isReadableFont, isGettingReady]);
};
