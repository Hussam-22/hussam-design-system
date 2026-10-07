import { useTranslations, type Locale } from "../i18n/index";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  FileText,
  MessageSquare,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Badge } from "./ui/badge";

const knowledge = [
  {
    title: "Project guide",
    section: "Getting started · Section 01",
    question: "How do we start a project?",
    answer:
      "Start with the problem you want to solve. Share who will use the system, what is frustrating today and what a better outcome would look like. A discovery conversation helps define the scope, priorities and next steps before design begins.",
    match: /start|project|begin|scope|discovery|بد[ءأاي]|مشروع|نطاق|نبدأ/i,
  },
  {
    title: "Support policy",
    section: "Handover & support · Section 02",
    question: "What happens after launch?",
    answer:
      "The sample support policy includes a documented handover, guidance for maintaining content and a review of the agreed support period. Ongoing improvements and new features are scoped separately so the system can evolve with the business.",
    match:
      /support|launch|handover|maintain|after|دعم|إطلاق|اطلاق|تسليم|صيان|بعد/i,
  },
  {
    title: "Information policy",
    section: "Knowledge sources · Section 03",
    question: "Where do the answers come from?",
    answer:
      "This demo uses three sample documents and prepared answers. A real assistant can use your approved website content, policies and documents, then link to the information behind its answer. It should also tell users when it does not have enough information to help.",
    match:
      /source|answer|document|knowledge|information|accurac|مصدر|مصادر|معلومات|إجاب|اجاب|مستند|معرف|تجي|وين/i,
  },
];
interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  source?: number;
}
const greeting: Message = {
  id: 0,
  role: "assistant",
  text: "A useful answer starts with the right information. Ask a question about the sample project guide, support policy or knowledge sources.",
};

