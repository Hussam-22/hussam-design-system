# Violet Contribution Heatmap

- Skill: `$hds-contribution-heatmap`
- Export: `ContributionHeatmap`
- Library source: `src/components/Interactions.tsx`
- Portfolio source: `src/components/GithubContributions.astro`
- Repository: https://github.com/Hussam-22/hussam-design-system

Accept caller data rather than bundled personal GitHub activity. Each week is seven intensity values from 0 to 4.

## Integration

For packaged React use, install the library from a cloned checkout (build it first), import `@hussam-22/design-system/styles.css`, and include its utility source in Tailwind v4:

```css
@import "tailwindcss";
@source '../node_modules/@hussam-22/design-system/dist';
```

The compiled component stylesheet includes HDS tokens, authored effects and service hover CSS. The full Tailwind theme mappings are in `assets/source/styles/tailwind.css`; copy those mappings when components use utilities such as `bg-primary` or `font-display`. The library does not impose a reset or install fonts. The example gallery demonstrates the complete setup.

For source copying, start from the file above in `assets/source/`, follow its relative imports, and keep its styles/assets. Do not copy this skill into the application’s bundle.

## API example

Props: weeks: seven values per week, 0 to 4; out-of-range values are clamped

```tsx
<ContributionHeatmap
  weeks={[
    [0, 1, 2, 3, 4, 2, 1],
    [1, 0, 2, 4, 3, 1, 0],
  ]}
/>
```
