import arabic from "./ar.json";

export type Locale = "en" | "ar";
const translations: Record<string, string> = arabic;

export function getLocale(url: URL): Locale {
  return /^\/ar(?:\/|$)/.test(url.pathname) ? "ar" : "en";
}

export function localizedPath(href: string, locale: Locale): string {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/assets/")
  )
    return href;
  const english = href.replace(/^\/ar(?=\/|$)/, "") || "/";
  return locale === "ar"
    ? `/ar${english.startsWith("/") ? english : `/${english}`}`
    : english;
}

export function useTranslations(url: URL | Locale) {
  const locale = typeof url === "string" ? url : getLocale(url);
  function t(
    text: string | number | null | undefined,
    values: Record<string, string | number> = {},
  ): string {
    if (text == null) return "";
    const original = String(text);
    const translated =
      locale === "ar"
        ? (translations[original.replace(/\s+/g, " ").trim()] ?? original)
        : original;
    return translated.replace(/\{(\w+)\}/g, (placeholder, key) =>
      values[key] == null ? placeholder : String(values[key]),
    );
  }
  return { locale, t, path: (href: string) => localizedPath(href, locale) };
}
