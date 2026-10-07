---
name: hds-carousel
description: "Use Hussam’s Snap Carousel in a frontend project. Horizontal snap track with previous/next controls, count and RTL support."
---

# Snap Carousel

Horizontal snap track with previous/next controls, count and RTL support.

Read [the reference](references/component.md) and inspect the bundled source files in `assets/source/` before implementing. Use [the preview](assets/preview.png) to confirm the visual direction.

Use bounding-box distances for direction-aware scroll targets; preserve disabled controls and instant reduced-motion scrolling.

Match the consuming project’s framework and component conventions. Prefer React + Vite, Tailwind and daisyUI where compatible. Do not introduce routing, data fetching or state libraries for a purely visual effect. Reuse the component or copy its minimal dependency closure; do not import portfolio pages, routes or personal content. Verify keyboard use, small screens, light/dark contrast and motion preferences for interactions that you change.

The canonical repository is https://github.com/Hussam-22/hussam-design-system. The local installed skill is self-contained; it does not require the original portfolio checkout. For updates, pull that repository and run `npm run skills:install`. Installation must never silently overwrite unrelated user skills.
