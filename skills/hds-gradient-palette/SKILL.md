---
name: hds-gradient-palette
description: "Use Hussam’s Violet Pink Amber Palette in a frontend project. Exact light/dark tokens and the signature 110-degree gradients."
---

# Violet Pink Amber Palette

Exact light/dark tokens and the signature 110-degree gradients.

Read [the reference](references/component.md) and inspect the bundled source files in `assets/source/` before implementing. Use [the preview](assets/preview.png) to confirm the visual direction.

Text gradient: #7941a0 → #a73880 → #a95425. Surface gradient: #b697fa → #efa1d0 → #ffc293, stops 0%, 52%, 100%, angle 110deg. Scope tokens when the host uses other variables.

Match the consuming project’s framework and component conventions. Prefer React + Vite, Tailwind and daisyUI where compatible. Do not introduce routing, data fetching or state libraries for a purely visual effect. Reuse the component or copy its minimal dependency closure; do not import portfolio pages, routes or personal content. Verify keyboard use, small screens, light/dark contrast and motion preferences for interactions that you change.

The canonical repository is https://github.com/Hussam-22/hussam-design-system. The local installed skill is self-contained; it does not require the original portfolio checkout. For updates, pull that repository and run `npm run skills:install`. Installation must never silently overwrite unrelated user skills.
