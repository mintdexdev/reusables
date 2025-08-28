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
  /* Display */
  --text-display-lg: 5rem;
  --text-display-md: 4rem;
  --text-display-sm: 3.125rem;

  /* Heading */
  --text-heading-lg: 3.125rem;
  --text-heading-md: 2.5rem;
  --text-heading-sm: 2rem;

  /* Title */
  --text-title-lg: 2rem;
  --text-title-md: 1.5rem;
  --text-title-sm: 1.25rem;

  /* Body */
  --text-body-lg: 1.25rem;
  --text-body-md: 1.125rem;
  --text-body-sm: 1rem;

  /* Label */
  --text-label-lg: 1rem;
  --text-label-md: 0.875rem;
  --text-label-sm: 0.75rem;
}

body {
  font-size: var(--text-body-md);
  line-height: 1.6;
  font-weight: 400;
}

/* ========== Display ========== */
.text-display-lg {
  font-size: var(--text-display-lg);
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.1rem;
}

.text-display-md {
  font-size: var(--text-display-md);
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.1rem;
}

.text-display-sm {
  font-size: var(--text-display-sm);
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.1rem;
}

/* ========== Heading ========== */
.text-heading-lg {
  font-size: var(--text-heading-lg);
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.1rem;
}

.text-heading-md {
  font-size: var(--text-heading-md);
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.1rem;
}

.text-heading-sm {
  font-size: var(--text-heading-sm);
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: -0.1rem;
}

/* ========== Title ========== */
.text-title-lg {
  font-size: var(--text-title-lg);
  line-height: 1.4;
  font-weight: 500;
}

.text-title-md {
  font-size: var(--text-title-md);
  line-height: 1.4;
  font-weight: 500;
}

.text-title-sm {
  font-size: var(--text-title-sm);
  line-height: 1.4;
  font-weight: 500;
}

/* ========== Body ========== */
.text-body-lg {
  font-size: var(--text-body-lg);
  line-height: 1.6;
  font-weight: 500;
}

.text-body-md {
  font-size: var(--text-body-md);
  line-height: 1.6;
  font-weight: 500;
}

.text-body-sm {
  font-size: var(--text-body-sm);
  line-height: 1.6;
  font-weight: 500;
}

/* ========== Label ========== */
.text-label-lg {
  font-size: var(--text-label-lg);
  line-height: 1.8;
  font-weight: 400;
}

.text-label-md {
  font-size: var(--text-label-md);
  line-height: 1.8;
  font-weight: 400;
}

.text-label-sm {
  font-size: var(--text-label-sm);
  line-height: 1.8;
  font-weight: 400;
}

/* ========== Bold ========== */

:is(.text-display-lg, .text-display-md, .text-display-sm).bold {
  font-weight: 800;
}
:is(.text-heading-lg, .text-heading-md, .text-heading-sm).bold {
  font-weight: 800;
}
:is(.text-title-lg, .text-title-md, .text-title-sm).bold {
  font-weight: 700;
}
:is(.text-body-lg, .text-body-md, .text-body-sm).bold {
  font-weight: 700;
}
:is(.text-label-lg, .text-label-md, .text-label-sm).bold {
  font-weight: 600;
}
```

- ### Tailwindcss breakpoints 
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

@media (max-width: 639px) {}     /* < sm */
@media (min-width: 640px) {}     /* ≥ sm */
@media (min-width: 768px) {}     /* ≥ md */
@media (min-width: 1024px) {}    /* ≥ lg */
@media (min-width: 1280px) {}    /* ≥ xl */
@media (min-width: 1536px) {}    /* ≥ 2xl */
@media (min-width: 2048px) {}    /* ≥ uw ultrawide 4k */
@media print {}
```