import { useTranslations, type Locale } from "../i18n/index";
import {
  ArrowRight,
  Check,
  FileText,
  Sparkles,
  MousePointer2,
  Plus,
  Users,
  Globe2,
  Layers,
  CircleCheck,
} from "lucide-react";
import "../styles/service-graphics.css";

export type GraphicKind =
  "website" | "redesign" | "assistant" | "dashboard" | "product";

export default function ServiceGraphic({
  kind,
  locale = "en",
}: {
  kind: GraphicKind;
  locale?: Locale;
}) {
  const { t } = useTranslations(locale);
  return (
    <div
      className={`relative h-52 w-full overflow-hidden isolate rounded-xl [background:var(--page)] [border-top-width:1px] [border-top-style:solid] border-t-(--line) [border-right-width:1px] [border-right-style:solid] border-r-(--line) [border-bottom-width:1px] [border-bottom-style:solid] border-b-(--line) [border-left-width:1px] [border-left-style:solid] border-l-(--line) [--graphic-surface:var(--surface)] [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 [&::before]:[background:radial-gradient(ellipse_at_60%_60%,#af74da20,transparent_70%)] [@media((max-width:_768px))]:h-52.5 [@media((max-width:_600px))]:h-57.5 [@media((prefers-reduced-motion:_reduce))]:**:[transition:none] [[data-motion='reduce']_&_*]:[transition:none]`}
      data-ui={`service-graphic graphic-${kind}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.28] bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse,#000_10%,transparent_70%)]"
        data-ui="graphic-grid"
      />
      {kind === "website" && (
        <>
          <div
            className="absolute w-[83%] top-5 left-[7%] rounded-[7px] [background:var(--graphic-surface)] [box-shadow:0_10px_24px_#0003] transform-[rotate(-3deg)] [transition:transform_0.5s] max-[600px]:top-7.25 border border-solid border-(--line)"
            data-ui="mini-browser"
          >
            <div
              className="flex items-center gap-0.75 [border-bottom-width:1px] [border-bottom-style:solid] border-b-(--line) h-5.25 pt-0 pr-2 pb-0 pl-2 [&_i]:w-1 [&_i]:h-1 [&_i]:[background:var(--muted)] [&_i]:opacity-[0.6] [&_i]:rounded-[50%] [&_span]:ml-2 [&_span]:text-[7px] [&_span]:text-(--muted)"
              data-ui="mini-chrome"
            >
              <i />
              <i />
              <i />
              <span>{t("yourbusiness.com")}</span>
            </div>
            <div
              className="grid grid-cols-[1.2fr_1fr] pt-3.25 pr-3.25 pb-3.25 pl-3.25 gap-1.75 [&_strong]:[font-family:var(--display)] [&_strong]:block [&_strong]:text-[20px] [&_strong]:leading-[1.03] [&_strong]:tracking-[-0.7px] [&_strong]:mt-2 [&_strong]:mr-0 [&_strong]:mb-2 [&_strong]:ml-0 max-[600px]:[&_strong]:text-[22px] max-[600px]:pt-3.25 max-[600px]:pb-3.25"
              data-ui="mini-site"
            >
              <div>
                <span
                  className="text-[6px] tracking-[1px] block text-(--muted)"
                  data-ui="mini-overline"
                >
                  {t("YOUR BUSINESS")}
                </span>
                <strong>
                  {locale === "ar" ? "انطباع" : t("A better")}
                  <br />
                  {locale === "ar" ? "أول أفضل." : t("first impression.")}
                </strong>
                <i
                  className="block h-0.75 w-[75%] [background:var(--line)] mb-3"
                  data-ui="mini-line"
                />
                <span
                  className="inline-flex gap-1.25 items-center rounded-[3px] [background:var(--accent-surface-gradient)] text-[#25152f] pt-1 pr-1.75 pb-1 pl-1.75 text-[7px]"
                  data-ui="mini-cta"
                >
                  {t("Let’s talk")} <ArrowRight size={11} />
                </span>
              </div>
              <div
                className="relative [background:linear-gradient(150deg,#b697fa,#efa1d0,#ffc293)] rounded-[3px] overflow-hidden [&_div]:absolute [&_div]:rounded-[50%] [&_div]:w-17.5 [&_div]:h-27.5 [&_div]:top-0.75 [&_div]:left-0 [&_div]:transform-[rotate(35deg)] [&_div:nth-child(2)]:left-5.5 [&_div:nth-child(2)]:top-4.5 [&_div:nth-child(3)]:left-8.75 [&_div:nth-child(3)]:top-7.75 [&_div]:border [&_div]:border-solid [&_div]:border-[#ffffff70]"
                data-ui="mini-site-art"
              >
                <div />
                <div />
                <div />
              </div>
            </div>
          </div>
          <div
            className="absolute h-29.5 w-14.5 bottom-3.75 right-[8%] rounded-[11px] [background:#eee7f7] pt-2.5 pr-1.5 pb-2.5 pl-1.5 transform-[rotate(5deg)] [box-shadow:0_12px_25px_#0004] [transition:transform_0.5s] [&_>_span]:block [&_>_span]:[background:#4c3b57] [&_>_span]:w-4.25 [&_>_span]:h-1 [&_>_span]:rounded-[5px] [&_>_span]:-mt-1.5 [&_>_span]:mr-auto [&_>_span]:mb-2.5 [&_>_span]:ml-auto [&_>_div]:h-10.75 [&_>_div]:rounded-[3px] [&_>_div]:[background:var(--accent-surface-gradient)] [&_>_i]:block [&_>_i]:h-0.75 [&_>_i]:[background:#b9a6c9] [&_>_i]:mt-1.75 [&_>_b]:block [&_>_b]:h-2.25 [&_>_b]:[background:#493153] [&_>_b]:rounded-xs [&_>_b]:mt-2.25 max-[600px]:bottom-4.25 border-[3px] border-solid border-[#4c3b57]"
            data-ui="mini-phone"
          >
            <span />
            <div />
            <i />
            <i />
            <b />
          </div>
          <MousePointer2
            className="absolute text-(--accent-ink) bottom-6.25 left-[37%] filter-[drop-shadow(0_3px_8px_#0006)] [transition:transform_0.5s]"
            data-ui="graphic-pointer"
            size={24}
          />
        </>
      )}
      {kind === "redesign" && (
        <div
          className="absolute inset-[25px_16px] grid grid-cols-[1fr_28px_1fr] items-center gap-1.75 max-[600px]:inset-[29px_19px]"
          data-ui="mini-redesign"
        >
          <div
            className="h-38 pt-3.5 pr-2.5 pb-3.5 pl-2.5 rounded-md [background:var(--surface)] [box-shadow:0_12px_30px_#0002] [transition:transform_0.5s] transform-[rotate(-5deg)] opacity-[0.7] [&_>_span]:block [&_>_span]:text-(--muted) [&_>_span]:uppercase [&_>_span]:text-[8px] [&_>_span]:tracking-widest [&_>_span]:mb-3 [&_>_div]:h-4.75 [&_>_div]:[background:var(--line)] [&_>_div]:mb-1.75 [&_>_i]:block [&_>_i]:h-1.25 [&_>_i]:[background:var(--line)] [&_>_i]:mb-1.25 [&_>_i]:w-[85%] [&_>_b]:inline-block [&_>_b]:w-[42%] [&_>_b]:h-9.5 [&_>_b]:[background:var(--line)] [&_>_b]:mt-1 [&_>_b]:mr-0.5 [&_>_b]:mb-1 [&_>_b]:ml-0.5 border border-solid border-(--line)"
            data-ui="mini-old"
          >
            <span>{t("Before")}</span>
            <div />
            <i />
            <i />
            <i />
            <b />
            <b />
          </div>
          <div
            className="grid place-items-center text-(--accent-ink)"
            data-ui="mini-upgrade"
          >
            <ArrowRight size={20} />
          </div>
          <div
            className="h-38 pt-3.5 pr-2.5 pb-3.5 pl-2.5 rounded-md [background:var(--surface)] [box-shadow:0_12px_30px_#0002] [transition:transform_0.5s] transform-[rotate(4deg)] [&_>_span]:block [&_>_span]:text-(--muted) [&_>_span]:uppercase [&_>_span]:text-[8px] [&_>_span]:tracking-widest [&_>_span]:mb-3 [&_strong]:[font-family:var(--display)] [&_strong]:text-[23px] [&_strong]:leading-[0.97] [&_strong]:block [&_strong]:tracking-[-1px] [&_>_div]:h-6.25 [&_>_div]:rounded-[3px] [&_>_div]:[background:var(--accent-surface-gradient)] [&_>_div]:mt-2.5 [&_>_b]:block [&_>_b]:w-[40%] [&_>_b]:h-1.5 [&_>_b]:[background:var(--muted)] [&_>_b]:rounded-xs [&_>_b]:mt-2.25 border border-solid border-(--line)"
            data-ui="mini-new"
          >
            <span>{t("After")}</span>
            <strong>
              {t("Clear.")}
              <br />
              {t("Confident.")}
            </strong>
            <div />
            <b />
          </div>
        </div>
      )}
      {kind === "assistant" && (
        <>
          <div
            className="absolute top-5.5 left-4.25 flex flex-col gap-1.75 transform-[rotate(-4deg)] [transition:transform_0.5s] [&_span]:flex [&_span]:items-center [&_span]:gap-2 [&_span]:rounded-[5px] [&_span]:[background:var(--surface)] [&_span]:pt-1.75 [&_span]:pr-2.5 [&_span]:pb-1.75 [&_span]:pl-2.5 [&_span]:text-(--muted) [&_span]:text-[10px] [&_svg]:text-(--accent-ink) max-[600px]:top-7.5 [&_span]:border [&_span]:border-solid [&_span]:border-(--line)"
            data-ui="mini-docs"
          >
            <span>
              <FileText size={16} /> {t("Policies")}
            </span>
            <span>
              <FileText size={16} /> {t("Company guide")}
            </span>
          </div>
          <div
            className="absolute left-[15%] right-[6%] bottom-5.5 rounded-lg [background:var(--surface)] pt-3 pr-3 pb-3 pl-3 [box-shadow:0_12px_25px_#0003] transform-[rotate(2deg)] [transition:transform_0.5s] [&_>_span]:flex [&_>_span]:gap-1.5 [&_>_span]:items-center [&_>_span]:text-[9px] [&_>_span]:text-(--accent-ink) [&_>_span]:mb-2.25 [&_strong]:text-[11px] [&_strong]:font-semibold [&_>_i]:block [&_>_i]:h-0.75 [&_>_i]:[background:var(--line)] [&_>_i]:mt-1.5 [&_>_i]:w-[92%] [&_>_i:nth-last-child(2)]:w-[65%] [&_small]:flex [&_small]:items-center [&_small]:gap-1.25 [&_small]:text-[8px] [&_small]:text-(--accent-ink) [&_small]:mt-2.25 max-[600px]:bottom-6.75 border border-solid border-[color-mix(in_srgb,var(--accent-violet)_50%,var(--line))]"
            data-ui="mini-chat"
          >
            <span>
              <Sparkles size={15} /> {t("Your knowledge assistant")}
            </span>
            <strong>{t("Here’s what you need to know.")}</strong>
            <i />
            <i />
            <small>
              <Check size={12} /> {t("Source: your company guide")}
            </small>
          </div>
          <span
            className="absolute right-[19%] top-5.5 h-7.5 w-7.5 rounded-[50%] border border-dashed border-(--accent-violet)"
            data-ui="mini-connection"
          />
        </>
      )}
      {kind === "dashboard" && (
        <div
          className="absolute top-5.25 left-[12%] w-[76%] pt-3 pr-3 pb-3 pl-3 h-42.25 rounded-lg [background:var(--surface)] [box-shadow:0_16px_40px_#0002] max-[600px]:h-45 max-[600px]:top-6.25 max-[600px]:left-[7%] max-[600px]:w-[86%] border border-solid border-(--line)"
          data-ui="mini-dashboard"
        >
          <div
            className="flex justify-between items-center text-(--accent-ink) [&_>_span]:flex [&_>_span]:gap-1.25 [&_>_span]:items-center [&_>_span]:text-[8px]"
            data-ui="mini-dashboard-head"
          >
            <span>
              <Layers size={13} /> {t("YOUR WORKSPACE")}
            </span>
            <Plus size={16} />
          </div>
          <div
            className="flex gap-1.75 mt-2.5 [&_>_span]:rounded-sm [&_>_span]:flex-1 [&_>_span]:pt-1.75 [&_>_span]:pr-1.75 [&_>_span]:pb-1.75 [&_>_span]:pl-1.75 [&_i]:block [&_i]:h-0.75 [&_i]:w-[65%] [&_i]:[background:var(--line)] [&_b]:block [&_b]:h-1.75 [&_b]:w-[40%] [&_b]:[background:var(--accent-violet)] [&_b]:mt-1.5 [&_b]:rounded-xs max-[600px]:mt-3.5 [&_>_span]:border [&_>_span]:border-solid [&_>_span]:border-(--line)"
            data-ui="mini-stats"
          >
            <span>
              <i />
              <b />
            </span>
            <span>
              <i />
              <b />
            </span>
            <span>
              <i />
              <b />
            </span>
          </div>
          <div
            className="flex flex-col gap-1.25 mt-2.25 [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-1.25 [&_>_span]:text-[9px] [&_>_span]:text-(--muted) [&_b]:font-medium [&_b]:text-[7px] [&_b]:pt-0.5 [&_b]:pr-1.25 [&_b]:pb-0.5 [&_b]:pl-1.25 [&_b]:rounded-[3px] [&_b]:ml-auto [&_b]:text-(--accent-ink) max-[600px]:mt-3 max-[600px]:gap-2 [&_b]:border [&_b]:border-solid [&_b]:border-(--line)"
            data-ui="mini-tasks"
          >
            <span>
              <CircleCheck size={12} /> {t("Customer enquiry")}{" "}
              <b>{t("New")}</b>
            </span>
            <span>
              <CircleCheck size={12} /> {t("Team project")} <b>{t("Active")}</b>
            </span>
          </div>
          <div
            className="absolute flex gap-1.5 h-6.5 left-3 right-3 bottom-2.5 items-end opacity-[0.7] [&_i]:flex-1 [&_i]:[background:var(--accent-surface-gradient)] [&_i]:rounded-[2px_2px_0_0] [&_i]:origin-bottom [&_i]:[transition:transform_0.5s]"
            data-ui="mini-bars"
          >
            {[36, 56, 44, 70, 58, 86, 74].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      )}
      {kind === "product" && (
        <div
          className="absolute inset-[13px_10%] max-[600px]:inset-[22px_6%]"
          data-ui="mini-product"
        >
          <div
            className="absolute w-61.25 h-35 rounded-[50%] top-5.5 left-[50%] transform-[translateX(-50%)_rotate(-12deg)] border border-solid border-(--line)"
            data-ui="product-orbit"
          />
          <span
            className="grid place-items-center absolute w-10.75 h-10.75 [background:var(--surface)] rounded-[11px] text-(--accent-ink) [box-shadow:0_8px_20px_#0002] [transition:transform_0.5s] top-2.5 left-[7%] border border-solid border-(--line)"
            data-ui="product-node product-node-one"
          >
            <Users size={20} />
          </span>
          <span
            className="grid place-items-center absolute w-10.75 h-10.75 [background:var(--surface)] rounded-[11px] text-(--accent-ink) [box-shadow:0_8px_20px_#0002] [transition:transform_0.5s] top-9.25 right-[1%] border border-solid border-(--line)"
            data-ui="product-node product-node-two"
          >
            <Globe2 size={20} />
          </span>
          <span
            className="grid place-items-center absolute w-10.75 h-10.75 [background:var(--surface)] rounded-[11px] text-(--accent-ink) [box-shadow:0_8px_20px_#0002] [transition:transform_0.5s] bottom-1.5 left-[14%] border border-solid border-(--line)"
            data-ui="product-node product-node-three"
          >
            <Check size={20} />
          </span>
          <div
            className="flex items-center flex-col justify-center absolute top-8.75 bottom-6.25 left-[25%] right-[25%] rounded-xl [background:linear-gradient(150deg,var(--surface),var(--soft))] [box-shadow:0_10px_40px_#b06fd42b] [&_>_svg]:text-(--accent-ink) [&_>_svg]:mb-2 [&_strong]:text-[15px] [&_strong]:font-semibold [&_>_span]:text-[9px] [&_>_span]:mt-1.25 [&_>_span]:text-(--muted) max-[600px]:left-[22%] max-[600px]:right-[22%] border border-solid border-(--line)"
            data-ui="product-core"
          >
            <Layers size={27} />
            <strong>{t("Your product")}</strong>
            <span>{t("One idea. Many users.")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
