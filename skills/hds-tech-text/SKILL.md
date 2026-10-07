---
name: hds-tech-text
description: "Use Hussam’s Interactive Technical Text in a frontend project. ReactBits technical text with sweep, outlined glyphs and spring-return dragging."
---

# Interactive Technical Text

ReactBits technical text with sweep, outlined glyphs and spring-return dragging.

Read [the reference](references/component.md) and inspect the bundled source files in `assets/source/` before implementing. Use [the preview](assets/preview.png) to confirm the visual direction.

Upstream-install recipe only. Do not copy ReactBits source into a redistributed component library. Install the current official TechText TS CSS registry component directly in the consuming application; keep static text, fine-pointer dragging, Arabic word shaping and reduced-motion fallback.

Match the consuming project’s framework and component conventions. Prefer React + Vite, Tailwind and daisyUI where compatible. Do not introduce routing, data fetching or state libraries for a purely visual effect. Reuse the component or copy its minimal dependency closure; do not import portfolio pages, routes or personal content. Verify keyboard use, small screens, light/dark contrast and motion preferences for interactions that you change.

The canonical repository is https://github.com/Hussam-22/hussam-design-system. The local installed skill is self-contained; it does not require the original portfolio checkout. For updates, pull that repository and run `npm run skills:install`. Installation must never silently overwrite unrelated user skills.
