# Animated Line Mascot

- Skill: `$hds-sketch-mascot`
- Export: `ContactSketch`
- Library source: `src/components/ContactSketch.tsx`
- Portfolio source: `src/components/ContactSketch.astro`
- Repository: https://github.com/Hussam-22/hussam-design-system

Support animated=false for compact logos. Keep decorative SVG aria-hidden and halt motion when requested.

## Integration

For packaged React use, install the library from a cloned checkout (build it first), import `@hussam-22/design-system/styles.css`, and include its utility source in Tailwind v4:

```css
@import "tailwindcss";
@source '../node_modules/@hussam-22/design-system/dist';
```

The compiled component stylesheet includes HDS tokens, authored effects and service hover CSS. The full Tailwind theme mappings are in `assets/source/styles/tailwind.css`; copy those mappings when components use utilities such as `bg-primary` or `font-display`. The library does not impose a reset or install fonts. The example gallery demonstrates the complete setup.

For source copying, start from the file above in `assets/source/`, follow its relative imports, and keep its styles/assets. Do not copy this skill into the application’s bundle.

## API example

Props: animated (default true); compact (default false); className

```tsx
<ContactSketch animated={true} compact={false} className="w-80" />
```
