# Before After Device Comparison

- Skill: `$hds-device-comparison`
- Export: `DeviceComparison`
- Library source: `src/components/Interactions.tsx`
- Portfolio source: `src/components/DeviceComparison.astro`
- Repository: https://github.com/Hussam-22/hussam-design-system

Supply before and after desktop/mobile images. Keep aria-pressed state and meaningful alt text.

## Integration

For packaged React use, install the library from a cloned checkout (build it first), import `@hussam-22/design-system/styles.css`, and include its utility source in Tailwind v4:

```css
@import "tailwindcss";
@source '../node_modules/@hussam-22/design-system/dist';
```

The compiled component stylesheet includes HDS tokens, authored effects and service hover CSS. The full Tailwind theme mappings are in `assets/source/styles/tailwind.css`; copy those mappings when components use utilities such as `bg-primary` or `font-display`. The library does not impose a reset or install fonts. The example gallery demonstrates the complete setup.

For source copying, start from the file above in `assets/source/`, follow its relative imports, and keep its styles/assets. Do not copy this skill into the application’s bundle.

## API example

Props: before/after each contain desktop, mobile, alt; optional beforeLabel/afterLabel

```tsx
<DeviceComparison
  before={{ desktop: oldDesktop, mobile: oldMobile, alt: "Original website" }}
  after={{ desktop: newDesktop, mobile: newMobile, alt: "Redesigned website" }}
/>
```
