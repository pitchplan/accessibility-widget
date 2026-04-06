import { useLayoutEffect } from "react";
import { APP_ID, PORTAL_APP_ID } from "../../../../constants";

const styleID = "acc-hide-images-style";
const rootClass = "acc-hide-images";
const svgHiddenClass = "acc-svg-hidden";

const INTERACTIVE_ANCESTORS =
  "button, a, label, nav, summary, " +
  '[role="button"], [role="link"], [role="tab"], [role="menuitem"]';

const ICON_MAX_SIZE = 48;

function isInsideWidget(el: Element): boolean {
  return !!(el.closest(`#${PORTAL_APP_ID}`) || el.closest(`#${APP_ID}`));
}

function shouldHideSvg(svg: SVGElement): boolean {
  if (isInsideWidget(svg)) return false;
  if (svg.closest(INTERACTIVE_ANCESTORS)) return false;
  if (svg.getAttribute("role") === "img") return true;
  if (svg.getAttribute("aria-hidden") === "true") return false;
  const { width, height } = svg.getBoundingClientRect();
  if (width <= ICON_MAX_SIZE && height <= ICON_MAX_SIZE) return false;
  return true;
}

function markSvgs(): void {
  document.querySelectorAll("svg").forEach((svg) => {
    if (shouldHideSvg(svg)) {
      svg.classList.add(svgHiddenClass);
    }
  });
}

function unmarkSvgs(): void {
  document.querySelectorAll(`.${svgHiddenClass}`).forEach((el) => {
    el.classList.remove(svgHiddenClass);
  });
}

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
        html.${rootClass} video:not(#${PORTAL_APP_ID} video):not(#${APP_ID} video),
        html.${rootClass} picture:not(#${PORTAL_APP_ID} picture):not(#${APP_ID} picture),
        html.${rootClass} [role="img"]:not(#${PORTAL_APP_ID} [role="img"]):not(#${APP_ID} [role="img"]):not(svg),
        html.${rootClass} .${svgHiddenClass} {
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(style);

      markSvgs();

      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node instanceof SVGElement && node.tagName.toLowerCase() === "svg") {
              if (shouldHideSvg(node)) node.classList.add(svgHiddenClass);
            }
            node.querySelectorAll?.("svg").forEach((svg) => {
              if (shouldHideSvg(svg)) svg.classList.add(svgHiddenClass);
            });
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        unmarkSvgs();
        document.documentElement.classList.remove(rootClass);
        document.getElementById(styleID)?.remove();
      };
    }

    return () => {
      unmarkSvgs();
      document.documentElement.classList.remove(rootClass);
      document.getElementById(styleID)?.remove();
    };
  }, [isHideImages, isGettingReady]);
};
