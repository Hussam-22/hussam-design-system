# Component API

Import from `@hussam-22/design-system` and follow the shared styles/Tailwind setup in the README.

## Spotlight Hover

- Skill: `$hds-spotlight-hover`
- Export: `SpotlightCard`
- Props: children; glow; className; style; standard div attributes/events

```tsx
<SpotlightCard glow="rgba(172,133,237,.24)" className="p-6">
  Content
</SpotlightCard>
```

## Illustrated Service Card

- Skill: `$hds-service-card`
- Export: `ServiceCard`
- Props: kind: website | redesign | assistant | dashboard | product; title; description; optional href

```tsx
<ServiceCard
  kind="website"
  title="Websites"
  description="Clear, considered experiences."
  href="/services"
/>
```

## Violet Pink Amber Palette

- Skill: `$hds-gradient-palette`
- Export: `GradientText`
- Props: src/styles/tokens.css is the source of truth; --accent-gradient for text, --accent-surface-gradient for fills

```tsx
<GradientText>Designed details</GradientText>
```

## Gradient Typography

- Skill: `$hds-gradient-text`
- Export: `GradientText`
- Props: children; className; standard span attributes

```tsx
<GradientText className="text-4xl">Designed details</GradientText>
```

## Gradient Pill Button

- Skill: `$hds-gradient-button`
- Export: `GradientButton`
- Props: children; className; standard button attributes; default type="button"

```tsx
<GradientButton onClick={handleStart}>Start a project</GradientButton>
```

## Ambient Gradient Glow

- Skill: `$hds-ambient-glow`
- Export: `AmbientGlow`
- Props: children; className; standard div attributes

```tsx
<AmbientGlow className="p-12">Your illustration</AmbientGlow>
```

## Technical Grid Surface

- Skill: `$hds-grid-surface`
- Export: `GridSurface`
- Props: children; className; standard div attributes

```tsx
<GridSurface className="p-8">Your diagram</GridSurface>
```

## Animated Robot Sphere

- Skill: `$hds-robot-orb`
- Export: `RobotOrb`
- Props: label; className; wrapper controls size; Three.js loads near the viewport when motion is allowed

```tsx
<RobotOrb label="Animated assistant mascot" className="max-w-96" />
```

## Animated Line Mascot

- Skill: `$hds-sketch-mascot`
- Export: `ContactSketch`
- Props: animated (default true); compact (default false); className

```tsx
<ContactSketch animated={true} compact={false} className="w-80" />
```

## Website Service Illustration

- Skill: `$hds-website-graphic`
- Export: `ServiceGraphic`
- Props: kind: website | redesign | assistant | dashboard | product; locale: en | ar; hover needs service-card ancestor

```tsx
<div data-ui="service-card">
  <ServiceGraphic kind="website" locale="en" />
</div>
```

## Redesign Service Illustration

- Skill: `$hds-redesign-graphic`
- Export: `ServiceGraphic`
- Props: kind: website | redesign | assistant | dashboard | product; locale: en | ar; hover needs service-card ancestor

```tsx
<div data-ui="service-card">
  <ServiceGraphic kind="redesign" locale="en" />
</div>
```

## Assistant Service Illustration

- Skill: `$hds-assistant-graphic`
- Export: `ServiceGraphic`
- Props: kind: website | redesign | assistant | dashboard | product; locale: en | ar; hover needs service-card ancestor

```tsx
<div data-ui="service-card">
  <ServiceGraphic kind="assistant" locale="en" />
</div>
```

## Dashboard Service Illustration

- Skill: `$hds-dashboard-graphic`
- Export: `ServiceGraphic`
- Props: kind: website | redesign | assistant | dashboard | product; locale: en | ar; hover needs service-card ancestor

```tsx
<div data-ui="service-card">
  <ServiceGraphic kind="dashboard" locale="en" />
</div>
```

## Product Service Illustration

- Skill: `$hds-product-graphic`
- Export: `ServiceGraphic`
- Props: kind: website | redesign | assistant | dashboard | product; locale: en | ar; hover needs service-card ancestor

```tsx
<div data-ui="service-card">
  <ServiceGraphic kind="product" locale="en" />
</div>
```

## Browser Transformation

- Skill: `$hds-browser-transform`
- Export: `DesignBrowser`
- Props: locale: en | ar; static artwork remains with reduced motion

```tsx
<DesignBrowser locale="en" />
```

## Responsive Website Showcase

