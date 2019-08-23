import css from 'styled-jsx/css'

// Every page should include these variables,
// and they should never be overriden.

export const BASE_THEME = css.global`
  :root {
    /* Spacing variables */
    --geist-gap: 16pt;
    --geist-gap-negative: -16pt;
    --geist-gap-half: 8pt;
    --geist-gap-half-negative: -8pt;
    --geist-gap-quarter: 4pt;
    --geist-gap-quarter-negative: -4pt;
    --geist-gap-double: 32pt;
    --geist-gap-double-negative: -32pt;
    --geist-page-margin: 16pt;
    --geist-page-width: 750pt;
    --geist-page-width-with-margin: 782pt;
    /* Breakpoints */
    --geist-breakpoint-mobile: 600px;
    --geist-breakpoint-tablet: 960px;
    /* Appearance */
    --geist-radius: 5px;
    /* Colors */
    --geist-cyan: #79FFE1;
    --geist-purple: #F81CE5;
    --geist-violet: #7928CA;
    --geist-alert: #FF0080;
    --geist-marketing-gray: #FAFBFC;
    /* Fonts */
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    --font-mono: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    --font-size-primary: 1rem;
    --font-size-small: 0.875rem;
    --line-height-primary: 1.5em;
    --line-height-small: 1.571em;
  }
  /* Helper classes */
  a.geist-reset {
    text-decoration: none;
    color: inherit;
  }
  hr.geist-hr-reset {
    margin: 0;
    border: none;
    border-bottom: 1px solid var(--accents-2);
    margin-top: -1px;
  }
  .geist-flex {
    display: flex;
  }
  .geist-ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    max-width: 100%;
    line-height: normal;
  }
  .geist-text-no-margin > *:first-child {
    margin-top: 0;
  }
  .geist-text-no-margin > *:last-child {
    margin-bottom: 0;
  }
  .geist-overflow-scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .geist-overflow-scroll-x {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .geist-overflow-scroll-y {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .geist-inline-center {
    display: inline-flex;
    align-items: center;
  }
  .geist-hover-dim {
    transition: opacity .15s ease;
  }
  .geist-hover-dim:hover {
    opacity: .7;
  }
  /* Media Queries */
  @media screen and (min-width: 601px) {
    .geist-show-on-mobile {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .geist-hide-on-mobile {
      display: none;
    }
    .geist-overflow-reset-mobile {
      overflow: initial;
      -webkit-overflow-scrolling: initial;
    }
  }
  @media screen and (min-width: 961px) {
    .geist-show-on-tablet {
      display: none;
    }
  }
  @media screen and (max-width: 960px) {
    .geist-hide-on-tablet {
      display: none;
    }
  }
  /* Light Mode */
  :root, .dark-theme .invert-theme {
    --geist-foreground: #000;
    --geist-background: #fff;
    --geist-selection: var(--geist-cyan);
    --accents-1: #fafafa;
    --accents-2: #eaeaea;
    --accents-3: #999999;
    --accents-4: #888888;
    --accents-5: #666666;
    --accents-6: #444444;
    --accents-7: #333333;
    --accents-8: #111111;
    --geist-link-color: var(--geist-success);
    /* Success (Blue) */
    --geist-success-light: #3291FF;
    --geist-success: #0070F3;
    --geist-success-dark: #0366D6;
    /* Error (Red) */
    --geist-error-light: #FF1A1A;
    --geist-error: #EE0000;
    --geist-error-dark: #CC0000;
    /* Warning (Orange) */
    --geist-warning-light: #F7B955;
    --geist-warning: #F5A623;
    --geist-warning-dark: #F49B0B;
    /* Secondary (Gray) */
    --geist-secondary-light: var(--accents-3);
    --geist-secondary: var(--accents-5);
    --geist-secondary-dark: var(--accents-7);
    --geist-code: var(--geist-purple);
    --dropdown-box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
    --dropdown-triangle-stroke: #fff;
    --scroller-start: var(--geist-background);
    --scroller-end: rgba(255, 255, 255, 0);
    --shadow-small: 0 5px 10px rgba(0, 0, 0, 0.12);
    --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
    --shadow-large: 0 30px 60px rgba(0, 0, 0, 0.12);
    --portal-opacity: 0.25;
  }
  .geist-card-shadow {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
  /* debugging */
  .debug .geist-container {
    outline: 1px solid rgba(255, 0, 0, .3);
  }
`

export const THEMES = css.global`
  /* Dark Mode */
  .dark-theme, .invert-theme {
    --geist-foreground: #fff;
    --geist-background: #000;
    --geist-selection: var(--geist-purple);
    --accents-8: #fafafa;
    --accents-7: #eaeaea;
    --accents-6: #999999;
    --accents-5: #888888;
    --accents-4: #666666;
    --accents-3: #444444;
    --accents-2: #333333;
    --accents-1: #111111;
    /* Success (Blue) */
    --geist-success-light: #3291FF;
    --geist-success: #0070F3;
    --geist-success-dark: #0366D6;
    /* Error (Red) */
    --geist-error-light: #FF3333;
    --geist-error: #FF0000;
    --geist-error-dark: #E60000;
    /* Warning (Orange) */
    --geist-warning-light: #F7B955;
    --geist-warning: #F5A623;
    --geist-warning-dark: #F49B0B;
    /* Secondary (Gray) */
    --geist-secondary-light: var(--accents-3);
    --geist-secondary: var(--accents-5);
    --geist-secondary-dark: var(--accents-7);
    --geist-code: var(--geist-cyan);
    --dropdown-box-shadow: 0 0 0 1px var(--accents-2);
    --dropdown-triangle-stroke: #333;
    --scroller-start: rgba(0, 0, 0, 0.3);
    --scroller-end: rgba(255, 255, 255, 0);
    --geist-link-color: var(--geist-foreground);
    --shadow-small: 0 0 0 1px var(--accents-2);
    --shadow-medium: 0 0 0 1px var(--accents-2);
    --shadow-large: 0 0 0 1px var(--accents-2);
    --portal-opacity: 0.75;
  }
  .dark-theme .geist-card-shadow {
    box-shadow: 0 0 0 1px var(--accents-2);
  }
`

const ThemeVariables = () => (
  <style jsx global>
    {THEMES}
  </style>
)

export const CSSVariables = ({ disableTheme }) => (
  <>
    <style jsx global>
      {BASE_THEME}
    </style>

    {!disableTheme && <ThemeVariables />}
  </>
)