export default function ChatAssistantDemo({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const { t } = useTranslations(locale);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const conversation = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setHydrated(true);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (messages.length > 1 && conversation.current)
      conversation.current.scrollTop = conversation.current.scrollHeight;
  }, [messages, busy, expanded]);

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setMessages((previous) => [
      ...previous,
      { id: Date.now(), role: "user", text: trimmed },
    ]);
    setQuestion("");
    setBusy(true);
    timer.current = setTimeout(() => {
      const source = knowledge.findIndex((item) => item.match.test(trimmed));
      const answer =
        source >= 0
          ? knowledge[source].answer
          : "That question is outside these sample documents. This demo can answer questions about starting a project, support after launch and knowledge sources. A grounded assistant should make its limits clear instead of inventing an answer.";
      setMessages((previous) => [
        ...previous,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: answer,
          ...(source >= 0 ? { source } : {}),
        },
      ]);
      setBusy(false);
    }, 450);
  }
  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }
  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setBusy(false);
    setMessages([greeting]);
    setExpanded(null);
    setQuestion("");
  }

  return (
    <div
      className="relative grid grid-cols-[210px_1fr] [background:#fdfbff] text-[#292331] min-h-137.5 rounded-[18px] overflow-hidden [box-shadow:0_24px_100px_#0003] [--foreground:#292331] [--background:#fdfbff] [--line:#ded6e6] [--muted:#6c6178] [--muted-foreground:#6c6178] [--border:#ded6e6] scheme-light max-[1100px]:grid-cols-[185px_1fr] max-[900px]:grid-cols-[160px_1fr] max-[768px]:grid-cols-[130px_1fr] max-[600px]:grid-cols-[1fr] max-[600px]:rounded-lg max-[600px]:min-h-135 in-data-[theme='dark']:[background:#17131d] in-data-[theme='dark']:text-[#f4f0f7] in-data-[theme='dark']:[--foreground:#f4f0f7] in-data-[theme='dark']:[--background:#17131d] in-data-[theme='dark']:[--line:#3b3443] in-data-[theme='dark']:[--muted:#bdb4c7] in-data-[theme='dark']:[--muted-foreground:#bdb4c7] in-data-[theme='dark']:[--border:#3b3443] in-data-[theme='dark']:scheme-dark in-data-[theme='dark']:[box-shadow:0_24px_80px_#0003] border border-solid border-[#ffffff40] in-data-[theme='dark']:border in-data-[theme='dark']:border-solid in-data-[theme='dark']:border-[#44334f]"
      data-ui="assistant-app"
      data-demo="assistant"
    >
      <aside
        className="[background:#f1edf6] pt-7 pr-4.5 pb-7 pl-4.5 flex flex-col [border-right-width:1px] [border-right-style:solid] border-r-[#e6dfec] text-[14px] *:data-[ui~='workspace-label']:mt-7.25 *:data-[ui~='workspace-label']:mb-3 max-[900px]:pl-3.5 max-[900px]:pr-3.5 max-[768px]:pt-5.75 max-[768px]:pr-2.75 max-[768px]:pb-5.75 max-[768px]:pl-2.75 max-[600px]:hidden [[data-theme='dark']_:is(&,[data-ui~='dashboard-sidebar'])]:[background:#121015] [[data-theme='dark']_:is(&,[data-ui~='dashboard-sidebar'])]:border-[#3b3443]"
        data-ui="assistant-sidebar"
      >
        <div
          className="[font-family:var(--display)] text-[25px] font-[620] tracking-[-0.8px] flex items-center [&_>_span:last-child]:text-[#8c3b92] max-[768px]:text-[23px]"
          data-ui="assistant-wordmark"
        >
          <span
            className="grid place-items-center [background:#ebddf4] text-[#653d75] w-7.5 h-7.5 mr-2.5 rounded-lg max-[768px]:w-6.25 max-[768px]:h-6.25 max-[768px]:mr-1.5"
            data-ui="assistant-symbol"
          >
            <Sparkles size={17} />
          </span>
          {t("source")}
          <span>.</span>
        </div>
        <button
          className="flex items-center gap-2.25 [background:#fdfbff] rounded-[7px] pt-2.25 pr-3 pb-2.25 pl-3 text-[11px] min-h-11 mt-7.25 max-[768px]:pl-1.75 max-[768px]:pr-1.75 max-[768px]:text-[11px] max-[768px]:gap-1.25 [[data-theme='dark']_:is(&,[data-ui~='question-suggestions']_button,[data-ui~='assistant-compose']_form,[data-ui~='source-detail'],[data-ui~='search-field'],[data-ui~='status-filter']_select)]:[background:#211a28] [[data-theme='dark']_:is(&,[data-ui~='question-suggestions']_button,[data-ui~='assistant-compose']_form,[data-ui~='source-detail'],[data-ui~='search-field'],[data-ui~='status-filter']_select)]:border-[#4a3a56] [[data-theme='dark']_:is(&,[data-ui~='question-suggestions']_button,[data-ui~='assistant-compose']_form,[data-ui~='source-detail'],[data-ui~='search-field'],[data-ui~='status-filter']_select)]:text-[#e7deed] border border-solid border-[#ddd2e6]"
          data-ui="new-chat"
          onClick={reset}
          disabled={!hydrated}
        >
          <Plus size={15} />
          {t("New conversation")}
        </button>
        <p
          className="text-[14px] font-[650] text-[#73657e] tracking-[0.07em] max-[768px]:text-[14px]"
          data-ui="workspace-label"
        >
          {t("CONVERSATIONS")}
        </p>
        <span
          className="flex items-center gap-2.25 text-[11px] pt-3 pr-2 pb-3 pl-2 [background:#ece5f3] rounded-md max-[768px]:text-[11px] max-[768px]:pl-1 max-[768px]:pr-1 max-[768px]:gap-1.25 [[data-theme='dark']_:is(&,[data-ui~='chat-message-user']_>_div,[data-ui~='workspace-navigation']_button[data-ui~='active'],[data-ui~='dashboard-metrics']_>_div:last-child,[data-ui~='dashboard-inline-guide'])]:[background:#2b2035] [[data-theme='dark']_:is(&,[data-ui~='chat-message-user']_>_div,[data-ui~='workspace-navigation']_button[data-ui~='active'],[data-ui~='dashboard-metrics']_>_div:last-child,[data-ui~='dashboard-inline-guide'])]:text-[#e4c6f3] [[data-theme='dark']_:is(&,[data-ui~='chat-message-user']_>_div,[data-ui~='workspace-navigation']_button[data-ui~='active'],[data-ui~='dashboard-metrics']_>_div:last-child,[data-ui~='dashboard-inline-guide'])]:border-[#4a3a56]"
          data-ui="chat-nav-item"
        >
          <MessageSquare size={14} />
          {t("A more useful answer")}
        </span>
        <div
          className="mt-auto pt-7.5 *:data-[ui~='workspace-label']:block *:data-[ui~='workspace-label']:mb-3.75 [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-1.75 [&_>_div]:text-[10px] [&_>_div]:pt-2 [&_>_div]:pb-2 [&_>_div]:text-[#675b73] [&_>_div_svg:last-child]:ml-auto [&_>_div_svg:last-child]:text-[#8b3f96] max-[768px]:[&_>_div]:text-[10px] max-[768px]:[&_>_div]:gap-1"
          data-ui="knowledge-list"
        >
          <span
            className="text-[14px] font-[650] text-[#73657e] tracking-[0.07em] max-[768px]:text-[14px]"
            data-ui="workspace-label"
          >
            {t("CONNECTED KNOWLEDGE")}
          </span>
          {knowledge.map((item) => (
            <div key={item.title}>
              <FileText size={14} />
              <span>{t(item.title)}</span>
              <Check size={12} />
            </div>
          ))}
        </div>
        <p
          className="text-[14px] leading-[1.6] mt-6 text-[#70627b] [border-top-width:1px] [border-top-style:solid] border-t-[#dce2d6] pt-5"
          data-ui="assistant-sidebar-note"
        >
          {t("Your information.")}
          <br />
          {t("One clear conversation.")}
        </p>
      </aside>
      <div className="min-w-0 flex flex-col" data-ui="assistant-main">
        <div
          className="flex items-center justify-between min-h-15.75 pl-6.25 pr-6.25 [border-bottom-width:1px] [border-bottom-style:solid] border-b-[#eae3ef] [&_>_span:first-child]:flex [&_>_span:first-child]:items-center [&_>_span:first-child]:gap-2.5 [&_>_span:first-child]:text-[14px] max-[768px]:pl-4.25 max-[768px]:pr-4.25 max-[768px]:[&_>_span:first-child]:text-[14px] max-[600px]:min-h-13.25 max-[600px]:pl-3.75 max-[600px]:pr-3.75 max-[600px]:gap-2 max-[600px]:flex-wrap max-[600px]:pt-2 max-[600px]:pb-2 max-[600px]:[&_>_span:first-child]:text-[14px] max-[600px]:[&_>_span:first-child]:mr-auto [[data-theme='dark']_:is(&,[data-ui~='dashboard-topbar'],[data-ui~='workspace-user'],[data-ui~='dashboard-metrics'],[data-ui~='dashboard-metrics']_>_div,[data-ui~='project-table']_th,[data-ui~='project-table']_td)]:border-[#3b3443]"
          data-ui="assistant-topbar"
        >
          <span>
            {t("Knowledge assistant")} <ChevronDown size={13} />
          </span>
          <Badge
            className="text-[8px]! font-semibold! pl-2.25! pr-2.25!"
            data-ui="demo-badge"
            variant="outline"
          >
            {t("Scripted demo")}
          </Badge>
          <button
            className="hidden max-[600px]:grid max-[600px]:place-items-center max-[600px]:w-11 max-[600px]:h-11 max-[600px]:[background:transparent] max-[600px]:rounded-[7px] in-data-[theme='dark']:text-[#edafd9] in-data-[theme='dark']:border-[#4a3a56] in-data-[theme='dark']:[background:#2b2035] max-[600px]:border max-[600px]:border-solid max-[600px]:border-[#dbe3d5]"
            data-ui="assistant-reset-mobile"
            aria-label={t("Start a new demo conversation")}
            onClick={reset}
            disabled={!hydrated}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        <div
          className="pt-7 pr-9.5 pb-7 pl-9.5 max-h-85.5 min-h-85.5 overflow-y-auto overscroll-contain scrollbar-thin [scrollbar-color:#bcc9bd_transparent] max-[900px]:pl-5.5 max-[900px]:pr-5.5 max-[768px]:pl-5 max-[768px]:pr-5 max-[600px]:pt-5.25 max-[600px]:pr-4.25 max-[600px]:pb-5.25 max-[600px]:pl-4.25 max-[600px]:min-h-78.75 max-[600px]:max-h-78.75 max-[600px]:h-95"
          data-ui="assistant-conversation"
          ref={conversation}
          role="log"
          aria-label={t("Demo conversation")}
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.length === 1 && (
            <div
              className="text-center pt-2 pb-6 [&_h3]:text-[35px] [&_h3]:leading-[1.05] [&_h3]:tracking-[-1.2px] [&_h3]:font-[530] [&_>_p]:text-[12px] [&_>_p]:text-[#73657e] [&_>_p]:mt-2.5 max-[768px]:[&_h3]:text-[31px] max-[600px]:pt-1.75 max-[600px]:[&_h3]:text-[34px]"
              data-ui="assistant-intro"
            >
              <span
                className="inline-grid place-items-center w-11.5 h-11.5 rounded-[50%] text-[#834690] mb-3 [background:#f1e6f7] [[data-theme='dark']_:is(&,[data-ui~='chat-avatar'],[data-ui~='assistant-symbol'],[data-ui~='demo-brand-symbol'],[data-ui~='avatar'],[data-ui~='nav-count'])]:[background:#302039] [[data-theme='dark']_:is(&,[data-ui~='chat-avatar'],[data-ui~='assistant-symbol'],[data-ui~='demo-brand-symbol'],[data-ui~='avatar'],[data-ui~='nav-count'])]:border-[#594169] [[data-theme='dark']_:is(&,[data-ui~='chat-avatar'],[data-ui~='assistant-symbol'],[data-ui~='demo-brand-symbol'],[data-ui~='avatar'],[data-ui~='nav-count'])]:text-[#e8bff7] border border-solid border-[#dac9e5]"
                data-ui="assistant-star"
              >
                <Sparkles size={26} strokeWidth={1.5} />
              </span>
              <h3>
                {t("Your knowledge.")}
                <br />
                {t("Within reach.")}
              </h3>
              <p>{t("Less searching. More understanding.")}</p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 mt-4.5 text-[15px] leading-[1.75] [&_>_div]:min-w-0 [@media((max-width:_768px))]:text-[14px] [@media((max-width:_600px))]:text-[15px] [@media((max-width:_600px))]:gap-2.25 ${{ user: "justify-end [&_>_div]:[background:#eee7f5] [&_>_div]:pt-2.5 [&_>_div]:pr-3.5 [&_>_div]:pb-2.5 [&_>_div]:pl-3.5 [&_>_div]:rounded-[12px_12px_2px_12px] [&_>_div]:max-w-[90%]", assistant: "" }[message.role]}`}
              data-ui={`chat-message chat-message-${message.role}`}
            >
              {message.role === "assistant" && (
                <span
                  className="grid place-items-center w-6.75 h-6.75 [background:#ebdef3] text-[#68397b] rounded-[7px] shrink-0"
                  data-ui="chat-avatar"
                >
                  <Sparkles size={15} />
                </span>
              )}
              <div>
                <p>{t(message.text)}</p>
                {message.source !== undefined && (
                  <>
                    <button
                      className="flex items-center gap-1.5 min-h-11 mt-2 [background:transparent] text-[#793d85] text-[14px] pt-1 pr-0 pb-1 pl-0 [[data-theme='dark']_:is(&,[data-ui~='assistant-wordmark']_>_span:last-child,[data-ui~='demo-brand-dot'])]:text-[#edafd9] border-0 border-solid"
                      data-ui="source-toggle"
                      onClick={() =>
                        setExpanded(expanded === message.id ? null : message.id)
                      }
                      aria-expanded={expanded === message.id}
                    >
                      <FileText size={12} />
                      {t("1 source")} <ArrowUpRight size={12} />
                    </button>
                    {expanded === message.id && (
                      <div
                        className="flex flex-col gap-0.75 pt-3.25 pr-3.25 pb-3.25 pl-3.25 [background:#f5eef9] rounded-md text-[12px] [&_small]:text-[#756780] [&_small]:text-[13px] [&_small]:leading-[1.6] [&_strong]:text-[13px] [&_strong]:leading-[1.6] [&_span]:text-[13px] [&_span]:leading-[1.6] border border-solid border-[#d8c6e5]"
                        data-ui="source-detail"
                      >
                        <strong>{t(knowledge[message.source].title)}</strong>
                        <span>{t(knowledge[message.source].section)}</span>
                        <small>{t("Sample demonstration document")}</small>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          {busy && (
            <div
              className="flex gap-3 mt-4.5 text-[15px] leading-[1.75] [&_>_div]:min-w-0 max-[768px]:text-[14px] max-[600px]:text-[15px] max-[600px]:gap-2.25 chat-message-assistant"
              data-ui="chat-message chat-message-assistant"
            >
              <span
                className="grid place-items-center w-6.75 h-6.75 [background:#ebdef3] text-[#68397b] rounded-[7px] shrink-0"
                data-ui="chat-avatar"
              >
                <Sparkles size={15} />
              </span>
              <p className="text-[#6c5a79]" data-ui="demo-thinking">
                {t("Finding a sample answer")}
                <span>…</span>
              </p>
            </div>
          )}
        </div>
        <div
          className="pt-3.75 pr-6.25 pb-4 pl-6.25 mt-auto [&_form]:flex [&_form]:gap-3.75 [&_form]:pt-2 [&_form]:pr-2.25 [&_form]:pb-2 [&_form]:pl-3.75 [&_form]:min-h-13.25 [&_form]:rounded-[10px] [&_form]:[background:#fff] [&_input]:w-full [&_input]:min-w-0 [&_input]:[background:transparent] [&_input]:text-[14px] [&_input]:outline-offset-0 [&_form_button]:grid [&_form_button]:place-items-center [&_form_button]:h-11 [&_form_button]:w-11 [&_form_button]:shrink-0 [&_form_button]:[background:#37263f] [&_form_button]:text-white [&_form_button]:rounded-[7px] [&_form_button:disabled]:opacity-[0.4] [&_>_p]:text-center [&_>_p]:text-[12px] [&_>_p]:text-[#73637e] [&_>_p]:mt-2.25 max-[900px]:pl-4.5 max-[900px]:pr-4.5 max-[768px]:[&_input]:text-[10px] max-[768px]:[&_>_p]:text-[14px] max-[600px]:pl-3.25 max-[600px]:pr-3.25 max-[600px]:[&_input]:text-[16px] max-[600px]:[&_input::placeholder]:text-[10px] max-[600px]:[&_form]:pl-2.75 max-[600px]:[&_form_button]:w-11 max-[600px]:[&_form_button]:h-11 max-[600px]:[&_>_p]:text-[14px] [&_input::placeholder]:text-inherit [[data-theme='dark']_&_input::placeholder]:text-[#bdb4c7] [&_form]:border [&_form]:border-solid [&_form]:border-[#dbcee6] [&_input]:border-[none] [&_input]:border-solid [&_form_button]:border-[none] [&_form_button]:border-solid"
          data-ui="assistant-compose"
        >
          <div
            className="flex flex-wrap gap-1.5 mb-3 [&_button]:flex [&_button]:items-center [&_button]:justify-between [&_button]:gap-2 [&_button]:text-[14px] [&_button]:min-h-11 [&_button]:pt-1.75 [&_button]:pr-2.25 [&_button]:pb-1.75 [&_button]:pl-2.25 [&_button]:rounded-[7px] [&_button]:[background:#fdfaff] [&_button:hover]:[background:#f2e7f8] max-[900px]:[&_button]:text-[14px] max-[600px]:gap-1.5 max-[600px]:[&_button]:min-h-11 max-[600px]:[&_button]:text-[14px] max-[600px]:[&_button]:pl-2.25 max-[600px]:[&_button]:pr-2.25 max-[600px]:[&_button]:grow [[data-theme='dark']_&_button:hover]:[background:#35253f] [&_button]:border [&_button]:border-solid [&_button]:border-[#e0d3e9]"
            data-ui="question-suggestions"
          >
            {knowledge.map((item) => (
              <button
                key={item.title}
                onClick={() => ask(t(item.question))}
                disabled={!hydrated || busy}
              >
                {t(item.question)}
                <ArrowUpRight size={13} />
              </button>
            ))}
          </div>
          <form onSubmit={submit}>
            <label htmlFor="assistant-question" className="sr-only">
              {t("Ask the demo knowledge assistant")}
            </label>
            <input
              id="assistant-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={t("Ask a sample question…")}
              maxLength={350}
              disabled={!hydrated || busy}
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label={t("Send demo question")}
              disabled={!hydrated || busy || !question.trim()}
            >
              <ArrowUp size={19} />
            </button>
          </form>
          <p>
            {t("Sample knowledge. Scripted answers. No live AI connection.")}
          </p>
        </div>
      </div>
    </div>
  );
}
