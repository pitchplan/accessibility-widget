import { FC } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../types";
import AccButton from "../buttons/AccButton/AccButton";
import styles from "./AccProfiles.module.scss";

// ── Icons ────────────────────────────────────────────────────────────────────
import SeizureSafeIcon from "../../assets/icons/seizureSafe.svg?react";
import AdhdFriendlyIcon from "../../assets/icons/adhdFriendly.svg?react";
import BlindFriendlyIcon from "../../assets/icons/blindFriendly.svg?react";
import MotorFriendlyIcon from "../../assets/icons/motorFriendly.svg?react";
import CognitiveIcon from "../../assets/icons/cognitiveProfile.svg?react";
import TextToSpeech from "../buttons/tools/TextToSpeech/TextToSpeech";
import ReadingGuide from "../buttons/tools/ReadingGuide/ReadingGuide";
import MuteSoundsButton from "../buttons/tools/MuteSoundsButton/MuteSoundsButton";

// ── Types ────────────────────────────────────────────────────────────────────
interface AccProfilesProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

// ── Profile definitions ──────────────────────────────────────────────────────
// Each profile applies a preset combination of accessibility features.
// Clicking again resets only the features that profile controls.

const applySeizureSafe = (draft: AccessibilikState, activate: boolean) => {
  draft.isStopAnimations = activate;
  draft.isReduceMotion = activate;
  draft.lowSaturation = activate
    ? { isLowSaturation: true, saturation: 50 }
    : { isLowSaturation: false, saturation: 50 };
};

const applyAdhdFriendly = (draft: AccessibilikState, activate: boolean) => {
  draft.isReadableFont = activate;
  draft.isReduceMotion = activate;
  draft.isStopAnimations = activate;
  draft.highlightTitles = activate;
};

const applyBlindFriendly = (draft: AccessibilikState, activate: boolean) => {
  draft.adjustFontSizePercentage = activate ? 150 : 100;
  draft.highContrast = activate
    ? { isHighContrast: true, contrast: 125 }
    : { isHighContrast: false, contrast: 125 };
  draft.isFontWeightBold = activate;
  draft.isFocusIndicator = activate;
  draft.highlightLinks = activate;
  draft.highlightTitles = activate;
};

const applyMotorFriendly = (draft: AccessibilikState, activate: boolean) => {
  draft.isBigCursor = activate;
  draft.isFocusIndicator = activate;
  draft.letterSpacing = activate ? 1 : 0;
  draft.lineHeight = activate
    ? { isLineHeight: true, lineHeight: 2 }
    : { isLineHeight: false, lineHeight: 0 };
  draft.zoom = { isZoom: false, zoom: 1 };
};

const applyCognitive = (draft: AccessibilikState, activate: boolean) => {
  draft.isReadableFont = activate;
  draft.highlightLinks = activate;
  draft.highlightTitles = activate;
  draft.lineHeight = activate
    ? { isLineHeight: true, lineHeight: 2 }
    : { isLineHeight: false, lineHeight: 0 };
  draft.wordSpacing = activate ? 2 : 0;
  draft.letterSpacing = activate ? 1 : 0;
};

// ── Detect if a profile is currently active ──────────────────────────────────
const isSeizureSafeActive = (s: AccessibilikState) =>
  s.isStopAnimations && s.isReduceMotion && s.lowSaturation.isLowSaturation;

const isAdhdFriendlyActive = (s: AccessibilikState) =>
  s.isReadableFont && s.isReduceMotion && s.isStopAnimations && s.highlightTitles;

const isBlindFriendlyActive = (s: AccessibilikState) =>
  s.adjustFontSizePercentage >= 150 &&
  s.highContrast.isHighContrast &&
  s.isFontWeightBold &&
  s.isFocusIndicator;

const isMotorFriendlyActive = (s: AccessibilikState) =>
  s.isBigCursor && s.isFocusIndicator && s.lineHeight.isLineHeight;

const isCognitiveActive = (s: AccessibilikState) =>
  s.isReadableFont &&
  s.highlightLinks &&
  s.highlightTitles &&
  s.lineHeight.isLineHeight &&
  !!s.wordSpacing;

// ── Component ────────────────────────────────────────────────────────────────
const AccProfiles: FC<AccProfilesProps> = ({ accState, onChangeAccState }) => {
  const makeToggle = (
    isActive: boolean,
    applyFn: (draft: AccessibilikState, activate: boolean) => void
  ) => {
    return () => {
      onChangeAccState((draft) => {
        applyFn(draft, !isActive);
      });
    };
  };

  const seizureActive = isSeizureSafeActive(accState);
  const adhdActive = isAdhdFriendlyActive(accState);
  const blindActive = isBlindFriendlyActive(accState);
  const motorActive = isMotorFriendlyActive(accState);
  const cognitiveActive = isCognitiveActive(accState);

  return (
    <div className={styles.accProfiles}>
      <AccButton
        Icon={SeizureSafeIcon}
        isToggled={seizureActive}
        onToggle={makeToggle(seizureActive, applySeizureSafe)}
        titleTranslationKey="profiles.seizureSafe"
        title="Seizure Safe"
      />
      <AccButton
        Icon={AdhdFriendlyIcon}
        isToggled={adhdActive}
        onToggle={makeToggle(adhdActive, applyAdhdFriendly)}
        titleTranslationKey="profiles.adhdFriendly"
        title="ADHD Friendly"
      />
      <AccButton
        Icon={BlindFriendlyIcon}
        isToggled={blindActive}
        onToggle={makeToggle(blindActive, applyBlindFriendly)}
        titleTranslationKey="profiles.blindFriendly"
        title="Blind Friendly"
      />
      <AccButton
        Icon={MotorFriendlyIcon}
        isToggled={motorActive}
        onToggle={makeToggle(motorActive, applyMotorFriendly)}
        titleTranslationKey="profiles.motorFriendly"
        title="Motor Friendly"
      />
      <AccButton
        Icon={CognitiveIcon}
        isToggled={cognitiveActive}
        onToggle={makeToggle(cognitiveActive, applyCognitive)}
        titleTranslationKey="profiles.cognitive"
        title="Cognitive"
      />
      <TextToSpeech accState={accState} onChangeAccState={onChangeAccState} />
      <ReadingGuide accState={accState} onChangeAccState={onChangeAccState} />
      <MuteSoundsButton accState={accState} onChangeAccState={onChangeAccState} />
    </div>
  );
};

export default AccProfiles;
