# Browser Transformation

- Skill: `$hds-browser-transform`
- Export: `DesignBrowser`
- Library source: `src/components/DesignBrowser.tsx`
- Portfolio source: `src/components/DesignBrowser.astro`
- Repository: https://github.com/Hussam-22/hussam-design-system

Use the native Web Animations controller with the complete vector art. Preserve its 13s cycle and offscreen pause. SVG IDs must be unique per instance.

## Integration

For packaged React use, install the library from a cloned checkout (build it first), import `@hussam-22/design-system/styles.css`, and include its utility source in Tailwind v4:

```css
@import "tailwindcss";
@source '../node_modules/@hussam-22/design-system/dist';
```

The compiled component stylesheet includes HDS tokens, authored effects and service hover CSS. The full Tailwind theme mappings are in `assets/source/styles/tailwind.css`; copy those mappings when components use utilities such as `bg-primary` or `font-display`. The library does not impose a reset or install fonts. The example gallery demonstrates the complete setup.

For source copying, start from the file above in `assets/source/`, follow its relative imports, and keep its styles/assets. Do not copy this skill into the application’s bundle.

## API example

Props: locale: en | ar; static artwork remains with reduced motion

```tsx
<DesignBrowser locale="en" />
```
