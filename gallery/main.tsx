import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import * as HDS from "../src/index";
import catalog from "../catalog.json";
import "./styles.css";

const siteImage = (label: string, color: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><rect width="1200" height="700" fill="${color}"/><rect x="70" y="70" width="1060" height="560" rx="30" fill="#ffffff" fill-opacity=".45"/><text x="120" y="220" font-family="sans-serif" font-size="64" fill="#25152f">${label}</text><rect x="120" y="280" width="450" height="20" rx="10" fill="#7941a0"/><rect x="120" y="330" width="360" height="20" rx="10" fill="#a73880"/><rect x="120" y="420" width="220" height="64" rx="32" fill="#7941a0"/><circle cx="880" cy="410" r="140" fill="#efa1d0"/></svg>`)}`;
const before = {
  desktop: siteImage("Before the redesign", "#ded6e2"),
  mobile: siteImage("Before", "#ded6e2"),
  alt: "Sample original design",
};
const after = {
  desktop: siteImage("A better first impression.", "#b697fa"),
  mobile: siteImage("After", "#ffc293"),
  alt: "Sample redesigned website",
};
const steps = [
  {
    title: "Understand",
    description: "Who needs it, and what should work better?",
  },
  {
    title: "Structure",
    description: "Choose the pages, features and connections.",
  },
  { title: "Build", description: "Check the design against real tasks." },
  {
    title: "Evolve",
    description: "Make it practical to maintain and develop.",
  },
];
function Preview({ name }: { name: string }) {
  const key = name.replace("hds-", "");
  if (key.endsWith("-graphic"))
    return (
      <HDS.SpotlightCard data-ui="service-card" className="p-6">
        <HDS.ServiceGraphic
          kind={key.replace("-graphic", "") as HDS.GraphicKind}
        />
      </HDS.SpotlightCard>
    );
  switch (key) {
    case "spotlight-hover":
      return (
        <HDS.SpotlightCard className="p-10">
          <p className="text-xs tracking-widest text-(--accent-ink)">
            MOVE YOUR POINTER
          </p>
          <h3 className="text-4xl font-bold mt-4">
            A little light.
            <br />A better interaction.
          </h3>
          <p className="mt-5 text-(--muted)">
            Cursor glow, subtle lift and a violet border.
          </p>
          <HDS.ArrowLink href="#spotlight-hover">
            Explore the effect
          </HDS.ArrowLink>
        </HDS.SpotlightCard>
      );
    case "service-card":
      return (
        <HDS.ServiceCard
          kind="website"
          title="Websites that feel designed."
          description="Thoughtful layouts, clear decisions and details that make the difference."
          href="#hds-service-card"
        />
      );
    case "gradient-palette":
      return (
        <div>
          <div
            className="h-32 rounded-xl"
            style={{ background: "var(--accent-surface-gradient)" }}
          />
          <div
            className="mt-5 h-24 rounded-xl"
            style={{ background: "var(--accent-gradient)" }}
          />
          <p className="mt-5">110° · violet → pink → amber</p>
        </div>
      );
    case "gradient-text":
      return (
        <h3 className="text-4xl md:text-6xl font-extrabold leading-tight">
          <HDS.GradientText>
            The experience
            <br />
            is the difference.
          </HDS.GradientText>
        </h3>
      );
    case "gradient-button":
      return (
        <div className="p-10">
          <HDS.GradientButton>Let’s build something</HDS.GradientButton>
        </div>
      );
    case "ambient-glow":
      return (
        <HDS.AmbientGlow className="p-16 text-center">
          <h3 className="text-4xl font-bold">Quiet atmosphere.</h3>
          <p className="mt-4">Soft color behind the content.</p>
        </HDS.AmbientGlow>
      );
    case "grid-surface":
      return (
        <HDS.GridSurface className="p-16 rounded-xl">
          <HDS.GradientText className="text-4xl font-bold">
            Structure beneath
            <br />
            the surface.
          </HDS.GradientText>
        </HDS.GridSurface>
      );
    case "robot-orb":
      return (
        <div className="max-w-96 mx-auto">
          <HDS.RobotOrb />
        </div>
      );
    case "tech-text":
      return (
        <div className="p-8">
          <HDS.GradientText className="text-7xl font-bold">
            AI era?
          </HDS.GradientText>
          <p className="mt-6 text-(--muted)">
            Upstream-install recipe. ReactBits implementation is not bundled.
          </p>
          <a
            className="hds-arrow-link"
            href="https://reactbits.dev/text-animations/tech-text"
          >
            View upstream component
          </a>
        </div>
      );
    case "sketch-mascot":
      return (
        <div className="max-w-80 mx-auto">
          <HDS.ContactSketch />
        </div>
      );
    case "browser-transform":
      return <HDS.DesignBrowser />;
    case "responsive-showcase":
      return <HDS.WebsiteExperience />;
    case "browser-frame":
      return (
        <HDS.BrowserFrame>
          <img src={after.desktop} alt={after.alt} />
        </HDS.BrowserFrame>
      );
    case "phone-frame":
      return (
        <HDS.PhoneFrame>
          <img
            src={after.mobile}
            alt={after.alt}
            className="h-full w-full object-cover"
          />
        </HDS.PhoneFrame>
      );
    case "device-comparison":
      return <HDS.DeviceComparison before={before} after={after} />;
    case "scroll-reveal":
      return (
        <div>
          <HDS.Reveal>
            <HDS.SectionHeading
              number="01"
              label="Reveal on entry"
              title="Details worth noticing."
              description="A 24px rise with a 700ms fade. Static content stays readable."
            />
          </HDS.Reveal>
        </div>
      );
    case "process-timeline":
      return <HDS.ProcessTimeline steps={steps} />;
    case "project-card":
      return (
        <HDS.ProjectCard
          title="A considered experience"
          category="Website / Design"
          image={after.desktop}
          alt="Synthetic project preview"
          href="#hds-project-card"
        />
      );
    case "carousel":
      return (
        <HDS.Carousel>
          {["Discover", "Design", "Build"].map((label, i) => (
            <HDS.SpotlightCard key={label} className="p-8">
              <span className="text-(--muted)">0{i + 1}</span>
              <h3 className="text-4xl font-bold mt-6">{label}</h3>
              <p className="mt-6">Scroll, swipe or use the controls.</p>
            </HDS.SpotlightCard>
          ))}
        </HDS.Carousel>
      );
    case "section-heading":
      return (
        <HDS.SectionHeading
          number="02"
          label="The design system"
          title="Designed, down to the details."
          description="Numbered overline. Confident display type. Clear hierarchy."
        />
      );
    case "arrow-link":
      return (
        <div className="p-12 text-2xl">
          <HDS.ArrowLink href="#hds-arrow-link">
            Explore the project
          </HDS.ArrowLink>
        </div>
      );
    case "theme-tokens":
      return (
        <div className="grid grid-cols-2 gap-4">
          {[
            "page",
            "surface",
            "ink",
            "muted",
            "line",
            "soft",
            "accent-ink",
            "accent",
          ].map((token) => (
            <div key={token} className="border border-(--line) rounded-xl p-4">
              <div
                className="h-12 rounded"
                style={{ background: `var(--${token})` }}
              />
              <p className="mt-2 text-sm">--{token}</p>
            </div>
          ))}
        </div>
      );
    case "contribution-heatmap":
      return (
        <div className="p-6 rounded-xl bg-(--soft)">
          <h3 className="text-3xl font-bold mb-6">A year of making.</h3>
          <HDS.ContributionHeatmap
            weeks={Array.from({ length: 52 }, (_, x) =>
              Array.from({ length: 7 }, (_, y) => (x * 7 + y * 3) % 5),
            )}
          />
          <p className="mt-4 text-(--muted)">
            Synthetic activity fixture · five violet levels
          </p>
        </div>
      );
    case "product-system":
      return <HDS.ProductSystem />;
    case "chat-demo":
      return <HDS.ChatAssistantDemo />;
    case "dashboard-demo":
      return <HDS.DashboardDemo />;
    case "ui-primitives":
      return (
        <div className="space-y-6">
          <div className="flex gap-3">
            <HDS.Button>Primary action</HDS.Button>
            <HDS.Button variant="outline">Secondary</HDS.Button>
            <HDS.Badge>Active</HDS.Badge>
          </div>
          <div>
            <HDS.Label htmlFor="sample-name">Project name</HDS.Label>
            <HDS.Input
              id="sample-name"
              placeholder="A thoughtful project"
              className="mt-2"
            />
          </div>
          <HDS.Dialog>
            <HDS.DialogTrigger asChild>
              <HDS.Button variant="secondary">Open dialog</HDS.Button>
            </HDS.DialogTrigger>
            <HDS.DialogContent>
              <HDS.DialogHeader>
                <HDS.DialogTitle>Designed controls</HDS.DialogTitle>
                <HDS.DialogDescription>
                  Keyboard focus stays within the dialog. Escape closes it.
                </HDS.DialogDescription>
              </HDS.DialogHeader>
            </HDS.DialogContent>
          </HDS.Dialog>
        </div>
      );
    default:
      return null;
  }
}
function App() {
  const [search, setSearch] = useState("");
  const selected = new URLSearchParams(location.search).get("component");
  const entries = catalog.filter(
    (entry) =>
      (!selected || entry.name === selected) &&
      `${entry.name} ${entry.title} ${entry.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <main className="gallery-shell">
      <header className="gallery-header">
        <div>
          <a
            className="text-sm tracking-widest font-bold text-(--accent-ink)"
            href="/"
          >
            HUSSAM DESIGN SYSTEM
          </a>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight">
            A library of details.
          </h1>
          <p className="mt-4 text-(--muted)">
            32 effects, components and reusable Codex skills.
          </p>
        </div>
        <HDS.ThemeToggle />
      </header>
      {!selected && (
        <input
          className="input w-full mb-10"
          aria-label="Search components"
          placeholder="Search effects, names or descriptions…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      )}
      {entries.map((entry) => (
        <section key={entry.name} id={entry.name} className="catalog-entry">
          <div className="entry-meta">
            <span className="text-xs uppercase tracking-widest text-(--accent-ink)">
              {entry.status}
            </span>
            <h2 className="text-2xl font-bold mt-2">{entry.title}</h2>
            <code className="block my-3 text-sm text-(--accent-ink)">
              ${entry.name}
            </code>
            <p className="text-(--muted)">{entry.description}</p>
            <p className="mt-4 text-xs text-(--muted)">{entry.notes}</p>
            <a
              className="hds-arrow-link mt-3 text-sm"
              href={`https://github.com/Hussam-22/hussam-design-system/tree/main/skills/${entry.name}`}
            >
              Read skill →
            </a>
          </div>
          <div data-preview={entry.name} className="component-preview">
            <Preview name={entry.name} />
          </div>
        </section>
      ))}
      <footer className="py-10 text-sm text-(--muted)">
        Component source and skills ·{" "}
        <a href="https://github.com/Hussam-22/hussam-design-system">
          Hussam-22/hussam-design-system
        </a>
      </footer>
    </main>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
