export default function ContactSketch({
  animated = true,
  compact = false,
  className = "",
}: {
  animated?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`hds-sketch ${className}`}
      data-animated={animated}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 340" fill="none">
        <g
          className="text-(--accent-ink) opacity-[0.45]"
          data-ui="sketch-halo"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M37 176C18 83 95 12 206 20s164 92 145 183-117 132-207 104" />
          <path d="M60 79C139 9 278 30 331 103M342 257c-72 83-206 69-266-11" />
          <path d="M26 51h18m-9-9v18M349 86h16m-8-8v16M338 305h20m-10-10v20" />
        </g>
        <g
          data-ui="sketch-shell"
          stroke="currentColor"
          strokeWidth={compact ? 4 : 2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M65 152C65 80 115 47 197 47s139 45 139 119c0 83-55 128-138 128S65 237 65 152Z" />
          <path
            d="M73 149c-2-63 49-93 123-94 78-1 131 42 130 112 0 76-51 118-128 118-69 0-113-36-121-88"
            opacity=".35"
          />
          <path
            className="[fill:var(--soft)]"
            data-ui="sketch-visor"
            d="M105 105c28-26 117-27 157-1 22 15 27 89 2 109-30 24-119 24-151 3-26-17-32-88-8-111Z"
          />
          <path
            d="M112 112c26-20 110-25 142-3M117 221c43 20 97 18 137-5"
            opacity=".45"
          />
          <path d="M68 139c-17-7-25 0-24 20l3 27c1 12 9 17 22 12M335 146c15-5 23 3 20 22l-4 27c-2 10-10 15-20 10" />
          <path d="M174 266c13 5 28 5 41 0M190 47l-1-19m-8-4c4-9 18-9 21 0" />
        </g>
        <g data-ui="sketch-gaze">
          <g data-ui="sketch-eyes" fill="currentColor">
            <rect x="124" y="124" width="31" height="53" rx="15" />
            <rect x="207" y="119" width="31" height="53" rx="15" />
          </g>
        </g>
        <g stroke="currentColor" strokeLinecap="round" opacity=".25">
          <path d="m80 229 17 12m-10-23 20 15m-13-26 19 15M279 241l17-13m-11 21 15-12M252 65l20 10m-10-16 17 9" />
        </g>
      </svg>
    </div>
  );
}
