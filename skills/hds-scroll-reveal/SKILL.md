---
name: hds-scroll-reveal
description: "Use Hussam’s Scroll Reveal in a frontend project. Once-per-mount 24px rise and fade for content entering the viewport."
---

# Scroll Reveal

Once-per-mount 24px rise and fade for content entering the viewport.

Read [the reference](references/component.md) and inspect the bundled source files in `assets/source/` before implementing. Use [the preview](assets/preview.png) to confirm the visual direction.

Static HTML stays visible before hydration and for reduced motion. This uses native Web Animations instead of the site GSAP reveal; duration remains 700ms.

Match the consuming project’s framework and component conventions. Prefer React + Vite, Tailwind and daisyUI where compatible. Do not introduce routing, data fetching or state libraries for a purely visual effect. Reuse the component or copy its minimal dependency closure; do not import portfolio pages, routes or personal content. Verify keyboard use, small screens, light/dark contrast and motion preferences for interactions that you change.

The canonical repository is https://github.com/Hussam-22/hussam-design-system. The local installed skill is self-contained; it does not require the original portfolio checkout. For updates, pull that repository and run `npm run skills:install`. Installation must never silently overwrite unrelated user skills.
