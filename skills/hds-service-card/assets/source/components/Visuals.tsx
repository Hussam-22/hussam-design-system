import {
  type ReactNode,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { ArrowUpRight } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import ServiceGraphic, { type GraphicKind } from "./ServiceGraphic";
export function GradientText({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={`hds-gradient-text ${className}`}>
      {children}
    </span>
  );
}
export function GradientButton({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={`hds-gradient-button ${className}`}
    >
      {children}
      <ArrowUpRight aria-hidden="true" size={18} />
    </button>
  );
}
export function AmbientGlow({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`hds-ambient ${className}`}>
      {children}
    </div>
  );
}
export function GridSurface({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`hds-grid ${className}`}>
      {children}
    </div>
  );
}
export function ServiceCard({
  kind,
  title,
  description,
  href,
}: {
  kind: GraphicKind;
  title: string;
  description: string;
  href?: string;
}) {
  return (
    <SpotlightCard className="p-5" data-ui="service-card">
      <ServiceGraphic kind={kind} />
      <h3 className="mt-5 text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-(--muted)">{description}</p>
      {href && (
        <a className="hds-arrow-link mt-4" href={href}>
          Explore <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      )}
    </SpotlightCard>
  );
}
export function ArrowLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a className="hds-arrow-link" href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <div className="mb-4 flex gap-4 text-sm font-semibold tracking-[.08em] uppercase">
        <span className="text-(--muted)">{number}</span>
        {label}
      </div>
      <h2 className="font-display text-[clamp(32px,5vw,69px)] leading-[1.04] font-extrabold tracking-[-.045em]">
        {title}
      </h2>
      {description && <p className="mt-5 text-(--muted)">{description}</p>}
    </div>
  );
}
export function ProjectCard({
  title,
  category,
  image,
  alt,
  href,
}: {
  title: string;
  category: string;
  image: string;
  alt: string;
  href: string;
}) {
  return (
    <article className="hds-project">
      <a href={href} aria-label={`Explore ${title}`}>
        <div className="hds-project-image">
          <img src={image} alt={alt} loading="lazy" />
        </div>
        <p className="mt-3 text-xs uppercase tracking-widest text-(--muted)">
          {category}
        </p>
        <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      </a>
    </article>
  );
}
export function BrowserFrame({
  children,
  label = "Browser preview",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="hds-desktop" role="group" aria-label={label}>
      <div className="hds-chrome" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      {children}
    </div>
  );
}
export function PhoneFrame({
  children,
  label = "Phone preview",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="hds-phone" role="group" aria-label={label}>
      <div className="hds-phone-screen">{children}</div>
    </div>
  );
}
