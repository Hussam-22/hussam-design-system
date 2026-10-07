# Interactive Technical Text

- Skill: `$hds-tech-text`
- Export: `upstream`
- Library source: `docs/tech-text.md`
- Portfolio source: `src/components/TechText.tsx`
- Repository: https://github.com/Hussam-22/hussam-design-system

Upstream-install recipe only. Do not copy ReactBits source into a redistributed component library. Install the current official TechText TS CSS registry component directly in the consuming application; keep static text, fine-pointer dragging, Arabic word shaping and reduced-motion fallback.

## Integration

This skill has no HDS package export or bundled component source. Read [the integration settings](../assets/upstream.md) and inspect [the portfolio preview](../assets/preview.png).

Install the current TypeScript CSS TechText component directly into the consuming application from [the official ReactBits registry](https://reactbits.dev/text-animations/tech-text). Read its [current license](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md) and preserve notices.

Use Inter Tight Variable, weight 720, letter spacing -0.064, reach 150, stroke width 1.5, 12 specks, automatic sweep and speed 1. Light gradient: #7941a0, #a73880, #a95425. Dark gradient: #b697fa, #efa1d0, #ffc293.

Drag only with a fine pointer. Keep readable static gradient text until the canvas is ready and for reduced motion. For Arabic, shape whole words, use letter spacing 0 and area reveal, and disable per-letter selection and labels. Inspect the current upstream API before applying settings. Do not copy its source into a redistributed component library.
