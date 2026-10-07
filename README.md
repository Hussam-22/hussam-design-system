# Hussam Design System

Portable React components and individually callable Codex skills for the details in Hussam’s portfolio. This repository contains a component library and its documentation gallery, rather than a copy of the portfolio site.

**32 named skills**, each with a title, description, screenshot, source and integration guidance. See the [visual catalog](docs/catalog.md), [component APIs](docs/api.md), [machine-readable catalog](catalog.json), [extraction scope](docs/extraction-scope.md) and [provenance](docs/provenance.json).

## Install the skills on any device

Install Node.js 22.12+ and Git. Clone the repository and run the installer; skill installation uses Node’s built-in libraries and needs no npm dependencies.

```sh
git clone https://github.com/Hussam-22/hussam-design-system.git
cd hussam-design-system
node scripts/install-skills.mjs
```

The installer copies self-contained skill folders to `$CODEX_HOME/skills` or `~/.codex/skills` on Windows, macOS and Linux. Existing unrelated skills are never overwritten. Open a new Codex chat if its available skills were loaded before installation.

Install only selected skills:

```sh
node scripts/install-skills.mjs --only hds-spotlight-hover,hds-robot-orb
```

Update on each device:

```sh
git pull --ff-only
node scripts/install-skills.mjs
```

Example prompts:

> Use $hds-spotlight-hover on the pricing cards. Keep the existing layout.

> Use $hds-gradient-palette and $hds-robot-orb for the onboarding screen. Use React + Vite and Tailwind.

> Use $hds-browser-transform as the visual reference for the redesign story.

The code and preview are bundled inside each installed skill. You do not need the original portfolio checkout. Skills are instructions for Codex, while components are code for applications.

## Use the component package

Build the cloned library:

```sh
npm ci
npm run build:lib
```

From your React application, install the local checkout:

```sh
npm install /absolute/path/to/hussam-design-system
```

For a portable, pinned dependency, create a tarball in the library with `npm pack`, copy that `.tgz` into your application’s `vendor/` directory, and install it with `npm install ./vendor/hussam-22-design-system-0.1.0.tgz`. Commit the tarball and lockfile so Vercel can install it without relying on a local folder. This package has not been published to the npm registry.

```tsx
import {
  SpotlightCard,
  GradientButton,
  RobotOrb,
} from "@hussam-22/design-system";
import "@hussam-22/design-system/styles.css";

export function Example() {
  return (
    <SpotlightCard className="p-6">
      <h2>Designed details</h2>
      <GradientButton>Start a project</GradientButton>
      <RobotOrb />
    </SpotlightCard>
  );
}
```

Tailwind v4 must scan the package’s utilities. Add this to the consuming app’s CSS (adjust the relative path):

```css
@import "tailwindcss";
@source '../node_modules/@hussam-22/design-system/dist';
@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));
```

Copy the `@theme inline` mappings from [src/styles/tailwind.css](src/styles/tailwind.css) for semantic utilities such as `bg-primary`, `font-display` and `text-muted-foreground`. Components using `btn` require daisyUI’s `@plugin 'daisyui' { themes: false; }` in the host CSS; the gallery demonstrates this setup. Alternatively adapt those controls to the host’s existing controls.

HDS styles include the semantic palette, standalone effect styles and service illustration hover behavior. They do not impose a CSS reset or fonts. Load Inter Tight and Manrope yourself when you want the exact typography. The gallery font files retain their OFL notices. Apply `data-theme="dark"` to `html` for the dark palette; `data-motion="reduce"` or the OS reduced-motion preference disables optional animation. Scope or rename generic tokens when integrating into an existing design system.

Most visual components need React and styles. The robot uses Three.js. The timeline uses GSAP/ScrollTrigger. The sample chat/dashboard depend on Lucide and Radix/shadcn controls. These demonstrations use local data and do not include a production backend. TanStack Router/Query/Table, React Hook Form + Yup, Zustand and date-fns belong in consuming apps when their functionality is needed.

## Preview and maintain

```sh
npm ci
npm run dev
npm run check
npm run lint
npm run build
npm run skills:validate
npm run test:package
```

The Vite gallery provides search, isolated preview URLs (`?component=hds-spotlight-hover`) and a theme toggle. Vercel can build it using the included `vercel.json`; no deployment is required to use the library.

With the gallery running at `http://127.0.0.1:5173`, `npm run test:browser` exercises hover, comparison, carousel, demo chat, dashboard, dialog, motion fallback, and mobile layout. It refreshes screenshots and writes [validation results](docs/validation.json). Install the browser with `npx playwright install chromium` first. A browser may use the robot’s SVG fallback when WebGL is unavailable; the report distinguishes that state.

After editing code or screenshots:

```sh
node scripts/sync-skill-assets.mjs
npm run skills:validate
node scripts/install-skills.mjs
```

## Attribution

See [third-party notices](THIRD_PARTY_NOTICES.md) and [LICENSE](LICENSE). The spotlight is independently implemented. ReactBits TechText is documented as an [upstream-install recipe](docs/tech-text.md) because its current license restricts redistribution of components as a library. No TechText source or portfolio client screenshots are bundled.
