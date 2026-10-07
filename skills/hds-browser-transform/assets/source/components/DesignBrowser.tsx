import { useEffect, useRef, useId } from "react";
import { useTranslations, type Locale } from "../i18n/index";
import { useMotion } from "../motion/useMotion";
import { mountDesignBrowser } from "../motion/design-browser";

export default function DesignBrowser({ locale = "en" }: { locale?: Locale }) {
  const { t } = useTranslations(locale);
  const host = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const allowed = useMotion();
  useEffect(
    () =>
      host.current && allowed ? mountDesignBrowser(host.current) : undefined,
    [allowed],
  );
  const arabic = locale === "ar";
  const heroLines = arabic
    ? ["انطباع", "أول", "أفضل."]
    : ["A better", "first", "impression."];
  return (
    <div
      ref={host}
      className="hds-design-browser"
      data-ui="design-browser"
      aria-hidden="true"
    >
      <svg
        className="browser-artwork"
        viewBox={arabic ? "-67.8 -28 1296 756" : "-28.2 -28 1296 756"}
      >
        <defs>
          <linearGradient
            id={uid + "-belief-browser-accent"}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="271.44"
            y2="338"
          >
            <stop stopColor="#b697fa" />
            <stop offset=".52" stopColor="#efa1d0" />
            <stop offset="1" stopColor="#ffc293" />
          </linearGradient>
          <linearGradient
            id={uid + "-belief-button-accent"}
            href={"#" + uid + "-belief-browser-accent"}
            x2="154.28"
            y2="48"
          />
          <linearGradient
            id={uid + "-belief-card-accent"}
            href={"#" + uid + "-belief-browser-accent"}
            x2="42.92"
            y2="57"
          />
          <linearGradient
            id={uid + "-belief-phone-accent"}
            href={"#" + uid + "-belief-browser-accent"}
            x1="33"
            y1="90"
            x2="245"
            y2="320"
          />
          <clipPath id={uid + "-belief-browser-screen"}>
            <rect x="3" y="3" width="1194" height="694" rx="22" />
          </clipPath>
        </defs>
        <g transform={arabic ? "translate(1200 0) scale(-1 1)" : undefined}>
          <rect
            x="2"
            y="2"
            width="1196"
            height="696"
            rx="24"
            fill="var(--surface)"
            stroke="var(--line)"
            strokeWidth="3"
          />
          <g clipPath={`url(#${uid}-belief-browser-screen)`}>
            <path d="M0 68h1200" stroke="var(--line)" strokeWidth="3" />
            <g fill="var(--muted)" opacity=".6">
              <circle cx="30" cy="34" r="5" />
              <circle cx="50" cy="34" r="5" />
              <circle cx="70" cy="34" r="5" />
            </g>
            <text
              x="108"
              y="41"
              fontFamily="var(--body)"
              fontSize="18"
              fill="var(--muted)"
              transform={arabic ? "translate(216 0) scale(-1 1)" : undefined}
              textAnchor={arabic ? "end" : undefined}
            >
              {t("yourbusiness.com")}
            </text>
            <g fill="var(--line)">
              <rect
                x="68"
                y="94"
                width="76"
                height="8"
                rx="4"
                fill="var(--muted)"
              />
              <rect x="888" y="92" width="57" height="7" rx="3.5" />
              <rect x="972" y="92" width="71" height="7" rx="3.5" />
              <rect x="1070" y="92" width="57" height="7" rx="3.5" />
              <rect
                x="72"
                y="133"
                width="162"
                height="7"
                rx="3.5"
                fill="var(--muted)"
                data-browser-reveal=""
              />
            </g>
            <g transform="translate(600 197)" opacity="0" data-browser-plain="">
              <text
                textAnchor="middle"
                fontFamily={arabic ? "var(--display)" : "Arial, sans-serif"}
                fontSize="46"
                fill="var(--muted)"
                transform={arabic ? "scale(-1 1)" : undefined}
                direction={arabic ? "rtl" : "ltr"}
              >
                {heroLines.join(" ")}
              </text>
            </g>
            <g
              transform="translate(68 215)"
              data-browser-title=""
              data-browser-reveal=""
            >
              <g
                fontFamily="var(--display)"
                fontWeight={arabic ? 700 : 750}
                fontSize="76"
                fill="var(--ink)"
                transform={arabic ? "scale(-1 1)" : undefined}
                direction={arabic ? "rtl" : "ltr"}
                textAnchor="start"
              >
                {heroLines.map((line, i) => (
                  <text key={i} y={i * 81}>
                    {line}
                  </text>
                ))}
              </g>
            </g>
            <g fill="var(--line)">
              <g transform="translate(72 410)" data-browser-summary-a="">
                <rect width="330" height="9" rx="4.5" />
              </g>
              <g transform="translate(72 434)" data-browser-summary-b="">
                <rect width="254" height="9" rx="4.5" />
              </g>
            </g>
            <g transform="translate(72 474)" data-browser-button="">
              <rect
                width="266"
                height="48"
                rx="2"
                fill="var(--line)"
                opacity="0"
                data-browser-plain=""
              />
              <g data-browser-reveal="">
                <rect
                  width="266"
                  height="48"
                  rx="8"
                  fill={`url(#${uid}-belief-button-accent)`}
                />
                <rect
                  x="25"
                  y="20"
                  width="132"
                  height="9"
                  rx="4.5"
                  fill="#25152f"
                />
                <path
                  d="m210 31 16-16m-16 0h16v16"
                  stroke="#25152f"
                  strokeWidth="3"
                  fill="none"
                />
              </g>
            </g>
            <g transform="translate(660 128)" data-browser-art="">
              <rect
                width="468"
                height="338"
                rx="12"
                fill="var(--soft)"
                stroke="var(--line)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <g data-browser-reveal="">
                <rect
                  width="468"
                  height="338"
                  rx="12"
                  fill={`url(#${uid}-belief-browser-accent)`}
                />
                <g
                  transform="translate(70.2 57.46)"
                  fill="#ffffff16"
                  stroke="#ffffff70"
                  strokeWidth="3"
                >
                  <rect width="324" height="230" rx="10" />
                  <path d="M0 27h324" strokeWidth="2" />
                  <g fill="#ffffffaa" stroke="none">
                    <circle cx="14" cy="14" r="2" />
                    <circle cx="24" cy="14" r="2" />
                    <circle cx="34" cy="14" r="2" />
                    <rect
                      x="21"
                      y="52"
                      width="109"
                      height="10"
                      rx="5"
                      fill="#ffffffb3"
                    />
                    <rect
                      x="21"
                      y="75"
                      width="128"
                      height="7"
                      rx="3.5"
                      fill="#ffffff70"
                    />
                    <rect
                      x="21"
                      y="94"
                      width="84"
                      height="7"
                      rx="3.5"
                      fill="#ffffff70"
                    />
                    <rect
                      x="21"
                      y="119"
                      width="70"
                      height="18"
                      rx="3"
                      fill="#ffffff70"
                    />
                  </g>
                  <rect
                    x="179"
                    y="49"
                    width="124"
                    height="95"
                    rx="5"
                    fill="#ffffff20"
                  />
                  {[0, 1, 2].map((i) => (
                    <g key={i}>
                      <rect
                        x={21 + i * 96}
                        y="165"
                        width="89"
                        height="43"
                        rx="4"
                        fill="none"
                      />
                      <rect
                        x={32 + i * 96}
                        y="180"
                        width="56"
                        height="5"
                        rx="2.5"
                        fill="#ffffffaa"
                        stroke="none"
                      />
                      <rect
                        x={32 + i * 96}
                        y="193"
                        width="39"
                        height="4"
                        rx="2"
                        fill="#ffffff70"
                        stroke="none"
                      />
                    </g>
                  ))}
                </g>
              </g>
            </g>
            {[0, 1, 2].map((i) => (
              <g
                key={i}
                transform={`translate(${68 + i * 366} ${560 - i * 4})`}
                data-browser-card=""
              >
                <rect
                  width="338"
                  height="94"
                  rx="10"
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="3"
                />
                <rect
                  x="16"
                  y="18"
                  width="74"
                  height="57"
                  rx="5"
                  fill="var(--soft)"
                />
                <rect
                  x="16"
                  y="18"
                  width="74"
                  height="57"
                  rx="5"
                  fill={`url(#${uid}-belief-card-accent)`}
                  data-browser-reveal=""
                />
                <rect
                  x="111"
                  y="28"
                  width="166"
                  height="10"
                  rx="5"
                  fill="var(--ink)"
                  opacity=".6"
                />
                <g fill="var(--line)">
                  <rect x="111" y="51" width="143" height="7" rx="3.5" />
                  <rect x="111" y="66" width="104" height="7" rx="3.5" />
                </g>
              </g>
            ))}
          </g>
          <g transform="translate(973.2 83.6)">
            <g data-browser-phone="" data-browser-reveal="">
              <svg width="266.4" height="552" viewBox="0 0 280 580">
                <rect width="280" height="580" rx="52" fill="#4c3b57" />
                <rect
                  x="14"
                  y="14"
                  width="252"
                  height="552"
                  rx="40"
                  fill="#eee7f7"
                />
                <rect
                  x="95"
                  y="32"
                  width="90"
                  height="15"
                  rx="7"
                  fill="#4c3b57"
                />
                <rect
                  x="33"
                  y="90"
                  width="214"
                  height="235"
                  rx="10"
                  fill={`url(#${uid}-belief-phone-accent)`}
                />
                <g fill="#b9a6c9">
                  <rect x="33" y="361" width="214" height="15" rx="2" />
                  <rect x="33" y="401" width="194" height="15" rx="2" />
                </g>
                <rect
                  x="33"
                  y="451"
                  width="214"
                  height="44"
                  rx="6"
                  fill="#493153"
                />
              </svg>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