- Skill: `$hds-responsive-showcase`
- Export: `WebsiteExperience`
- Props: locale: en | ar; sample studio copy/artwork; per-instance detail toggle

```tsx
<WebsiteExperience locale="en" />
```

## Desktop Browser Frame

- Skill: `$hds-browser-frame`
- Export: `BrowserFrame`
- Props: children; optional label

```tsx
<BrowserFrame label="Desktop product preview">
  <img src={desktopImage} alt="Product interface" />
</BrowserFrame>
```

## Phone Device Frame

- Skill: `$hds-phone-frame`
- Export: `PhoneFrame`
- Props: children; optional label

```tsx
<PhoneFrame label="Mobile product preview">
  <img src={mobileImage} alt="Mobile interface" />
</PhoneFrame>
```

## Before After Device Comparison

- Skill: `$hds-device-comparison`
- Export: `DeviceComparison`
- Props: before/after each contain desktop, mobile, alt; optional beforeLabel/afterLabel

```tsx
<DeviceComparison
  before={{ desktop: oldDesktop, mobile: oldMobile, alt: "Original website" }}
  after={{ desktop: newDesktop, mobile: newMobile, alt: "Redesigned website" }}
/>
```

## Scroll Reveal

- Skill: `$hds-scroll-reveal`
- Export: `Reveal`
- Props: children; className; delay in milliseconds (default 0); once per mounted component

```tsx
<Reveal delay={100}>
  <h2>Details worth noticing</h2>
</Reveal>
```

## Scroll Progress Timeline

- Skill: `$hds-process-timeline`
- Export: `ProcessTimeline`
- Props: steps: array of {title, description}; four stages match source connector geometry

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

## Project Preview Card

- Skill: `$hds-project-card`
- Export: `ProjectCard`
- Props: title; category; image URL; alt; href

```tsx
<ProjectCard
  title="Studio website"
  category="Website"
  image={imageUrl}
  alt="Studio homepage"
  href="/work/studio"
/>
```

## Snap Carousel

- Skill: `$hds-carousel`
- Export: `Carousel`
- Props: children; optional label; inherits reading direction; daisyUI supplies btn styles

```tsx
<Carousel label="Projects">
  <ProjectCard {...firstProject} />
  <ProjectCard {...secondProject} />
</Carousel>
```

## Editorial Section Heading

- Skill: `$hds-section-heading`
- Export: `SectionHeading`
- Props: number; label; title; optional description

```tsx
<SectionHeading
  number="01"
  label="Services"
  title="Designed for your work."
  description="Clear systems and considered details."
/>
```

## Arrow Link Hover

- Skill: `$hds-arrow-link`
- Export: `ArrowLink`
- Props: children; href

```tsx
<ArrowLink href="/work">Explore the work</ArrowLink>
```

## Light Dark Theme Tokens

- Skill: `$hds-theme-tokens`
- Export: `ThemeToggle`
- Props: no props; controls html data-theme, saves hds-theme; host loads saved theme before paint

```tsx
<ThemeToggle />
```

## Violet Contribution Heatmap

- Skill: `$hds-contribution-heatmap`
- Export: `ContributionHeatmap`
- Props: weeks: seven values per week, 0 to 4; out-of-range values are clamped

```tsx
<ContributionHeatmap
  weeks={[
    [0, 1, 2, 3, 4, 2, 1],
    [1, 0, 2, 4, 3, 1, 0],
  ]}
/>
```

## Connected Product Diagram

- Skill: `$hds-product-system`
- Export: `ProductSystem`
- Props: locale: en | ar; static illustrative diagram; adapt labels to real systems

```tsx
<ProductSystem locale="en" />
```

## Grounded Chat Interface

- Skill: `$hds-chat-demo`
- Export: `ChatAssistantDemo`
- Props: locale: en | ar; prepared knowledge/answers; source/reset controls; no network backend

```tsx
<ChatAssistantDemo locale="en" />
```

## Interactive Workspace Dashboard

- Skill: `$hds-dashboard-demo`
- Export: `DashboardDemo`
- Props: locale: en | ar; local records; add/delete/search/sort/status; no persistence/backend

```tsx
<DashboardDemo locale="en" />
```

## Rounded UI Primitives

- Skill: `$hds-ui-primitives`
- Export: `Button`
- Props: Button: variant, size, asChild/button attributes; Badge: variant/asChild; Input/Label: standard attributes; Dialog: exported Radix composition

```tsx
<Button variant="outline" size="default">
  Action
</Button>
```
