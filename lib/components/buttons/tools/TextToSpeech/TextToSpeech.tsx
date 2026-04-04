import { FC, useEffect, useRef, useState } from "react";
import { AccessibilikState, ChangeAccDraftHander } from "../../../../types";
import AccButton from "../../AccButton/AccButton";
import TextToSpeachIcon from "./../../../../assets/icons/textToSpeach.svg?react";
import styled from "./TextToSpeech.module.scss";
import { franc } from "franc-min";

const NOT_SUPPORT_MSG = "Sorry, your browser does not support text-to-speech!";

// ── franc ISO 639-3 → BCP 47 mapping ────────────────────────────────────
const francToTag: Record<string, string> = {
  eng: "en", heb: "he", ara: "ar", rus: "ru", spa: "es", fra: "fr",
  deu: "de", ita: "it", por: "pt", jpn: "ja", kor: "ko", zho: "zh",
  hin: "hi", ben: "bn", tur: "tr", pol: "pl", ukr: "uk", nld: "nl",
  ron: "ro", vie: "vi", tha: "th", ell: "el", ces: "cs", swe: "sv",
  dan: "da", fin: "fi", nor: "no", hun: "hu", ind: "id", msa: "ms",
  tam: "ta", tel: "te", mar: "mr", guj: "gu", kan: "kn", mal: "ml",
  urd: "ur", fas: "fa", aze: "az", kat: "ka", bul: "bg", hrv: "hr",
  srp: "sr", slk: "sk", slv: "sl", lit: "lt", lav: "lv", est: "et",
  cmn: "zh", yue: "zh",
};

// ── Detect script from first meaningful character ────────────────────────
const detectScript = (text: string): string => {
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    if (code >= 0x0590 && code <= 0x05ff) return "he";
    if (code >= 0x0600 && code <= 0x06ff) return "ar";
    if (code >= 0x0400 && code <= 0x04ff) return "ru";
    if (code >= 0x4e00 && code <= 0x9fff) return "zh";
    if (code >= 0x3040 && code <= 0x309f) return "ja";
    if (code >= 0x30a0 && code <= 0x30ff) return "ja";
    if (code >= 0xac00 && code <= 0xd7af) return "ko";
    if (code >= 0x0900 && code <= 0x097f) return "hi";
    if (code >= 0x0e00 && code <= 0x0e7f) return "th";
    if (code >= 0x0041 && code <= 0x024f) return "latin";
  }
  return "latin";
};

// ── Latin-script languages (for checking if widget lang uses Latin) ───────
const latinLangs = new Set([
  "en", "es", "fr", "de", "it", "pt", "nl", "pl", "ro", "tr",
  "vi", "az", "hr", "cs", "da", "fi", "hu", "id", "lt", "lv",
  "ms", "no", "sk", "sl", "sv", "yo", "ha", "sw",
]);

// ── Find best voice for text ─────────────────────────────────────────────
const findVoiceForText = (
  text: string,
  allVoices: SpeechSynthesisVoice[],
  widgetLang: string,
): SpeechSynthesisVoice | null => {
  if (!text.trim() || allVoices.length === 0) return allVoices[0] ?? null;

  // Step 1: detect script — 100% certain for non-Latin scripts
  const script = detectScript(text);
  if (script !== "latin") {
    const match = allVoices.find((v) => v.lang.startsWith(script));
    if (match) return match;
  }

  // Step 2: Latin script — use franc (only trust high confidence on longer text)
  if (text.trim().length >= 20) {
    const detected = franc(text);
    if (detected !== "und") {
      const tag = francToTag[detected];
      if (tag) {
        const match = allVoices.find((v) => v.lang.startsWith(tag));
        if (match) return match;
      }
    }
  }

  // Step 3: ambiguous Latin text — prefer widget language if it's Latin-based
  const widgetBase = widgetLang.split("-")[0].split("_")[0];
  if (latinLangs.has(widgetBase)) {
    const match = allVoices.find((v) => v.lang.startsWith(widgetBase));
    if (match) return match;
  }

  // Step 4: widget language is non-Latin (e.g. Hebrew) → default to English
  const enVoice = allVoices.find((v) => v.lang.startsWith("en"));
  if (enVoice) return enVoice;

  // Step 5: absolute fallback
  return allVoices[0] ?? null;
};

