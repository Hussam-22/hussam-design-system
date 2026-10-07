const DURATION = 13_000;
const RETURN_START = 10_600;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/** Move the authored vector artwork with native animations, without texture uploads. */
export function mountDesignBrowser(host: HTMLElement): () => void {
  const reduced =
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.dataset.motion === "reduce";
  if (reduced) {
    host.dataset.ready = "true";
    host.dataset.stage = "polished";
    return () => {
      host.removeAttribute("data-ready");
      host.removeAttribute("data-stage");
    };
  }

  const animations: Animation[] = [];
  function animate(
    element: SVGElement,
    from: Keyframe,
    to: Keyframe,
    start = 2100,
    end = 4900,
    returnEnd = 12_400,
  ) {
    const animation = element.animate(
      [
        { ...from, offset: 0 },
        { ...from, offset: start / DURATION, easing: EASING },
        { ...to, offset: end / DURATION },
        { ...to, offset: RETURN_START / DURATION, easing: EASING },
        { ...from, offset: returnEnd / DURATION },
        { ...from, offset: 1 },
      ],
      { duration: DURATION, iterations: Infinity, fill: "both" },
    );
    animation.pause();
    animation.currentTime = 0;
    animations.push(animation);
  }
  function move(selector: string, from: string, to: string) {
    host
      .querySelectorAll<SVGElement>(selector)
      .forEach((element) =>
        animate(element, { transform: from }, { transform: to }),
      );
  }
  move(
    "[data-browser-title]",
    "translate(600px, 197px) scale(0.605263)",
    "translate(68px, 215px) scale(1)",
  );
  move(
    "[data-browser-summary-a]",
    "translate(429px, 235px) scale(1.036364, 1)",
    "translate(72px, 410px) scale(1, 1)",
  );
  move(
    "[data-browser-summary-b]",
    "translate(470px, 261px) scale(1.023622, 1)",
    "translate(72px, 434px) scale(1, 1)",
  );
  move(
    "[data-browser-button]",
    "translate(465px, 308px)",
    "translate(72px, 474px)",
  );
  move(
    "[data-browser-art]",
    "translate(68px, 391px) scale(2.273504, 0.307692)",
    "translate(660px, 128px) scale(1, 1)",
  );
  host
    .querySelectorAll<SVGElement>("[data-browser-card]")
    .forEach((element, i) => {
      const x = 68 + i * 366;
      animate(
        element,
        { transform: `translate(${x}px, 560px)` },
        { transform: `translate(${x}px, ${560 - i * 4}px)` },
      );
    });
  host
    .querySelectorAll<SVGElement>("[data-browser-reveal]")
    .forEach((element) =>
      animate(element, { opacity: 0 }, { opacity: 1 }, 3100, 6000, 11_800),
    );
  host
    .querySelectorAll<SVGElement>("[data-browser-plain]")
    .forEach((element) =>
      animate(element, { opacity: 1 }, { opacity: 0 }, 3100, 4900),
    );
  const phone = host.querySelector<SVGElement>("[data-browser-phone]");
  if (phone)
    animate(
      phone,
      { transform: "translateY(56.4px)" },
      { transform: "translateY(0px)" },
      3100,
      6000,
      11_800,
    );

  let visible = false;
  let stageTimer = 0;
  function syncStage() {
    window.clearTimeout(stageTimer);
    const time = Number(animations[0]?.currentTime ?? 0) % DURATION;
    host.dataset.stage =
      time >= 6000 && time < RETURN_START
        ? "polished"
        : time < 2100 || time >= 12_400
          ? "plain"
          : "transforming";
    if (visible && !document.hidden) {
      const next = [2100, 6000, RETURN_START, 12_400, DURATION].find(
        (t) => t > time,
      )!;
      stageTimer = window.setTimeout(syncStage, next - time + 16);
    }
  }
  function syncPlayback() {
    animations.forEach((animation) =>
      visible && !document.hidden ? animation.play() : animation.pause(),
    );
    host.dataset.playing = String(visible && !document.hidden);
    syncStage();
  }
  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    syncPlayback();
  });
  observer.observe(host);
  document.addEventListener("visibilitychange", syncPlayback);
  host.dataset.ready = "true";
  syncStage();
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", syncPlayback);
    window.clearTimeout(stageTimer);
    animations.forEach((animation) => animation.cancel());
    host.removeAttribute("data-ready");
    host.removeAttribute("data-stage");
    host.removeAttribute("data-playing");
  };
}
