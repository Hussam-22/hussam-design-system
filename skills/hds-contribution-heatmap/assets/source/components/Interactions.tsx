import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { useMotion } from "../motion/useMotion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BrowserFrame, PhoneFrame } from "./Visuals";
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const allowed = useMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || !allowed) return;
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          animation = element.animate(
            [
              { opacity: 0, transform: "translateY(24px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 700,
              delay,
              easing: "cubic-bezier(.25,.46,.45,.94)",
              fill: "backwards",
            },
          );
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -7% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      animation?.cancel();
    };
  }, [allowed, delay]);
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
export function Carousel({
  children,
  label = "Items",
}: {
  children: ReactNode;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);
  const allowed = useMotion();
  function update() {
    const track = ref.current;
    if (!track) return;
    const origin =
      getComputedStyle(track).direction === "rtl"
        ? track.getBoundingClientRect().right
        : track.getBoundingClientRect().left;
    let best = 0,
      distance = Infinity;
    Array.from(track.children).forEach((slide, i) => {
      const box = slide.getBoundingClientRect();
      const d = Math.abs(
        (getComputedStyle(track).direction === "rtl" ? box.right : box.left) -
          origin,
      );
      if (d < distance) {
        best = i;
        distance = d;
      }
    });
    setIndex(best);
  }
  function step(amount: number) {
    const track = ref.current;
    const slide = track?.children[
      Math.min(count - 1, Math.max(0, index + amount))
    ] as HTMLElement | undefined;
    if (track && slide) {
      const rtl = getComputedStyle(track).direction === "rtl";
      const target = slide.getBoundingClientRect();
      const parent = track.getBoundingClientRect();
      track.scrollBy({
        left: rtl ? target.right - parent.right : target.left - parent.left,
        behavior: allowed ? "smooth" : "instant",
      });
    }
  }
  return (
    <section className="hds-carousel" aria-label={label}>
      <div ref={ref} className="hds-carousel-track" onScroll={update}>
        {children}
      </div>
      <div className="mt-5 flex gap-4 items-center">
        <button
          type="button"
          className="btn btn-circle btn-sm"
          aria-label="Previous item"
          disabled={index === 0}
          onClick={() => step(-1)}
        >
          <ArrowLeft size={18} />
        </button>
        <span aria-live="polite">
          {count ? index + 1 : 0} / {count}
        </span>
        <button
          type="button"
          className="btn btn-circle btn-sm"
          aria-label="Next item"
          disabled={index >= count - 1}
          onClick={() => step(1)}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
export interface ProcessStep {
  title: string;
  description: string;
}
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const allowed = useMotion();
  useEffect(() => {
    if (!allowed) return;
    let cleanup: (() => void) | undefined;
    let alive = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (!alive || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add(
          { desktop: "(min-width:769px)", mobile: "(max-width:768px)" },
          (ctx) => {
            gsap.from(progress.current, {
              scaleX: ctx.conditions?.desktop ? 0 : 1,
              scaleY: ctx.conditions?.mobile ? 0 : 1,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                end: "bottom 55%",
                scrub: 0.5,
              },
            });
          },
        );
        cleanup = () => media.revert();
      },
    );
    return () => {
      alive = false;
      cleanup?.();
    };
  }, [allowed]);
  return (
    <div ref={ref} className="hds-process">
      <div className="hds-process-track" aria-hidden="true">
        <div ref={progress} className="hds-process-progress" />
      </div>
      {steps.map((step, i) => (
        <article key={i}>
          <small className="text-(--muted)">
            {String(i + 1).padStart(2, "0")} /
          </small>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      ))}
    </div>
  );
}
export interface ComparisonImage {
  desktop: string;
  mobile: string;
  alt: string;
}
export function DeviceComparison({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: ComparisonImage;
  after: ComparisonImage;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [showAfter, setShowAfter] = useState(true);
  const image = showAfter ? after : before;
  return (
    <section aria-label="Website comparison">
      <div className="mb-5 flex gap-3">
        <button
          className="btn btn-sm"
          type="button"
          aria-pressed={!showAfter}
          onClick={() => setShowAfter(false)}
        >
          {beforeLabel}
        </button>
        <button
          className="btn btn-sm"
          type="button"
          aria-pressed={showAfter}
          onClick={() => setShowAfter(true)}
        >
          {afterLabel}
        </button>
      </div>
      <div className="hds-devices">
        <BrowserFrame>
          <img src={image.desktop} alt={`${image.alt}, desktop`} />
        </BrowserFrame>
        <PhoneFrame>
          <img src={image.mobile} alt={`${image.alt}, mobile`} />
        </PhoneFrame>
      </div>
    </section>
  );
}
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(
    () => setDark(document.documentElement.dataset.theme === "dark"),
    [],
  );
  return (
    <button
      type="button"
      className="btn btn-sm"
      aria-pressed={dark}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset.theme = next ? "dark" : "light";
        localStorage.setItem("hds-theme", next ? "dark" : "light");
      }}
    >
      {dark ? "Light theme" : "Dark theme"}
    </button>
  );
}
export function ContributionHeatmap({ weeks }: { weeks: number[][] }) {
  const tones = ["var(--line)", "#e6d4f5", "#c19be0", "#9461bc", "#613783"];
  return (
    <div role="img" aria-label="Activity heatmap" className="overflow-auto">
      <svg width={weeks.length * 13} height="92">
        {weeks.flatMap((days, x) =>
          days.map((level, y) => (
            <rect
              key={`${x}-${y}`}
              x={x * 13}
              y={y * 13}
              width="10"
              height="10"
              rx="2"
              fill={tones[Math.max(0, Math.min(4, level))]}
            >
              <title>{`Week ${x + 1}, day ${y + 1}: intensity ${level}`}</title>
            </rect>
          )),
        )}
      </svg>
    </div>
  );
}
