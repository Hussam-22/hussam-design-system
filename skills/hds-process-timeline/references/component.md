# Scroll Progress Timeline

- Skill: `$hds-process-timeline`
- Export: `ProcessTimeline`
- Library source: `src/components/Interactions.tsx`
- Portfolio source: `src/components/home/ThinkingProcess.astro`
- Repository: https://github.com/Hussam-22/hussam-design-system

Retain GSAP ScrollTrigger scrubbing and matchMedia cleanup. Default geometry is four stages; adjust connector width for other counts.

## Integration

For packaged React use, install the library from a cloned checkout (build it first), import `@hussam-22/design-system/styles.css`, and include its utility source in Tailwind v4:

```css
@import "tailwindcss";
@source '../node_modules/@hussam-22/design-system/dist';
```

The compiled component stylesheet includes HDS tokens, authored effects and service hover CSS. The full Tailwind theme mappings are in `assets/source/styles/tailwind.css`; copy those mappings when components use utilities such as `bg-primary` or `font-display`. The library does not impose a reset or install fonts. The example gallery demonstrates the complete setup.

For source copying, start from the file above in `assets/source/`, follow its relative imports, and keep its styles/assets. Do not copy this skill into the application’s bundle.

## API example

Props: steps: array of {title, description}; four stages match source connector geometry

```tsx
<ProcessTimeline
  steps={[
    { title: "Understand", description: "Define the problem" },
    { title: "Structure", description: "Agree the plan" },
    { title: "Build", description: "Build and test" },
    { title: "Evolve", description: "Keep improving" },
  ]}
/>
```
