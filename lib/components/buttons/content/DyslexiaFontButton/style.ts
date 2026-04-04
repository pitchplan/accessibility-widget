// All fonts are bundled locally — no external requests (GDPR-compliant).
// Comic Neue is replaced with the system fallback to avoid Google Fonts dependency.
const DYSLEXIA_FONT_STYLE = `
@font-face {
    font-family: 'OpenDyslexic';
    src: url('./assets/fonts/OpenDyslexic-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('./assets/fonts/OpenDyslexic3-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('./assets/fonts/OpenDyslexic3-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('./assets/fonts/OpenDyslexic-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('./assets/fonts/OpenDyslexic-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('./assets/fonts/OpenDyslexic-Bold.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
}


html{
    font-family: OpenDyslexic,Arial,Helvetica,sans-serif !important

}

html *, *{
    font-family: OpenDyslexic,Arial,Helvetica,sans-serif !important
}

html.acc-font-weight{
    font-family: OpenDyslexic,Arial,Helvetica,sans-serif !important
}


`;

export default DYSLEXIA_FONT_STYLE;