// ── Split mixed-language text into blocks by Unicode script ──────────────
const splitByScript = (text: string): string[] => {
  const blocks: string[] = [];
  let current = "";
  let currentScript = "";

  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    let script = "latin";
    if (code >= 0x0590 && code <= 0x05ff) script = "hebrew";
    else if (code >= 0x0600 && code <= 0x06ff) script = "arabic";
    else if (code >= 0x0400 && code <= 0x04ff) script = "cyrillic";
    else if (code >= 0x4e00 && code <= 0x9fff) script = "cjk";
    else if (code >= 0x3040 && code <= 0x30ff) script = "japanese";
    else if (code >= 0xac00 && code <= 0xd7af) script = "korean";
    else if (code >= 0x0900 && code <= 0x097f) script = "devanagari";
    else if (code >= 0x0e00 && code <= 0x0e7f) script = "thai";
    else if (/\s/.test(char) || /\d/.test(char) || /[^\p{L}]/u.test(char)) {
      current += char;
      continue;
    }

    if (script !== currentScript && current.trim()) {
      blocks.push(current);
      current = "";
    }
    currentScript = script;
    current += char;
  }
  if (current.trim()) blocks.push(current);
  return blocks.length > 0 ? blocks : [text];
};

// ── Types ────────────────────────────────────────────────────────────────
interface TextToSpeechProps {
  accState: AccessibilikState;
  onChangeAccState: (fn: ChangeAccDraftHander) => void;
}

const loadVoices = (): SpeechSynthesisVoice[] => {
  const raw = window.speechSynthesis.getVoices();
  const map: Record<string, SpeechSynthesisVoice> = {};
  for (const v of raw) { map[v.lang] = v; }
  return Object.values(map);
};

// ── Component ────────────────────────────────────────────────────────────
const TextToSpeech: FC<TextToSpeechProps> = ({
  accState,
  onChangeAccState,
}) => {
  const { activateTextToSpeech, speechRate, language: widgetLang } = accState;
  const [ready, setReady] = useState(false);
  const allVoices = useRef<SpeechSynthesisVoice[]>([]);

  // ── Load voices ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!activateTextToSpeech) return;
    if (!window.speechSynthesis) {
      alert(NOT_SUPPORT_MSG);
      return;
    }

    const applyVoices = () => {
      const loaded = loadVoices();
      if (loaded.length === 0) return;
      allVoices.current = loaded;
      setReady(true);
    };

    applyVoices();
    const handler = () => applyVoices();
    window.speechSynthesis.addEventListener("voiceschanged", handler);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", handler);
    };
  }, [activateTextToSpeech]);

  // ── Speak on text selection (auto language detection) ──────────────────
  useEffect(() => {
    if (!activateTextToSpeech || !ready) return;

    const speakSelection = () => {
      const selection = window.getSelection();
      if (!selection) return;
      const text = selection.toString();
      if (!text.trim()) return;

      window.speechSynthesis.cancel();
      const voices = allVoices.current;
      const blocks = splitByScript(text);

      for (const block of blocks) {
        const voice = findVoiceForText(block, voices, widgetLang);
        const utterance = new SpeechSynthesisUtterance(block);
        utterance.rate = speechRate;
        if (voice) utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      }
    };

    // Both mouseup and touchend — no setTimeout (preserves user gesture for iOS)
    document.addEventListener("mouseup", speakSelection);
    document.addEventListener("touchend", speakSelection);
    return () => {
      document.removeEventListener("mouseup", speakSelection);
      document.removeEventListener("touchend", speakSelection);
    };
  }, [activateTextToSpeech, ready, speechRate, widgetLang]);

  const toggleHandler = () => {
    onChangeAccState((draft) => {
      draft.activateTextToSpeech = !draft.activateTextToSpeech;
    });
  };

  const changeRate = (delta: number) => {
    onChangeAccState((draft) => {
      const next = Math.round((draft.speechRate + delta) * 100) / 100;
      if (next >= 0.5 && next <= 2) draft.speechRate = next;
    });
  };

  const renderRateControl = () => {
    if (!activateTextToSpeech) return null;
    const stop = (e: React.MouseEvent | React.TouchEvent) => e.stopPropagation();
    return (
      <div className={styled.accSpeechRate} onClick={stop} onTouchEnd={stop}>
        <button
          className={styled.accSpeechRate__btn}
          onClick={(e) => { e.stopPropagation(); changeRate(-0.25); (e.currentTarget as HTMLElement).blur(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>
        </button>
        <span className={styled.accSpeechRate__label}>{speechRate}x</span>
        <button
          className={styled.accSpeechRate__btn}
          onClick={(e) => { e.stopPropagation(); changeRate(0.25); (e.currentTarget as HTMLElement).blur(); }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        </button>
      </div>
    );
  };

  return (
    <AccButton
      Icon={TextToSpeachIcon}
      isToggled={activateTextToSpeech}
      onToggle={toggleHandler}
      titleTranslationKey="tools.textToSpeach"
      title="Text To Speach"
      tooltipTranslationKey="tools.textToSpeachTooltip"
    >
      {renderRateControl()}
    </AccButton>
  );
};

export default TextToSpeech;
