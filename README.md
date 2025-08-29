# Useful code snippit

## Topics
- [Git](#git)
  - [Commit on any date](#commit-on-any-date)
  - [Change Committer and Author name](#Change-Committer-and-Author-name)

- [JavaScript](#javascript)
  - [appwriteAccount](/appwriteAccount.js)
  - [automateIndex](/automateIndex.js)
  - [importScript](/importScript.js)
  - [fibonacci](/fibonacci.js)
  - [imageConverter](/imageConverter/convert.js)
  - [themeStore](/themeStore.js)
  - [useTheme Hook](/usetheme.jsx.js)
- [CSS](#css)
  - [Theme](#theme)
  - [Typography](#typography)
  - [Tailwindcss breakpoints](#tailwindcss-breakpoints)

### Vite

#### for using alias in vite projects

```js
// jsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

## Git

> write in git bash

- ### Commit on any date


```
GIT_AUTHOR_DATE="<YYYY-MM-DD>T<HH:SS:MM>" GIT_COMMITTER_DATE="<YYYY-MM-DD>T<HH:SS:MM>" git commit -m "commit message" 
```

```Example:```
```
GIT_AUTHOR_DATE="2025-05-16T17:00:00" GIT_COMMITTER_DATE="2025-05-16T17:00:00" git commit -m "update README" 
```
- ### Change Committer and Author name

```
# list all commit emails
git log --pretty=format:"%an <%ae>"
git log --all --format='%ae%n%ce' | sort -u
```
```
# change all email to new one 
git filter-branch -f --env-filter '
NEW_NAME="Your Name"
NEW_EMAIL="your@email.com"

export GIT_AUTHOR_NAME="$NEW_NAME"
export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
export GIT_COMMITTER_NAME="$NEW_NAME"
export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
' -- --all
```

```
# push to remote repo
git push --force --all
git push --force --tags
```

## JavaScript

## CSS

- ### Theme 

```css
:root {
  --c-primary: oklch(50.689% 0.20291 318.522);
  --c-secondary: hsl(120, 57%, 50%);
  --c-tertiary: hsl(240, 69%, 40%);
  --c-error: hsl(0, 75%, 42%);

  --c-surface: hsl(0, 0%, 85%);
  --c-outline: hsl(0, 0%, 0%);
  --c-on: hsl(0, 0%, 13%);

  --c-elevation: hsl(0, 0%, 100%);
  --c-fixed-lightness: 30%;
  --c-container-lightness: 0.4;

  --c-surface-lightness: -1;

  /* auto containers */
  --c-container-primary: oklch(from var(--c-primary) calc(l + var(--c-container-lightness)) c h);
  --c-container-secondary: oklch(from var(--c-secondary) calc(l + var(--c-container-lightness)) c h);
  --c-container-tertiary: oklch(from var(--c-tertiary) calc(l + var(--c-container-lightness)) c h);
  --c-container-error: oklch(from var(--c-error) calc(l + var(--c-container-lightness)) c h);

  /* autofixed */
  --c-fixed-primary: oklch(from var(--c-primary) var(--c-fixed-lightness) c h);
  --c-fixed-secondary: oklch(from var(--c-secondary) var(--c-fixed-lightness) c h);
  --c-fixed-tertiary: oklch(from var(--c-tertiary) var(--c-fixed-lightness) c h);


  /* auto surface */
  --c-surface-1: oklch(from var(--c-surface) calc(l + (var(--c-surface-lightness) * 0.04)) c h);
  --c-surface-2: oklch(from var(--c-surface) calc(l + (var(--c-surface-lightness) * 0.10)) c h);
  --c-surface-3: oklch(from var(--c-surface) calc(l + (var(--c-surface-lightness) * 0.14)) c h);

  /* auto outline */
  --c-outline-1: oklch(from var(--c-outline) l c h / 0.62);
  --c-outline-2: oklch(from var(--c-outline) l c h / 0.38);
  --c-outline-3: oklch(from var(--c-outline) l c h / 0.24);
  --c-outline-4: oklch(from var(--c-outline) l c h / 0.15);

  /* auto elevation*/
  --c-elevation-1: linear-gradient(0deg, oklch(from var(--c-elevation) l c h / 0.04));
  --c-elevation-2: linear-gradient(0deg, oklch(from var(--c-elevation) l c h / 0.08));
  --c-elevation-3: linear-gradient(0deg, oklch(from var(--c-elevation) l c h / 0.12));

  /* text color */
  --c-on-surface: oklch(from var(--c-on) l c h);
  --c-on-primary: oklch(from var(--c-primary) l c h);
  --c-on-fixed: oklch(from var(--c-fixed-primary) 30% c h);
  --c-on-fixed-2: oklch(from var(--c-fixed-primary) 50% c h);
}
```

- ### Typography

<!-- // todo:
add figma link
[Figma link](link) -->

```css
:root {
  font-family: "Roboto Flex", sans-serif;
  font-optical-sizing: auto;
}

body {
  /* default properties */
  font-size: 1.125rem;
  line-height: 1.5;
  font-weight: 500;
}

.text-l9 {
  font-size: calc((160/16) * 1rem);
  line-height: 1.2;
}

.text-l8 {
  font-size: calc((128/16) * 1rem);
  line-height: 1.2;
}

.text-l7 {
  font-size: calc((96/16) * 1rem);
  line-height: 1.2;
}

.text-l6 {
  font-size: calc((80/16) * 1rem);
  line-height: 1.3;
}

.text-l5 {
  font-size: calc((64/16) * 1rem);
  line-height: 1.3;
}

.text-l4 {
  font-size: calc((48/16) * 1rem);
  line-height: 1.3;
}

.text-l3 {
  font-size: calc((40/16) * 1rem);
  line-height: 1.4;
}

.text-l2 {
  font-size: calc((32/16) * 1rem);
  line-height: 1.4;
}

.text-l1 {
  font-size: calc((24/16) * 1rem);
  line-height: 1.4;
}

.text-lg {
  font-size: calc((20/16) * 1rem);
  line-height: 1.5;
}

.text-md {
  font-size: calc((18/16) * 1rem);
  line-height: 1.5;
}

.text-sm {
  font-size: calc((16/16) * 1rem);
  line-height: 1.5;
}

.text-s1 {
  font-size: calc((14/16) * 1rem);
  line-height: 1.6;
}

.text-s2 {
  font-size: calc((12/16) * 1rem);
  line-height: 1.6;
}

.text-s3 {
  font-size: calc((10/16) * 1rem);
  line-height: 1.6;
}

:is(.text-l1, .text-l2, .text-l3, .text-l4, .text-l5, .text-l6, .text-l7, .text-l8, .text-l9,
  .text-lg, .text-md, .text-sm,
  .text-s1, .text-s2, .text-s3).bold {
  font-weight: 700;
}
```

- ### Tailwindcss breakpoints 

tailwindcss breakpoint but custom
```css
@import "tailwindcss";

@theme {
  --breakpoint-sm: 40rem;
  --breakpoint-md: 48rem;
  --breakpoint-lg: 64rem;
  --breakpoint-xl: 80rem;
  --breakpoint-wd: 96rem;
  --breakpoint-uw: 128rem;
}

/* default code */
@media (min-width: 640px) {}     /* ≥ sm */
@media (min-width: 768px) {}     /* ≥ md */
@media (min-width: 1024px) {}    /* ≥ lg */
@media (min-width: 1280px) {}    /* ≥ xl */
@media (min-width: 1536px) {}    /* ≥ wd */
@media (min-width: 2048px) {}    /* ≥ uw ultrawide 4k */
@media print {}
```