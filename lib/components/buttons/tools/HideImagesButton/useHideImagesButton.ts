import { useLayoutEffect } from "react";
import { APP_ID, PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-hide-images-style";
const rootClass = "acc-hide-images";

export const useHideImagesButton = (
  isHideImages: boolean,
  isGettingReady: boolean
) => {
  useLayoutEffect(() => {
    if (isGettingReady) return;

    if (isHideImages) {
      document.documentElement.classList.add(rootClass);
      const style = document.createElement("style");
      style.id = styleID;
      style.innerHTML = `
        html.${rootClass} img:not(#${PORTAL_APP_ID} img):not(#${APP_ID} img),
        html.${rootClass} svg:not(#${PORTAL_APP_ID} svg):not(#${APP_ID} svg),
        html.${rootClass} video:not(#${PORTAL_APP_ID} video):not(#${APP_ID} video),
        html.${rootClass} picture:not(#${PORTAL_APP_ID} picture):not(#${APP_ID} picture),
        html.${rootClass} [role="img"]:not(#${PORTAL_APP_ID} [role="img"]):not(#${APP_ID} [role="img"]) {
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const style = document.getElementById(styleID);
      document.documentElement.classList.remove(rootClass);
      style?.remove();
    };
  }, [isHideImages, isGettingReady]);
};
