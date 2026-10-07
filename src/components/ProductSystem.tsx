import { useTranslations, type Locale } from "../i18n/index";
import {
  FileText,
  Layers,
  Users,
  Bell,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
export default function ProductSystem({ locale = "en" }: { locale?: Locale }) {
  const { t } = useTranslations(locale);
  return (
    <div
      className="relative pt-8.75 pr-8.75 pb-8.75 pl-8.75 rounded-[20px] [background:radial-gradient(ellipse_at_50%_50%,#ab71d52b,transparent_60%),var(--surface)] overflow-hidden max-[768px]:pt-6 max-[768px]:pr-6 max-[768px]:pb-6 max-[768px]:pl-6 border border-solid border-(--line)"
      data-ui="product-system"
      data-reveal=""
    >
      <p
        className="text-[12px] tracking-[0.07em] text-(--muted) mb-8.75 max-[600px]:mb-6.25 max-[600px]:text-[11px]"
        data-ui="system-caption"
      >
        {t("A PRODUCT BUILT AROUND YOUR BUSINESS")}
      </p>
      <div
        className="relative grid grid-cols-[1fr_1.25fr_1fr] gap-18.75 items-center min-h-67.5 max-[1100px]:gap-7.5 max-[768px]:grid-cols-[1fr] max-[768px]:gap-5.5"
        data-ui="system-architecture"
      >
        <div
          className="flex flex-col gap-4.25 z-1 max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:gap-3"
          data-ui="system-inputs"
        >
          <div
            className="[background:var(--page)] rounded-[10px] pt-4.5 pr-4.5 pb-4.5 pl-4.5 flex items-start flex-wrap gap-[8px_12px] [&_>_svg]:text-(--accent-ink) [&_>_svg]:shrink-0 [&_>_strong]:text-[15px] [&_>_strong]:font-[550] [&_>_strong]:flex-1 [&_>_span]:text-[13px] [&_>_span]:text-(--muted) [&_>_span]:ml-8.5 [&_>_span]:w-full max-[1100px]:pt-3.75 max-[1100px]:pr-3.75 max-[1100px]:pb-3.75 max-[1100px]:pl-3.75 max-[768px]:flex-col max-[768px]:items-start max-[768px]:pt-3.75 max-[768px]:pr-3.75 max-[768px]:pb-3.75 max-[768px]:pl-3.75 max-[768px]:[&_>_span]:mt-0 max-[768px]:[&_>_span]:mr-0 max-[768px]:[&_>_span]:mb-0 max-[768px]:[&_>_span]:ml-0 max-[768px]:[&_>_span]:text-[12px] max-[768px]:[&_>_strong]:text-[14px] border border-solid border-(--line)"
            data-ui="system-node"
          >
            <FileText size={22} />
            <strong>{t("Your information")}</strong>
            <span>{t("Content, records & rules")}</span>
          </div>
          <div
            className="[background:var(--page)] rounded-[10px] pt-4.5 pr-4.5 pb-4.5 pl-4.5 flex items-start flex-wrap gap-[8px_12px] [&_>_svg]:text-(--accent-ink) [&_>_svg]:shrink-0 [&_>_strong]:text-[15px] [&_>_strong]:font-[550] [&_>_strong]:flex-1 [&_>_span]:text-[13px] [&_>_span]:text-(--muted) [&_>_span]:ml-8.5 [&_>_span]:w-full max-[1100px]:pt-3.75 max-[1100px]:pr-3.75 max-[1100px]:pb-3.75 max-[1100px]:pl-3.75 max-[768px]:flex-col max-[768px]:items-start max-[768px]:pt-3.75 max-[768px]:pr-3.75 max-[768px]:pb-3.75 max-[768px]:pl-3.75 max-[768px]:[&_>_span]:mt-0 max-[768px]:[&_>_span]:mr-0 max-[768px]:[&_>_span]:mb-0 max-[768px]:[&_>_span]:ml-0 max-[768px]:[&_>_span]:text-[12px] max-[768px]:[&_>_strong]:text-[14px] border border-solid border-(--line)"
            data-ui="system-node"
          >
            <Users size={22} />
            <strong>{t("Your customers")}</strong>
            <span>{t("Accounts & everyday needs")}</span>
          </div>
        </div>
        <svg
          className="absolute inset-[10px_14%] w-[72%] h-[calc(100%-20px)] pointer-events-none [&_path]:fill-none [&_path]:stroke-(--line) [&_path]:stroke-[1.5] **:data-[ui~='connection-light']:stroke-(--accent-violet) **:data-[ui~='connection-light']:stroke-2 **:data-[ui~='connection-light']:[stroke-dasharray:10_16] max-[768px]:hidden"
          data-ui="system-connections"
          viewBox="0 0 640 250"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 60H75Q100 60 100 85V125H320M0 190H75Q100 190 100 165V125M320 125H480Q505 125 505 100V45H640M505 125H640M505 125V175Q505 200 530 200H640" />
          <path
            data-ui="connection-light"
            d="M0 60H75Q100 60 100 85V125H320M320 125H480Q505 125 505 100V45H640"
          />
        </svg>
        <div
          className="relative z-1 pt-6.5 pr-5 pb-6.5 pl-5 text-center [background:linear-gradient(145deg,var(--soft),var(--page))] rounded-[18px] [box-shadow:0_0_45px_#9f50d026] [&_>_span:first-child]:grid [&_>_span:first-child]:place-items-center [&_>_span:first-child]:h-16.25 [&_>_span:first-child]:w-16.25 [&_>_span:first-child]:mt-0 [&_>_span:first-child]:mr-auto [&_>_span:first-child]:mb-5 [&_>_span:first-child]:ml-auto [&_>_span:first-child]:rounded-[17px] [&_>_span:first-child]:[background:#ac85ed20] [&_>_span:first-child]:text-(--accent-ink) [&_>_strong]:text-[25px] [&_>_strong]:[font-family:var(--display)] [&_>_strong]:font-[580] [&_>_strong]:tracking-[-0.5px] [&_>_p]:text-(--muted) [&_>_p]:text-[15px] [&_>_p]:leading-[1.6] [&_>_p]:mt-3 [&_>_p]:mb-5 max-[768px]:max-w-90 max-[768px]:w-full max-[768px]:ml-auto max-[768px]:mr-auto max-[768px]:[&::before]:[content:''] max-[768px]:[&::before]:absolute max-[768px]:[&::before]:h-5.75 max-[768px]:[&::before]:w-px max-[768px]:[&::before]:[background:var(--accent-violet)] max-[768px]:[&::before]:left-[50%] max-[768px]:[&::before]:-top-5.75 max-[768px]:[&::after]:[content:''] max-[768px]:[&::after]:absolute max-[768px]:[&::after]:h-5.75 max-[768px]:[&::after]:w-px max-[768px]:[&::after]:[background:var(--accent-violet)] max-[768px]:[&::after]:left-[50%] max-[768px]:[&::after]:-bottom-5.75 border border-solid border-[#a879ce] [&_>_span:first-child]:border [&_>_span:first-child]:border-solid [&_>_span:first-child]:border-[#ac85ed70]"
          data-ui="system-core"
        >
          <span>
            <Layers size={32} />
          </span>
          <strong>{t("Your software product")}</strong>
          <p>{t("One place to serve your users.")}</p>
          <span
            className="text-[9px] tracking-widest text-(--accent-ink)"
            data-ui="system-core-label"
          >
            {t("BUILT FOR YOUR WORKFLOW")}
          </span>
        </div>
        <div
          className="flex flex-col gap-4.25 z-1 max-[768px]:grid max-[768px]:grid-cols-3 max-[768px]:gap-3 max-[600px]:grid-cols-[1fr] max-[600px]:**:data-[ui~='system-node']:flex-row max-[600px]:**:data-[ui~='system-node']:items-center"
          data-ui="system-outputs"
        >
          <div
            className="[background:var(--page)] rounded-[10px] pt-4.5 pr-4.5 pb-4.5 pl-4.5 flex items-start flex-wrap gap-[8px_12px] [&_>_svg]:text-(--accent-ink) [&_>_svg]:shrink-0 [&_>_strong]:text-[15px] [&_>_strong]:font-[550] [&_>_strong]:flex-1 [&_>_span]:text-[13px] [&_>_span]:text-(--muted) [&_>_span]:ml-8.5 [&_>_span]:w-full max-[1100px]:pt-3.75 max-[1100px]:pr-3.75 max-[1100px]:pb-3.75 max-[1100px]:pl-3.75 max-[768px]:flex-col max-[768px]:items-start max-[768px]:pt-3.75 max-[768px]:pr-3.75 max-[768px]:pb-3.75 max-[768px]:pl-3.75 max-[768px]:[&_>_span]:mt-0 max-[768px]:[&_>_span]:mr-0 max-[768px]:[&_>_span]:mb-0 max-[768px]:[&_>_span]:ml-0 max-[768px]:[&_>_span]:text-[12px] max-[768px]:[&_>_strong]:text-[14px] border border-solid border-(--line)"
            data-ui="system-node"
          >
            <Users size={20} />
            <strong>{t("Customer workspace")}</strong>
          </div>
          <div
            className="[background:var(--page)] rounded-[10px] pt-4.5 pr-4.5 pb-4.5 pl-4.5 flex items-start flex-wrap gap-[8px_12px] [&_>_svg]:text-(--accent-ink) [&_>_svg]:shrink-0 [&_>_strong]:text-[15px] [&_>_strong]:font-[550] [&_>_strong]:flex-1 [&_>_span]:text-[13px] [&_>_span]:text-(--muted) [&_>_span]:ml-8.5 [&_>_span]:w-full max-[1100px]:pt-3.75 max-[1100px]:pr-3.75 max-[1100px]:pb-3.75 max-[1100px]:pl-3.75 max-[768px]:flex-col max-[768px]:items-start max-[768px]:pt-3.75 max-[768px]:pr-3.75 max-[768px]:pb-3.75 max-[768px]:pl-3.75 max-[768px]:[&_>_span]:mt-0 max-[768px]:[&_>_span]:mr-0 max-[768px]:[&_>_span]:mb-0 max-[768px]:[&_>_span]:ml-0 max-[768px]:[&_>_span]:text-[12px] max-[768px]:[&_>_strong]:text-[14px] border border-solid border-(--line)"
            data-ui="system-node"
          >
            <Bell size={20} />
            <strong>{t("Useful updates")}</strong>
          </div>
          <div
            className="[background:var(--page)] rounded-[10px] pt-4.5 pr-4.5 pb-4.5 pl-4.5 flex items-start flex-wrap gap-[8px_12px] [&_>_svg]:text-(--accent-ink) [&_>_svg]:shrink-0 [&_>_strong]:text-[15px] [&_>_strong]:font-[550] [&_>_strong]:flex-1 [&_>_span]:text-[13px] [&_>_span]:text-(--muted) [&_>_span]:ml-8.5 [&_>_span]:w-full max-[1100px]:pt-3.75 max-[1100px]:pr-3.75 max-[1100px]:pb-3.75 max-[1100px]:pl-3.75 max-[768px]:flex-col max-[768px]:items-start max-[768px]:pt-3.75 max-[768px]:pr-3.75 max-[768px]:pb-3.75 max-[768px]:pl-3.75 max-[768px]:[&_>_span]:mt-0 max-[768px]:[&_>_span]:mr-0 max-[768px]:[&_>_span]:mb-0 max-[768px]:[&_>_span]:ml-0 max-[768px]:[&_>_span]:text-[12px] max-[768px]:[&_>_strong]:text-[14px] border border-solid border-(--line)"
            data-ui="system-node"
          >
            <CreditCard size={20} />
            <strong>{t("Subscriptions, if needed")}</strong>
          </div>
        </div>
      </div>
      <div
        className="flex justify-between gap-6 [border-top-width:1px] [border-top-style:solid] border-t-(--line) mt-8.75 pt-5.5 text-[13px] text-(--muted) leading-[1.6] max-[600px]:text-[13px]"
        data-ui="system-bottom"
      >
        <span>
          {t(
            "Example product structure. The right features depend on your idea.",
          )}
        </span>
        <ArrowUpRight size={18} />
      </div>
    </div>
  );
}
