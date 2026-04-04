import {Draft} from 'immer';
export type ChangeAccDraftHander = (d: Draft<AccessibilikState>) =>void;

export interface TextAlign {
  left:string | null;
  center:string | null;
  right:string | null;
}

export interface AccessibilikState {
  // ── Language ────────────────────────────────────────────────────────────
  language: string;

  // ── Content ─────────────────────────────────────────────────────────────
  adjustFontSizePercentage: number;
  textAlign: TextAlign;
  isDyslexiaFont: boolean;
  isReadableFont: boolean;
  isFontWeightBold: boolean;
  highlightLinks: boolean;
  highlightTitles: boolean;
  letterSpacing: number;
  lineHeight: { isLineHeight: boolean; lineHeight: number };
  wordSpacing: number;
  paragraphSpacing: number;
  zoom: { isZoom: boolean; zoom: number };

  // ── Colors ──────────────────────────────────────────────────────────────
  isBlueLightFilter: boolean;
  brightness: { isBrightness: boolean; brightness: number };
  isDarkContrast: boolean;
  isLightContrast: boolean;
  highContrast: { isHighContrast: boolean; contrast: number };
  highSaturation: { isHighSaturation: boolean; saturation: number };
  lowSaturation: { isLowSaturation: boolean; saturation: number };
  isMonochrome: boolean;
  color: string;
  isVisualImpairment: boolean;

  // ── Tools ───────────────────────────────────────────────────────────────
  isBigCursor: boolean;
  showReadingGuide: boolean;
  readingGuideGap: number;
  activateTextToSpeech: boolean;
  speechRate: number;
  isStopAnimations: boolean;
  isReduceMotion: boolean;
  isHideImages: boolean;
  isMuteSounds: boolean;
  isFocusIndicator: boolean;
}

export type IconSvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
  title?: string | undefined;
}>
