import { useEffect, useState } from "react";
/** SSR starts static; respond to OS and site motion preferences. */
export function useMotion() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setAllowed(
        !media.matches && document.documentElement.dataset.motion !== "reduce",
      );
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    media.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, []);
  return allowed;
}
