# Useful code snippit

## Topics
- [CSS](#css)
  - [Theme](#theme)
  - [Tailwindcss breakpoints](#tailwindcss-breakpoints)
- [Git](#git)
  - [Commit on any date](#commit-on-any-date)
  - [Change Committer and Author name](#Change-Committer-and-Author-name)

## CSS

- ### Theme 

```css
:root {
  --gap: 8px;
  --round: 12px;

  --colorText1: hsla(0, 0%, 100%, 0.93);
  --colorText2: hsla(0, 0%, 100%, 0.58);
  /* --colorText: hsl(0, 0%, 100%); */
  /* --colorText3: hsla(0, 0%, 100%, 0.36); */
  /* --colorText4: hsla(0, 0%, 100%, 0.22); */
  /* --colorText5: hsla(0, 0%, 100%, 0.14); */
  /* --colorText6: hsla(0, 0%, 100%, 0.08); */
  /* --colorText7: hsla(0, 0%, 100%, 0.05); */

  --colorElevation0: transparent;
  --colorElevation1: hsla(0, 0%, 100%, 0.02);
  --colorElevation2: hsla(0, 0%, 100%, 0.04);
  --colorElevation3: hsla(0, 0%, 100%, 0.08);
  /* --colorElevation4: hsla(0, 0%, 100%, 0.12); */
  /* --colorElevation4: hsla(0, 0%, 100%, 0.16); */

  --colorBorder1: hsla(0, 0%, 100%, 0.14);
  --colorBorder2: hsla(0, 0%, 100%, 0.22);
  /* --colorBorder3: hsla(0, 0%, 100%, 0.36); */
  /* --colorBorder4: hsla(0, 0%, 100%, 0.58); */

  --colorPrimary1: hsl(0, 0%, 7%);
  --colorPrimary2: hsla(0, 0%, 0%, 0.60);
  --colorPrimary3: hsla(0, 0%, 0%, 0.4);
  --colorAccent: #dc143c;

  /* --colorError: hsl(358, 62%, 48%); */
  /* --colorSecondary: white;
  --colorSecondary1: hsl(0, 0%, 93%);
  --colorSecondary2: hsla(0, 0%, 100%, 0.60); */
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
  --breakpoint-2xl: 96rem;
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

## Git

> write in git bash

- ### Commit on any date


```
GIT_AUTHOR_DATE="<YYYY-MM-DD>T<HH:SS:MM>" GIT_COMMITTER_DATE="<YYYY-MM-DD>T<HH:SS:MM>" git commit -m "commit message" 
```

```Example:```
```
GIT_AUTHOR_DATE="2025-01-01T7:00:00" GIT_COMMITTER_DATE="2025-01-01T7:00:00" git commit -m "update README" 
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