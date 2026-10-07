import { useRef, type HTMLAttributes, type CSSProperties } from "react";
export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: string;
}
/** Independent implementation; no ReactBits component source is bundled. */
export default function SpotlightCard({
  children,
  glow = "rgba(172,133,237,.24)",
  className = "",
  style,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      {...props}
      ref={ref}
      className={`hds-spotlight ${className}`}
      style={{ "--hds-glow": glow, ...style } as CSSProperties}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (
          !ref.current ||
          event.pointerType === "touch" ||
          matchMedia("(prefers-reduced-motion: reduce)").matches ||
          document.documentElement.dataset.motion === "reduce"
        )
          return;
        const bounds = ref.current.getBoundingClientRect();
        ref.current.style.setProperty(
          "--hds-x",
          `${event.clientX - bounds.left}px`,
        );
        ref.current.style.setProperty(
          "--hds-y",
          `${event.clientY - bounds.top}px`,
        );
      }}
    >
      {children}
    </div>
  );
}
