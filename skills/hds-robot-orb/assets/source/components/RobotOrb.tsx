import { useEffect, useRef } from "react";
import { useMotion } from "../motion/useMotion";
import fallback from "../assets/pearl-robot-face.svg";
export default function RobotOrb({
  label = "White spherical robot with softly glowing eyes",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const allowed = useMotion();
  useEffect(() => {
    const host = ref.current;
    if (!host || !allowed) return;
    let alive = true;
    let dispose: (() => void) | undefined;
    let loading = false;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries.some((e) => e.isIntersecting) || loading || dispose)
          return;
        loading = true;
        try {
          const { mountRobotOrb } = await import("../motion/robot-orb");
          if (alive) dispose = mountRobotOrb(host);
        } catch {
          host.removeAttribute("data-ready");
        } finally {
          loading = false;
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);
    return () => {
      alive = false;
      observer.disconnect();
      dispose?.();
    };
  }, [allowed]);
  return (
    <div
      ref={ref}
      className={`hds-orb ${className}`}
      role="img"
      aria-label={label}
    >
      <img src={fallback} width="600" height="600" alt="" />
      <canvas aria-hidden="true" />
    </div>
  );
}
