import { FC, useEffect, useState } from "react";
import { produce } from "immer";
import styles from "./accessibilik.module.scss";
import AccessibilityButton from "../buttons/AccessibilityButton/AccessibilityButton";
import AccessibilityMenu from "../AccessibilityMenu/AccessibilityMenu";
import useFontSizeTraverse from "../../hooks/useFontSizeTraverse";
import useFontSizeMutationObserver from "../../hooks/useFontSizeMutationObserver";
import "../../index.css";
import { APP_ID, PORTAL_APP_ID } from "../../constants";
import LanguageDetector from "i18next-browser-languagedetector";
import Portal from "../Portal/Portal";
import i18next from "i18next";
import { ChangeAccDraftHander } from "../../types";
import { getAccInitState } from "../../utils";
import { I18nextProvider, initReactI18next } from "react-i18next";
import {
  getLocalResources,
  languages,
  rtlLanguages,
} from "./../../i18/locale";
import usePersistenceLayout from "../../hooks/usePersistenceLayout/usePersistenceLayout";
import useAccSessionState from "../../hooks/useAccSessionState";

// Dedicated i18n instance — avoids conflicts with the host app's i18n.
const accI18n = i18next.createInstance();
accI18n.use(LanguageDetector).use(initReactI18next);

const READING_GUIDE_PORTAL_ID = "acc-portal-[readingGuide-container]";

const Accessibilik: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLanguages, setHasLanguages] = useState(false);
  const isTraversing = useFontSizeTraverse();
  const nodeListUpdated = useFontSizeMutationObserver();
  const [accState, setAccState] = useAccSessionState();
  const [showAcc, setShowAcc] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("left");
  const isGettingReady = isTraversing || isLoading;
  usePersistenceLayout({ accState, isGettingReady, nodeListUpdated });
  const direction = rtlLanguages.includes(accState.language) ? "rtl" : "ltr";

  const changeLanguageHandler = (langCode: string) => {
    accI18n.changeLanguage(langCode, () => {
      setAccState((p) => {
        return produce(p, (draft) => {
          draft.language = langCode;
        });
      });
    });
  };
  const changeAccessibilikStateHandler = (fn: ChangeAccDraftHander) => {
    setAccState((p) => {
      return produce(p, fn);
    });
  };

  const initAccessibilikStateHandler = () => {
    setAccState(getAccInitState());
  };
  const renderAccHandler = () => {
    setShowAcc((p) => !p);
  };

  useEffect(() => {
    // All 38 languages are bundled locally — no network requests needed.
    const resources = getLocalResources();
    accI18n.init({
      fallbackLng: "he-IL",
      resources,
    });
    accI18n.languages = languages;
    setHasLanguages(true);
    setIsLoading(false);
  }, []);

  if (isGettingReady)
    return <AccessibilityButton showSpinner={isGettingReady} />;

  return (
    <I18nextProvider i18n={accI18n}>
      <Portal wrapperElementId={READING_GUIDE_PORTAL_ID}>.</Portal>
      <Portal wrapperElementId={PORTAL_APP_ID}>
        <div
          id={APP_ID}
          style={{ direction, fontSize: 50 }}
          className={styles.Accessibilik}
          data-acc-language={accState.language}
        >
          <AccessibilityButton onShow={renderAccHandler} position={position} />

          <AccessibilityMenu
            display={showAcc ? "block" : "none"}
            showAcc={showAcc}
            accState={accState}
            onLangChange={changeLanguageHandler}
            onChangeAccState={changeAccessibilikStateHandler}
            onInit={initAccessibilikStateHandler}
            onShow={renderAccHandler}
            hasLanguages={hasLanguages}
            position={position}
            onPositionChange={setPosition}
          />
        </div>
      </Portal>
    </I18nextProvider>
  );
};

export default Accessibilik;
