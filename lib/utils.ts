import { AccessibilikState } from "./types";

export const isRuleAppliedToElement = (
    element: HTMLElement,
    rule: CSSStyleRule
  ): boolean => {
    const matchingElements = document.querySelectorAll(rule.selectorText);
    return Array.from(matchingElements).includes(element);
  };

 export const getComputedStyleAndSetAccDataFontSize = (elem: HTMLElement) => {
    const { fontSize } = window.getComputedStyle(elem);
    elem.dataset.accOrgfontsize = parseFloat(fontSize).toString();
    elem.style.fontSize = fontSize;
  };

  export const getDataImageSvgBase64 = (svg: string) =>
  `data:image/svg+xml;base64,${window.btoa(svg)}`;

  export const getAccInitState  = ():AccessibilikState => {
    const language =
      typeof window !== "undefined"
        ? localStorage.getItem("i18nextLng") ?? "en-US"
        : "en-US";
    return {
      language,
      isBlueLightFilter:false,
      brightness:{isBrightness:false,brightness:150},
      isDarkContrast:false,
      isLightContrast:false,
      highContrast:{isHighContrast:false,contrast:125},
      highSaturation:{isHighSaturation:false,saturation:200},
      lowSaturation:{isLowSaturation:false,saturation:50},
      isMonochrome:false,
      color:"",
      isVisualImpairment:false,
      adjustFontSizePercentage:100,
      textAlign:{left:null,center:null,right:null},
      isDyslexiaFont:false,
      isFontWeightBold:false,
      highlightLinks:false,
      highlightTitles:false,
      letterSpacing:0,
      lineHeight:{isLineHeight:false,lineHeight:0},
      wordSpacing:0,
      zoom:{isZoom:false,zoom:1},
      isBigCursor:false,
      showReadingGuide:false,
      readingGuideGap:100,
      activateTextToSpeech:false,
      speechRate:1,
      isStopAnimations:false,
      isReduceMotion:false,
      isHideImages:false,
      isMuteSounds:false,
      isFocusIndicator:false,
      isReadableFont:false,
      paragraphSpacing:0,
    }
  }

// Telemetry removed — no external requests are made (GDPR compliance).
