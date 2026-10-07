# Violet Pink Amber Palette

- Skill: `$hds-gradient-palette`
- Export: `GradientText`
- Library source: `src/styles/tokens.css`
- Portfolio source: `src/styles/global.css`
- Repository: https://github.com/Hussam-22/hussam-design-system

Text gradient: #7941a0 → #a73880 → #a95425. Surface gradient: #b697fa → #efa1d0 → #ffc293, stops 0%, 52%, 100%, angle 110deg. Scope tokens when the host uses other variables.

## Integration

For packaged React use, install the library from a cloned checkout (build it first), import `@hussam-22/design-system/styles.css`, and include its utility source in Tailwind v4:

```css
@import "tailwindcss";
@source '../node_modules/@hussam-22/design-system/dist';
```

The compiled component stylesheet includes HDS tokens, authored effects and service hover CSS. The full Tailwind theme mappings are in `assets/source/styles/tailwind.css`; copy those mappings when components use utilities such as `bg-primary` or `font-display`. The library does not impose a reset or install fonts. The example gallery demonstrates the complete setup.

For source copying, start from the file above in `assets/source/`, follow its relative imports, and keep its styles/assets. Do not copy this skill into the application’s bundle.

## API example

Props: src/styles/tokens.css is the source of truth; --accent-gradient for text, --accent-surface-gradient for fills

```tsx
<GradientText>Designed details</GradientText>
```
