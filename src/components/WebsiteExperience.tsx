import { useId, useState } from "react";
import { useTranslations, type Locale } from "../i18n/index";
import {
  ArrowDown,
  ArrowUpRight,
  BatteryFull,
  Menu,
  MoveUpRight,
  Signal,
} from "lucide-react";
export default function WebsiteExperience({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const { t } = useTranslations(locale);
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  return (
    <div data-ui="website-experience" data-story="responsive">
      <div
        className="relative min-h-168.75 perspective-[1600px] pt-5 max-[1100px]:min-h-136.25 max-[900px]:min-h-136.25 max-[768px]:min-h-118.75 max-[600px]:min-h-auto max-[600px]:pt-2.5 max-[600px]:pb-8.25 [@media((min-width:_901px)_and_(max-width:_1100px))]:min-h-168.75"
        data-ui="experience-stage"
      >
        <div
          className="w-[86%] rounded-xl overflow-hidden [background:#f5f3f9] [box-shadow:0_32px_70px_#252b2510] origin-[40%_center] max-[900px]:w-[88%] max-[768px]:w-[83%] max-[600px]:w-full max-[600px]:rounded-[7px] border border-solid border-(--line)"
          data-ui="desktop-presentation"
        >
          <div
            className="h-8.5 flex items-center justify-between pl-3.5 pr-3.5 [border-bottom-width:1px] [border-bottom-style:solid] border-b-[#d7d0e1] [background:#ebe7f1] text-[#756c80] text-[10px] max-[600px]:h-6.25 max-[600px]:text-[8px] max-[600px]:pl-2.25 max-[600px]:pr-2.25"
            data-ui="browser-chrome"
          >
            <span
              className="flex gap-1 [&_i]:w-1.25 [&_i]:h-1.25 [&_i]:[background:#bfb5cc] [&_i]:rounded-[50%]"
              data-ui="browser-dots"
            >
              <i />
              <i />
              <i />
            </span>
            <span>{t("forma.studio / demonstration")}</span>
            <ArrowUpRight size={10} />
          </div>
          <div
            className="text-[#25202e] [background:#f5f3f9] pt-6.5 pr-8.5 pb-0 pl-8.5 max-[1100px]:pt-5.25 max-[1100px]:pr-6.25 max-[1100px]:pb-0 max-[1100px]:pl-6.25 max-[768px]:pt-4.5 max-[768px]:pr-5.25 max-[768px]:pb-0 max-[768px]:pl-5.25 max-[600px]:pt-3.5 max-[600px]:pr-4.25 max-[600px]:pb-0 max-[600px]:pl-4.25"
            data-ui="studio-website"
          >
            <div
              className="flex items-center justify-between pb-7 text-[12px] [&_>_strong]:[font-family:var(--display)] [&_>_strong]:text-[25px] [&_>_strong]:tracking-[-1.6px] [&_>_strong]:leading-none [&_>_strong_span]:[font-family:var(--body)] [&_>_strong_span]:text-[9px] [&_>_strong_span]:pl-1.25 [&_>_strong_span]:align-top max-[900px]:pb-5 max-[900px]:[&_>_span]:hidden max-[600px]:pb-3.25 max-[600px]:text-[9px] max-[600px]:[&_>_strong]:text-[17px] max-[600px]:[&_>_strong_span]:text-[5px]"
              data-ui="studio-nav"
            >
              <strong>
                {t("FORMA")}
                <span>آ®</span>
              </strong>
              <span>
                {t("Spaces &nbsp;&nbsp; Studio &nbsp;&nbsp; Approach")}
              </span>
              <button
                className="flex gap-3.25 items-center [background:transparent] min-h-11 max-[600px]:text-[6px] max-[600px]:min-h-5.75 border-[none] border-solid"
                data-ui="studio-contact"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-controls={detailsId}
              >
                {t("Let’s talk")} <ArrowUpRight size={12} />
              </button>
            </div>
            <div
              className="grid grid-cols-[0.95fr_1.3fr] gap-7.5 min-h-93.75 max-[1100px]:min-h-78.75 max-[900px]:gap-3.5 max-[900px]:min-h-65 max-[768px]:grid-cols-[1fr_1.05fr] max-[768px]:min-h-60 max-[600px]:min-h-48 max-[600px]:gap-3 max-[600px]:grid-cols-[1fr_1.05fr]"
              data-ui="studio-hero"
            >
              <div
                className="relative z-1 pt-2.75 [&_>_p]:text-[11px] [&_>_p]:tracking-[0.15em] [&_>_p]:mb-5 [&_h3]:[font-family:var(--display)] [&_h3]:text-[clamp(29px,3.5vw,50px)] [&_h3]:leading-[1.03] [&_h3]:font-[480] [&_h3]:tracking-[-1.8px] [&_h3_em]:font-[Georgia,serif] [&_h3_em]:font-normal [&_>_span]:block [&_>_span]:text-[14px] [&_>_span]:leading-[1.6] [&_>_span]:mt-4.5 [&_>_span]:text-[#766a84] [&_button]:flex [&_button]:items-center [&_button]:justify-between [&_button]:gap-6.25 [&_button]:[background:#3b284b] [&_button]:text-white [&_button]:pt-2.75 [&_button]:pr-3.75 [&_button]:pb-2.75 [&_button]:pl-3.75 [&_button]:text-[12px] [&_button]:min-h-11 [&_button]:mt-6.25 [&_button]:font-[650] [&_button]:rounded-none max-[900px]:[&_h3]:text-[30px] max-[768px]:[&_h3]:text-[28px] max-[768px]:[&_>_span]:text-[8px] max-[768px]:[&_button]:text-[7px] max-[768px]:[&_button]:gap-2 max-[600px]:pt-0.75 max-[600px]:[&_>_p]:text-[8px] max-[600px]:[&_>_p]:mb-3 max-[600px]:[&_h3]:text-[23px] max-[600px]:[&_h3]:tracking-[-0.8px] max-[600px]:[&_>_span]:text-[10px] max-[600px]:[&_>_span]:mt-3 max-[600px]:[&_button]:text-[9px] max-[600px]:[&_button]:min-h-6.75 max-[600px]:[&_button]:mt-3.5 max-[600px]:[&_button]:pt-1.75 max-[600px]:[&_button]:pr-2.25 max-[600px]:[&_button]:pb-1.75 max-[600px]:[&_button]:pl-2.25 max-[600px]:[&_button_svg]:w-2.5 max-[600px]:[&_button_svg]:h-2.5 [&_button]:border-0 [&_button]:border-solid"
                data-ui="studio-copy"
              >
                <p>{t("ARCHITECTURE / INTERIORS")}</p>
                <h3>
                  {t("Space for")}
                  <br />
                  {t("a different")}
                  <br />
                  <em>{t("perspective.")}</em>
                </h3>
                <span>
                  {t("Thoughtfully shaped spaces.")}
                  <br />
                  {t("For the way we live, work and connect.")}
                </span>
                <button
                  onClick={() => setExpanded(!expanded)}
                  aria-expanded={expanded}
                  aria-controls={detailsId}
                >
                  {t("Explore the studio")} <MoveUpRight size={15} />
                </button>
              </div>
              <div
                className="min-h-88.5 relative overflow-hidden [background:#c6b5dc] [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 [&::before]:[background:linear-gradient(115deg,#eae1f4_0%,transparent_54%,#a07dbc66)] max-[1100px]:min-h-75 max-[900px]:min-h-60 max-[768px]:min-h-60 max-[600px]:min-h-47.5"
                data-ui="architecture-art"
                aria-label={t(
                  "Original abstract architectural composition, a fictional studio illustration",
                )}
                role="img"
              >
                <div
                  className="w-42.5 h-42.5 rounded-[50%] absolute -right-6.25 -top-6.25 [background:#eccaf0aa]"
                  data-ui="architecture-sun"
                />
                <div
                  className="absolute w-[55%] h-[66%] bottom-[11%] right-[55%] [background:linear-gradient(100deg,#e1d6ee,#b6a0d0)] transform-[skewY(-6deg)] [&::before]:[content:''] [&::before]:absolute [&::before]:right-full [&::before]:top-0 [&::before]:h-full [&::before]:w-5.5 [&::before]:transform-[skewY(38deg)] [&::before]:origin-[right_top] [&::before]:[background:#796087] max-[600px]:h-[68%] max-[600px]:right-[18%] max-[600px]:[&::before]:w-2.5 [box-shadow:none]"
                  data-ui="architecture-plane plane-back"
                />
                <div
                  className="absolute w-[55%] h-[66%] bottom-[11%] right-[16%] [background:linear-gradient(100deg,#e1d6ee,#b6a0d0)] [box-shadow:14px_19px_25px_#49305745] transform-[skewY(-6deg)] [&::before]:[content:''] [&::before]:absolute [&::before]:right-full [&::before]:top-0 [&::before]:h-full [&::before]:w-5.5 [&::before]:transform-[skewY(38deg)] [&::before]:origin-[right_top] [&::before]:[background:#796087] max-[600px]:h-[68%] max-[600px]:right-[18%] max-[600px]:[&::before]:w-2.5"
                  data-ui="architecture-plane plane-main"
                >
                  <div
                    className="absolute top-[12%] left-[15%] w-[69%] h-[34%] [background:repeating-linear-gradient(90deg,transparent_0_21%,#9980b0_21%_23%),linear-gradient(120deg,#493253,#251a2e)] [box-shadow:2px_3px_3px_#0002_inset] max-[600px]:[border-width:4px] border-8 border-solid border-[#cdb9e2]"
                    data-ui="architecture-window"
                  />
                  <div
                    className="absolute bottom-0 right-[12%] w-[29%] h-[44%] [background:#352440] [border-top-width:4px] [border-right-width:4px] [border-bottom-width:0] [border-left-width:4px] max-[600px]:[border-width:2px] border-solid border-[#a48db9]"
                    data-ui="architecture-door"
                  />
                </div>
                <div
                  className="absolute w-[30%] h-[13%] bottom-[3%] right-[15%] [background:repeating-linear-gradient(0deg,#aa91c1_0_5px,#e0d2ec_5px_10px)] transform-[skewX(-29deg)]"
                  data-ui="architecture-stairs"
                />
                <div
                  className="absolute bottom-[-10%] h-[20%] w-full [background:#b8a0ce] transform-[skewY(4deg)]"
                  data-ui="architecture-floor"
                />
                <span
                  className="absolute bottom-3.75 left-4.5 text-[6px] text-[#554263] tracking-[0.2em] max-[600px]:text-[3px] max-[600px]:left-1.75 max-[600px]:bottom-2"
                  data-ui="architecture-caption"
                >
                  {t("FORM / LIGHT / MATERIAL")}
                </span>
              </div>
            </div>
            <div
              id={detailsId}
              className="[background:#e8dff0] pt-4.5 pr-4.5 pb-4.5 pl-4.5 mt-3.75 text-[11px] [&_p]:mt-1.5 [&_p]:text-[10px]"
              data-ui="studio-details"
              hidden={!expanded}
            >
              <strong>{t("A fictional architecture studio.")}</strong>
              <p>
                {t(
                  "A sample website that helps visitors understand the studio’s work and find a clear way to get in touch.",
                )}
              </p>
            </div>
            <div
              className="flex items-center justify-between pt-5.5 pb-5.5 text-[11px] [&_>_span:nth-child(2)]:flex [&_>_span:nth-child(2)]:gap-7.5 [&_>_span:nth-child(2)]:items-center max-[600px]:pt-3.25 max-[600px]:pb-3.25 max-[600px]:text-[8px] max-[600px]:[&_svg]:w-2 max-[600px]:[&_svg]:h-2"
              data-ui="studio-bottom"
            >
              <span>{t("Intentional by design.")}</span>
              <span>
                {t("Selected spaces")} <ArrowDown size={13} />
              </span>
              <span>01 — 03</span>
            </div>
          </div>
        </div>
        <div
          className="absolute z-3 right-[9%] top-35.75 w-56.25 pt-1.75 pr-1.75 pb-1.75 pl-1.75 rounded-[36px] [background:#221b2c] [box-shadow:10px_22px_45px_#40295333] max-[1100px]:right-[5%] max-[1100px]:top-31.25 max-[1100px]:w-51.25 max-[900px]:w-48 max-[900px]:top-33.25 max-[900px]:right-0 max-[768px]:w-44.5 max-[768px]:top-26.25 max-[600px]:relative max-[600px]:top-auto max-[600px]:right-auto max-[600px]:-mt-4.5 max-[600px]:mr-4.25 max-[600px]:mb-0 max-[600px]:ml-auto max-[600px]:w-54.5 max-[600px]:rounded-4xl border-2 border-solid border-[#4b3a5b]"
          data-ui="phone-presentation"
        >
          <div
            className="absolute top-3.75 left-[50%] transform-[translateX(-50%)] w-16.25 h-3.75 rounded-[10px] [background:#15101b] z-5"
            data-ui="phone-speaker"
          />
          <div
            className="[&_h3_em]:font-[Georgia,serif] [&_h3_em]:font-normal relative overflow-hidden rounded-[27px] [background:#f5f3f9] text-[#25202e] pt-1.75 pr-3.75 pb-5.75 pl-3.75 [&_h3]:text-[31px] [&_h3]:font-[450] [&_h3]:tracking-[-1px] [&_h3]:leading-[1.03] max-[1100px]:[&_h3]:text-[27px] max-[900px]:pl-3 max-[900px]:pr-3 max-[900px]:[&_h3]:text-[26px] max-[768px]:[&_h3]:text-[23px] max-[600px]:pl-3.5 max-[600px]:pr-3.5 max-[600px]:[&_h3]:text-[27px]"
            data-ui="phone-screen"
          >
            <div
              className="flex justify-between text-[10px] font-bold pl-1.75 pr-1.75 mb-5.25 [&_svg]:w-2.5 [&_svg]:h-2.5 max-[768px]:mb-4.5 max-[600px]:mb-5.25"
              data-ui="phone-status"
            >
              <span>9:41</span>
              <span className="flex gap-1" data-ui="flex gap-1">
                <Signal />
                <BatteryFull />
              </span>
            </div>
            <div
              className="flex items-center justify-between mb-5.75 [&_strong]:[font-family:var(--display)] [&_strong]:text-[22px] [&_strong]:tracking-[-1.2px] [&_strong]:leading-none [&_sup]:text-[6px] [&_sup]:ml-1 [&_sup]:top-[-1.5em] max-[768px]:mb-4.5 max-[768px]:[&_strong]:text-[20px] max-[600px]:mb-5.5"
              data-ui="phone-studio-nav"
            >
              <strong>
                {t("FORMA")}
                <sup>آ®</sup>
              </strong>
              <Menu size={17} />
            </div>
            <p
              className="text-[9px] tracking-[0.15em] mb-3.25"
              data-ui="phone-eyebrow"
            >
              {t("ARCHITECTURE / INTERIORS")}
            </p>
            <h3>
              {t("Space for")}
              <br />
              {t("a different")}
              <br />
              <em>{t("perspective.")}</em>
            </h3>
            <div
              className="relative h-36 [background:#c6b5dc] mt-4.75 mb-3.25 overflow-hidden **:data-[ui~='plane-main']:h-[84%] **:data-[ui~='plane-main']:w-[59%] **:data-[ui~='plane-main']:bottom-[-6%] max-[1100px]:h-32.5 max-[900px]:h-30 max-[768px]:h-25 max-[768px]:mt-3.75 max-[768px]:mb-2.5 max-[600px]:h-29"
              data-ui="phone-art"
            >
              <div
                className="absolute w-[55%] h-[66%] bottom-[11%] right-[16%] [background:linear-gradient(100deg,#e1d6ee,#b6a0d0)] [box-shadow:14px_19px_25px_#49305745] transform-[skewY(-6deg)] [&::before]:[content:''] [&::before]:absolute [&::before]:right-full [&::before]:top-0 [&::before]:h-full [&::before]:w-5.5 [&::before]:transform-[skewY(38deg)] [&::before]:origin-[right_top] [&::before]:[background:#796087] max-[600px]:h-[68%] max-[600px]:right-[18%] max-[600px]:[&::before]:w-2.5"
                data-ui="architecture-plane plane-main"
              >
                <div
                  className="absolute top-[12%] left-[15%] w-[69%] h-[34%] [background:repeating-linear-gradient(90deg,transparent_0_21%,#9980b0_21%_23%),linear-gradient(120deg,#493253,#251a2e)] [box-shadow:2px_3px_3px_#0002_inset] max-[600px]:[border-width:4px] border-8 border-solid border-[#cdb9e2]"
                  data-ui="architecture-window"
                />
                <div
                  className="absolute bottom-0 right-[12%] w-[29%] h-[44%] [background:#352440] [border-top-width:4px] [border-right-width:4px] [border-bottom-width:0] [border-left-width:4px] max-[600px]:[border-width:2px] border-solid border-[#a48db9]"
                  data-ui="architecture-door"
                />
              </div>
            </div>
            <span
              className="text-[11px] block leading-[1.6]"
              data-ui="phone-tagline"
            >
              {t("Thoughtfully shaped spaces.")}
              <br />
              {t("For the way we live.")}
            </span>
            <button
              type="button"
              className="flex justify-between items-center text-[11px] pt-2.75 pb-2.75 mt-3 [background:#3b284b] text-white font-[650] rounded-none w-full min-h-11 pr-3 pl-3 border-0 border-solid"
              data-ui="phone-explore"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls={detailsId}
            >
              {t("Explore the studio")} <ArrowUpRight size={15} />
            </button>
            <div
              className="absolute bottom-1.5 w-14.5 h-0.75 rounded-[3px] [background:#251b2d] left-[50%] transform-[translateX(-50%)]"
              data-ui="phone-home-bar"
            />
          </div>
        </div>
        <div
          className="flex items-center gap-3 absolute text-[14px] -top-3.25 left-3.75 leading-[1.6] max-[900px]:text-[8px] max-[600px]:-top-3 max-[600px]:left-1.25 max-[600px]:text-[7px]"
          data-ui="screen-note desktop-note"
        >
          <span
            className="text-[22px] leading-none font-light text-(--muted)"
            data-ui="note-cross"
          >
            +
          </span>
          <span>{t("Clear on the big screen.")}</span>
        </div>
        <div
          className="flex items-center gap-3 absolute text-[14px] bottom-0 right-[8%] leading-[1.6] max-[1100px]:right-[4%] max-[900px]:bottom-0 max-[900px]:right-0 max-[768px]:bottom-1 max-[600px]:right-auto max-[600px]:left-2 max-[600px]:bottom-12.75 max-[600px]:max-w-28.75 max-[600px]:text-[8px] max-[600px]:gap-1.5 max-[600px]:hidden min-[901px]:right-[30%] min-[901px]:bottom-6 min-[901px]:max-w-57.5"
          data-ui="screen-note mobile-note"
        >
          <span
            className="text-[22px] leading-none font-light text-(--muted)"
            data-ui="note-cross"
          >
            +
          </span>
          <span>{t("Considered on every screen.")}</span>
        </div>
      </div>
      <div
        className="max-w-195 mt-6.5 mr-0 mb-4.5 ml-0 text-left [&_p]:text-[18px] [&_p]:text-(--muted) [&_p]:mt-3 [&_p]:mr-0 [&_p]:mb-3 [&_p]:ml-0 [&_strong]:block [&_strong]:text-[19px] [&_strong]:leading-normal [&_strong]:font-[570] max-[600px]:[&_strong]:text-[18px]"
        data-ui="responsive-check"
      >
        <span
          className="flex items-center gap-4.5 text-[14px] font-[650] leading-[1.6] tracking-[0.08em] uppercase [&_>_span:first-child:not(:last-child)]:text-(--muted) max-[600px]:text-[14px] max-[600px]:gap-3.25"
          data-ui="eyebrow"
        >
          {t("EVERY SCREEN. SAME STANDARD.")}
        </span>
        <p>
          {t(
            "Your customers should be able to read, browse and contact you just as easily on a phone as on a computer.",
          )}
        </p>
        <strong>
          {t(
            "Try your own website on a laptop, then on your phone. Is it just as easy to find what you need and get in touch?",
          )}
        </strong>
      </div>
    </div>
  );
}
