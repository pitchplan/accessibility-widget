# Accessibilik: React Accessibility Widget (Enhanced Fork)

[![GitHub license](https://img.shields.io/github/license/RosenGray/accessibilik)](https://github.com/RosenGray/accessibilik/blob/master/LICENSE)

A React + TypeScript accessibility widget providing 30+ features and 38 languages out of the box.

> **Original project** by [Vladi Iokhim](https://github.com/RosenGray/accessibilik) (MIT License).
> **Enhanced fork** developed by **Daniel Dadashev** at [**PitchPlan**](https://www.pitch-plan.com) with the following improvements:
> - All 38 language translations bundled locally (zero external network requests)
> - Telemetry / domain registration removed for full GDPR compliance
> - Broader React compatibility (React 18 and 19)
> - Privacy-first: no data collection, no cookies, no tracking
> - Disability profiles (Seizure-Safe, ADHD, Blind, Motor, Cognitive)
> - Additional accessibility features (Stop Animations, Reduce Motion, Hide Images, Mute Sounds, Focus Indicator, Readable Font, Paragraph Spacing)

---

## Installation

```bash
npm install accessibility-react-widget
```

Then use it in your app:

```jsx
import Accessibilik from 'accessibility-react-widget';

export default function App() {
  return (
    <div className="App">
      <MyApp />
      <Accessibilik />
    </div>
  );
}
```

### Next.js (App Router)

```jsx
import Accessibilik from 'accessibility-react-widget/next';
```

---

## Features

### Content
- **Multilingual Support** — 38 languages including Hebrew, Arabic, Russian, English, and more
- **Adjust Font Size** — modify text size for optimal readability
- **Align Text** — left, right, center alignment options
- **Dyslexia Font** — switch to a dyslexia-friendly font
- **Font Weight** — customize text thickness
- **Highlight Links** — automatically highlight all hyperlinks
- **Highlight Titles** — distinct highlighting for headings
- **Letter Spacing** — adjust spacing between characters
- **Line Height** — alter space between lines of text
- **Word Spacing** — modify spacing between words
- **Zoom** — full-page zoom for enhanced visibility

### Colors
- **Blue Light Filter** — reduce blue light emission
- **Brightness Control** — adjust screen brightness
- **Dark Contrast** — high-contrast dark mode
- **High Contrast** — enhanced text and image visibility
- **High Saturation** — more vivid colors
- **Light Contrast** — softer viewing experience
- **Low Saturation** — reduced color intensity
- **Monochrome** — grayscale mode
- **Text Color Picker** — customize text color
- **Visual Impairment Mode** — dedicated mode with enhanced contrast and larger text

### Tools
- **Big Cursor** — increased cursor size
- **Reading Guide** — on-screen line-by-line guide
- **Text to Speech** — converts text to spoken words

---

## Supported Languages (38)

Hebrew, English, Russian, Chinese (Mandarin), Spanish, Arabic, Bengali, Hindi, Portuguese, Japanese, German, Chinese, Korean, French, Turkish, Vietnamese, Telugu, Marathi, Tamil, Italian, Urdu, Gujarati, Polish, Ukrainian, Persian, Malayalam, Kannada, Oriya, Romanian, Azerbaijani, Hausa, Burmese, Serbo-Croatian, Thai, Dutch, Yoruba, Sindhi, Latvian.

RTL languages (Arabic, Persian, Hebrew, Urdu) are automatically detected and the widget adjusts its layout direction accordingly.

---

## Privacy and GDPR Compliance

This enhanced fork is designed to be fully compliant with international privacy regulations:

- **No external network requests** — all translations are bundled locally
- **No telemetry** — no domain registration, no tracking, no analytics
- **No cookies** — user preferences are stored in sessionStorage only (cleared when the browser tab is closed)
- **No personal data collection** — the widget does not collect, store, or transmit any user data
- **No third-party services** — zero external dependencies at runtime
- **GDPR (EU)** — fully compliant; no data processing occurs
- **CCPA (California)** — fully compliant; no personal information is sold or shared
- **PIPA (Israel)** — fully compliant; no personal data is processed

---

## Accessibility Standards

This widget serves as a **supplementary accessibility toolbar** to enhance user experience. It addresses the following standards as a convenience layer:

| Standard | Region | Status |
|---|---|---|
| **WCAG 2.1 AA** | International | Toolbar features align with WCAG requirements |
| **IS 5568** | Israel | Supports Israeli accessibility requirements |
| **ADA** | United States | Provides accessibility adjustments for ADA compliance |
| **EN 301 549** | European Union | Aligned with EU accessibility standards |
| **Equality Act 2010** | United Kingdom | Supports UK accessibility requirements |
| **EAA** | European Union | Aligned with European Accessibility Act (effective June 2025) |

> **Important:** An accessibility widget alone does not constitute full compliance with any standard. Full compliance requires accessible code (semantic HTML, ARIA attributes, keyboard navigation, sufficient color contrast) combined with an accessibility statement and, where required by law, an accessibility coordinator.

---

## Technical Details

- **Framework:** React + TypeScript
- **Build:** Vite
- **CSS:** SCSS Modules (scoped, no global CSS pollution)
- **State:** Immer + React useState, persisted via sessionStorage
- **Rendering:** React Portal (renders outside host app DOM tree)
- **Bundle:** ES Module format
- **Peer dependencies:** React 18+ or React 19+

---

## Disclaimer

This software is provided **"as is"**, without warranty of any kind, express or implied. The authors and contributors make no guarantees that this widget satisfies the legal accessibility requirements of any jurisdiction, including but not limited to WCAG 2.1, ADA, IS 5568, EN 301 549, or the European Accessibility Act.

**By using this software, you acknowledge and agree that:**

- This widget is a supplementary tool and does **not** guarantee full compliance with any accessibility standard or regulation.
- The responsibility for ensuring legal compliance rests **solely with the end user** (the individual or organization deploying the widget on their website).
- The authors and contributors shall **not be held liable** for any legal claims, damages, fines, or penalties arising from the use or misuse of this software.
- Accessibility standards and regulations evolve over time. While we strive to improve and adapt this project to meet current requirements, no commitment is made to cover all present or future regulations.
- Users are strongly encouraged to conduct independent accessibility audits and seek professional legal advice to ensure full compliance with applicable laws.

This project is open source under the MIT License. See [LICENSE.md](LICENSE.md) for the full legal terms.

---

## License

MIT License. Copyright (c) 2024 Vladi Iokhim. Copyright (c) 2025 Daniel Dadashev / PitchPlan.

See [LICENSE.md](LICENSE.md) for the full license text.

---

## Attribution

- **Original author:** Vladi Iokhim ([RosenGray](https://github.com/RosenGray))
- **Enhanced fork by:** Daniel Dadashev at [PitchPlan](https://www.pitch-plan.com)
- **PitchPlan** — A platform for startups and entrepreneurs to create, manage, and share business plans and pitch decks
- **Enhancements include:** local language bundling, telemetry removal, GDPR compliance, React 18 compatibility, privacy-first architecture, disability profiles, 7 new accessibility features

### Attribution Requirements

This project is distributed under the MIT License. As required by the license, any copy, fork, or derivative work **must** retain the full copyright notices in [LICENSE.md](LICENSE.md), including attribution to both the original author and the enhanced fork contributors.

If you fork or redistribute this project, please keep the following attribution visible in your project README or documentation:

> Based on [Accessibilik](https://github.com/RosenGray/accessibilik) by Vladi Iokhim.
> Enhanced by Daniel Dadashev at [PitchPlan](https://www.pitch-plan.com).

You are **not** required to display attribution to end-users in the widget UI itself. Attribution in your project source code and documentation is sufficient.
