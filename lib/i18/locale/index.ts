/**
 * Locale index — all 38 languages are bundled locally.
 * No external network requests are made (GDPR-compliant).
 */

// ── Local imports ───────────────────────────────────────────────────────────
import hebrew from './hebrew.json';
import english from './english.json';
import russian from './russian.json';
import chineseMandarin from './chineseMandarin.json';
import spanish from './spanish.json';
import arabic from './arabic.json';
import bengali from './bengali.json';
import hindi from './hindi.json';
import portuguese from './portuguese.json';
import japanese from './japanese.json';
import german from './german.json';
import chinese from './chinese.json';
import korean from './korean.json';
import french from './french.json';
import turkish from './turkish.json';
import vietnamese from './vietnamese.json';
import telugu from './telugu.json';
import marathi from './marathi.json';
import tamil from './tamil.json';
import italian from './italian.json';
import urdu from './urdu.json';
import gujarati from './gujarati.json';
import polish from './polish.json';
import ukrainian from './ukrainian.json';
import persian from './persian.json';
import malayalam from './malayalam.json';
import kannada from './kannada.json';
import oriya from './oriya.json';
import romanian from './romanian.json';
import azerbaijani from './azerbaijani.json';
import hausa from './hausa.json';
import burmese from './burmese.json';
import serboCroatian from './serboCroatian.json';
import thai from './thai.json';
import dutch from './dutch.json';
import yoruba from './yoruba.json';
import sindhi from './sindhi.json';
import latviski from './latviski.json';

// ── Types ───────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslationData = Record<string, any>;
export type Translation = {
  translation: TranslationData;
};
export type Resources = Record<string, Translation>;

// ── Language definitions ────────────────────────────────────────────────────
export const languageArray = [
  { lang: 'he', name: 'hebrew' },
  { lang: 'en', name: 'english' },
  { lang: 'ru', name: 'russian' },
  { lang: 'zhcn', name: 'chineseMandarin' },
  { lang: 'es', name: 'spanish' },
  { lang: 'ar', name: 'arabic' },
  { lang: 'bn', name: 'bengali' },
  { lang: 'hi', name: 'hindi' },
  { lang: 'ptpt', name: 'portuguese' },
  { lang: 'ja', name: 'japanese' },
  { lang: 'de', name: 'german' },
  { lang: 'wuu', name: 'chinese' },
  { lang: 'ko', name: 'korean' },
  { lang: 'fr', name: 'french' },
  { lang: 'tr', name: 'turkish' },
  { lang: 'vi', name: 'vietnamese' },
  { lang: 'te', name: 'telugu' },
  { lang: 'mr', name: 'marathi' },
  { lang: 'ta', name: 'tamil' },
  { lang: 'it', name: 'italian' },
  { lang: 'ur', name: 'urdu' },
  { lang: 'gu', name: 'gujarati' },
  { lang: 'pl', name: 'polish' },
  { lang: 'uk', name: 'ukrainian' },
  { lang: 'fa', name: 'persian' },
  { lang: 'ml', name: 'malayalam' },
  { lang: 'kn', name: 'kannada' },
  { lang: 'or', name: 'oriya' },
  { lang: 'ro', name: 'romanian' },
  { lang: 'az', name: 'azerbaijani' },
  { lang: 'ha', name: 'hausa' },
  { lang: 'my', name: 'burmese' },
  { lang: 'sh', name: 'serboCroatian' },
  { lang: 'th', name: 'thai' },
  { lang: 'nl', name: 'dutch' },
  { lang: 'yo', name: 'yoruba' },
  { lang: 'sd', name: 'sindhi' },
  { lang: 'lv', name: 'latviski' },
];

// ── Map for direct access ───────────────────────────────────────────────────
const translationMap: Record<string, TranslationData> = {
  hebrew, english, russian, chineseMandarin, spanish, arabic, bengali, hindi,
  portuguese, japanese, german, chinese, korean, french, turkish, vietnamese,
  telugu, marathi, tamil, italian, urdu, gujarati, polish, ukrainian, persian,
  malayalam, kannada, oriya, romanian, azerbaijani, hausa, burmese,
  serboCroatian, thai, dutch, yoruba, sindhi, latviski,
};

// ── Build resources synchronously (no fetch) ────────────────────────────────
export function getLocalResources(): Resources {
  const resources: Resources = {};
  for (const item of languageArray) {
    resources[item.lang] = { translation: translationMap[item.name] };
  }
  return resources;
}

// ── Kept for backward compatibility but now returns resolved promises ───────
export const getLanguagePromises = () => {
  return languageArray.map(item => Promise.resolve(translationMap[item.name]));
};

export const languages = [
  "en-US", "he-IL", "ru", "zhcn", "es", "ar", "bn", "hi", "ptpt", "ja",
  "de", "wuu", "ko", "fr", "tr", "vi", "te", "yue", "mr", "ta", "it",
  "ur", "gu", "pl", "uk", "fa", "ml", "kn", "or", "ro", "az", "ha",
  "my", "sh", "th", "nl", "yo", "sd", "lv",
];

export const rtlLanguages = ["ar", "fa", "he", "he-IL", "ur"];
