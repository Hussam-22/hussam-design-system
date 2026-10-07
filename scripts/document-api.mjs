import { readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
const root = resolve(import.meta.dirname, "..");
const catalog = JSON.parse(await readFile(join(root, "catalog.json"), "utf8"));
const examples = {
  "spotlight-hover": [
    '<SpotlightCard glow="rgba(172,133,237,.24)" className="p-6">Content</SpotlightCard>',
    "children; glow; className; style; standard div attributes/events",
  ],
  "service-card": [
    '<ServiceCard kind="website" title="Websites" description="Clear, considered experiences." href="/services" />',
    "kind: website | redesign | assistant | dashboard | product; title; description; optional href",
  ],
  "gradient-palette": [
    "<GradientText>Designed details</GradientText>",
    "src/styles/tokens.css is the source of truth; --accent-gradient for text, --accent-surface-gradient for fills",
  ],
  "gradient-text": [
    '<GradientText className="text-4xl">Designed details</GradientText>',
    "children; className; standard span attributes",
  ],
  "gradient-button": [
    "<GradientButton onClick={handleStart}>Start a project</GradientButton>",
    'children; className; standard button attributes; default type="button"',
  ],
  "ambient-glow": [
    '<AmbientGlow className="p-12">Your illustration</AmbientGlow>',
    "children; className; standard div attributes",
  ],
  "grid-surface": [
    '<GridSurface className="p-8">Your diagram</GridSurface>',
    "children; className; standard div attributes",
  ],
  "robot-orb": [
    '<RobotOrb label="Animated assistant mascot" className="max-w-96" />',
    "label; className; wrapper controls size; Three.js loads near the viewport when motion is allowed",
  ],
  "sketch-mascot": [
    '<ContactSketch animated={true} compact={false} className="w-80" />',
    "animated (default true); compact (default false); className",
  ],
  "browser-transform": [
    '<DesignBrowser locale="en" />',
    "locale: en | ar; static artwork remains with reduced motion",
  ],
  "responsive-showcase": [
    '<WebsiteExperience locale="en" />',
    "locale: en | ar; sample studio copy/artwork; per-instance detail toggle",
  ],
  "browser-frame": [
    '<BrowserFrame label="Desktop product preview"><img src={desktopImage} alt="Product interface" /></BrowserFrame>',
    "children; optional label",
  ],
  "phone-frame": [
    '<PhoneFrame label="Mobile product preview"><img src={mobileImage} alt="Mobile interface" /></PhoneFrame>',
    "children; optional label",
  ],
  "device-comparison": [
    '<DeviceComparison before={{desktop: oldDesktop, mobile: oldMobile, alt: "Original website"}} after={{desktop: newDesktop, mobile: newMobile, alt: "Redesigned website"}} />',
    "before/after each contain desktop, mobile, alt; optional beforeLabel/afterLabel",
  ],
  "scroll-reveal": [
    "<Reveal delay={100}><h2>Details worth noticing</h2></Reveal>",
    "children; className; delay in milliseconds (default 0); once per mounted component",
  ],
  "process-timeline": [
    '<ProcessTimeline steps={[{title:"Understand",description:"Define the problem"},{title:"Structure",description:"Agree the plan"},{title:"Build",description:"Build and test"},{title:"Evolve",description:"Keep improving"}]} />',
    "steps: array of {title, description}; four stages match source connector geometry",
  ],
  "project-card": [
    '<ProjectCard title="Studio website" category="Website" image={imageUrl} alt="Studio homepage" href="/work/studio" />',
    "title; category; image URL; alt; href",
  ],
  carousel: [
    '<Carousel label="Projects"><ProjectCard {...firstProject} /><ProjectCard {...secondProject} /></Carousel>',
    "children; optional label; inherits reading direction; daisyUI supplies btn styles",
  ],
  "section-heading": [
    '<SectionHeading number="01" label="Services" title="Designed for your work." description="Clear systems and considered details." />',
    "number; label; title; optional description",
  ],
  "arrow-link": [
    '<ArrowLink href="/work">Explore the work</ArrowLink>',
    "children; href",
  ],
  "theme-tokens": [
    "<ThemeToggle />",
    "no props; controls html data-theme, saves hds-theme; host loads saved theme before paint",
  ],
  "contribution-heatmap": [
    "<ContributionHeatmap weeks={[[0,1,2,3,4,2,1],[1,0,2,4,3,1,0]]} />",
    "weeks: seven values per week, 0 to 4; out-of-range values are clamped",
  ],
  "product-system": [
    '<ProductSystem locale="en" />',
    "locale: en | ar; static illustrative diagram; adapt labels to real systems",
  ],
  "chat-demo": [
    '<ChatAssistantDemo locale="en" />',
    "locale: en | ar; prepared knowledge/answers; source/reset controls; no network backend",
  ],
  "dashboard-demo": [
    '<DashboardDemo locale="en" />',
    "locale: en | ar; local records; add/delete/search/sort/status; no persistence/backend",
  ],
  "ui-primitives": [
    '<Button variant="outline" size="default">Action</Button>',
    "Button: variant, size, asChild/button attributes; Badge: variant/asChild; Input/Label: standard attributes; Dialog: exported Radix composition",
  ],
};
for (const kind of ["website", "redesign", "assistant", "dashboard", "product"])
  examples[kind + "-graphic"] = [
    `<div data-ui="service-card"><ServiceGraphic kind="${kind}" locale="en" /></div>`,
    "kind: website | redesign | assistant | dashboard | product; locale: en | ar; hover needs service-card ancestor",
  ];
let api =
  "# Component API\n\nImport from `@hussam-22/design-system` and follow the shared styles/Tailwind setup in the README.\n\n";
for (const entry of catalog) {
  if (entry.export === "upstream") continue;
  const [example, props] = examples[entry.name.replace("hds-", "")];
  api += `## ${entry.title}\n\n- Skill: \`$${entry.name}\`\n- Export: \`${entry.export}\`\n- Props: ${props}\n\n\`\`\`tsx\n${example}\n\`\`\`\n\n`;
  const path = join(root, "skills", entry.name, "references/component.md");
  const reference = await readFile(path, "utf8");
  await writeFile(
    path,
    reference.split("\n## API example")[0] +
      `\n## API example\n\nProps: ${props}\n\n\`\`\`tsx\n${example}\n\`\`\`\n`,
  );
}
await writeFile(join(root, "docs/api.md"), api);
console.log("Documented 31 component APIs and skill examples.");
