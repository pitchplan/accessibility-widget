import { useLayoutEffect } from "react";
import { APP_ID, PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-paragraph-spacing-style";
const rootClass = "acc-paragraph-spacing";

export const useParagraphSpacingButton = (
  paragraphSpacing: number,
  isGettingReady?: boolean
) => {
  const isParagraphSpacing = !!paragraphSpacing;
  useLayoutEffect(() => {
    if (isGettingReady) return;
    const style = document.getElementById(styleID);
    if (isParagraphSpacing && !style) {
      document.documentElement.classList.add(rootClass);
      const newStyle = document.createElement("style");
      newStyle.id = styleID;
      newStyle.innerHTML = `
        html.${rootClass} p:not(#${PORTAL_APP_ID} p):not(#${APP_ID} p) {
          margin-bottom: ${paragraphSpacing * 0.5}em !important;
        }
      `;
      document.head.appendChild(newStyle);
    } else if (isParagraphSpacing && style) {
      style.innerHTML = `
        html.${rootClass} p:not(#${PORTAL_APP_ID} p):not(#${APP_ID} p) {
          margin-bottom: ${paragraphSpacing * 0.5}em !important;
        }
      `;
    } else if (!isParagraphSpacing && style) {
      document.documentElement.classList.remove(rootClass);
      style.remove();
    }
  }, [paragraphSpacing, isParagraphSpacing, isGettingReady]);
};
