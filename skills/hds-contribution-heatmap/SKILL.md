---
name: hds-contribution-heatmap
description: "Use Hussam’s Violet Contribution Heatmap in a frontend project. Seven-row activity chart with a five-step violet intensity scale."
---

# Violet Contribution Heatmap

Seven-row activity chart with a five-step violet intensity scale.

Read [the reference](references/component.md) and inspect the bundled source files in `assets/source/` before implementing. Use [the preview](assets/preview.png) to confirm the visual direction.

Accept caller data rather than bundled personal GitHub activity. Each week is seven intensity values from 0 to 4.

Match the consuming project’s framework and component conventions. Prefer React + Vite, Tailwind and daisyUI where compatible. Do not introduce routing, data fetching or state libraries for a purely visual effect. Reuse the component or copy its minimal dependency closure; do not import portfolio pages, routes or personal content. Verify keyboard use, small screens, light/dark contrast and motion preferences for interactions that you change.

The canonical repository is https://github.com/Hussam-22/hussam-design-system. The local installed skill is self-contained; it does not require the original portfolio checkout. For updates, pull that repository and run `npm run skills:install`. Installation must never silently overwrite unrelated user skills.
