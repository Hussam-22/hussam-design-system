import { useTranslations, type Locale } from "../i18n/index";
import { useEffect, useMemo, useState, type SyntheticEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Grid2X2,
  Plus,
  Search,
  Trash2,
  Layers,
  LayoutDashboard,
  CircleHelp,
  RotateCcw,
  BriefcaseBusiness,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Status = "Planned" | "Active" | "Complete";
type Category = "Website" | "Platform" | "Assistant";
interface RecordItem {
  id: number;
  name: string;
  client: string;
  category: Category;
  status: Status;
  value: number;
}
const initialRecords: RecordItem[] = [
  {
    id: 1,
    name: "Brand website",
    client: "Forma Studio",
    category: "Website",
    status: "Active",
    value: 18000,
  },
  {
    id: 2,
    name: "Booking platform",
    client: "Fieldwork",
    category: "Platform",
    status: "Active",
    value: 32000,
  },
  {
    id: 3,
    name: "Customer assistant",
    client: "Northstar",
    category: "Assistant",
    status: "Planned",
    value: 24000,
  },
  {
    id: 4,
    name: "Commerce experience",
    client: "Mono Supply",
    category: "Website",
    status: "Complete",
    value: 22000,
  },
  {
    id: 5,
    name: "Operations portal",
    client: "Common Ground",
    category: "Platform",
    status: "Active",
    value: 28000,
  },
];
const money = (value: number) =>
  new Intl.NumberFormat("en-AE", { maximumFractionDigits: 0 }).format(value);

export default function DashboardDemo({ locale = "en" }: { locale?: Locale }) {
  const { t } = useTranslations(locale);
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [status, setStatus] = useState<Status | "All">("All");
  const [sort, setSort] = useState<"name" | "value">("name");
  const [descending, setDescending] = useState(false);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");
  const [deleted, setDeleted] = useState<RecordItem | null>(null);
  useEffect(() => setHydrated(true), []);

  const visible = useMemo(
    () =>
      records
        .filter(
          (record) =>
            `${record.name} ${record.client} ${t(record.name)} ${t(record.client)}`
              .toLowerCase()
              .includes(search.toLowerCase()) &&
            (category === "All" || record.category === category) &&
            (status === "All" || record.status === status),
        )
        .sort(
          (a, b) =>
            (sort === "name"
              ? t(a.name).localeCompare(
                  t(b.name),
                  locale === "ar" ? "ar-AE" : "en-AE",
                )
              : a.value - b.value) * (descending ? -1 : 1),
        ),
    [records, search, category, status, sort, descending, locale],
  );

  function toggleStatus(record: RecordItem) {
    const next = (
      { Planned: "Active", Active: "Complete", Complete: "Planned" } as const
    )[record.status];
    setRecords((previous) =>
      previous.map((item) =>
        item.id === record.id ? { ...item, status: next } : item,
      ),
    );
    setNotice(
      t("{name} changed to {status}.", {
        name: t(record.name),
        status: t(next),
      }),
    );
  }
  function remove(record: RecordItem) {
    setRecords((previous) => previous.filter((item) => item.id !== record.id));
    setDeleted(record);
    setNotice(
      t("{name} removed. You can undo this change.", { name: t(record.name) }),
    );
  }
  function addRecord(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const client = String(data.get("client") || "").trim();
    if (!name || !client) {
      setFormError("Enter a project name and client.");
      return;
    }
    const value = Number(data.get("value"));
    if (!Number.isFinite(value) || value < 0) {
      setFormError("Enter a valid value of zero or more.");
      return;
    }
    setRecords((previous) => [
      ...previous,
      {
        id: Date.now(),
        name,
        client,
        category: String(data.get("category")) as Category,
        status: "Planned",
        value,
      },
    ]);
    setSearch("");
    setCategory("All");
    setStatus("All");
    setOpen(false);
    setFormError("");
    setNotice(t("{name} added to the workspace.", { name }));
  }
  function changeSort(next: "name" | "value") {
    setDescending(sort === next ? !descending : false);
    setSort(next);
  }

  return (
    <div
      className="grid grid-cols-[193px_1fr] min-h-141.75 [background:#fff] text-[#2e2536] rounded-[18px] overflow-hidden [box-shadow:0_24px_70px_#232b2310] [--background:#fff] [--foreground:#2e2536] [--primary:#422c50] [--primary-foreground:#fff] [--secondary:#f1e9f7] [--border:#e1d7e8] [--muted-foreground:#72617e] scheme-light max-[1100px]:grid-cols-[165px_1fr] max-[900px]:grid-cols-[132px_1fr] max-[768px]:grid-cols-[1fr] [&_[data-ui~='search-field']_input]:text-[14px] max-[600px]:[&_[data-ui~='search-field']_input]:text-[16px] in-data-[theme='dark']:[background:#17131d] in-data-[theme='dark']:text-[#f4f0f7] in-data-[theme='dark']:[--foreground:#f4f0f7] in-data-[theme='dark']:[--background:#17131d] in-data-[theme='dark']:[--line:#3b3443] in-data-[theme='dark']:[--muted:#bdb4c7] in-data-[theme='dark']:[--muted-foreground:#bdb4c7] in-data-[theme='dark']:[--border:#3b3443] in-data-[theme='dark']:scheme-dark in-data-[theme='dark']:[box-shadow:0_24px_80px_#0003] border border-solid border-[#e1d7e8] in-data-[theme='dark']:border in-data-[theme='dark']:border-solid in-data-[theme='dark']:border-[#44334f]"
      data-ui="dashboard-app"
      data-demo="dashboard"
    >
      <aside
        className="flex flex-col pt-6.5 pr-3.75 pb-4.75 pl-3.75 [border-right-width:1px] [border-right-style:solid] border-r-[#e7deee] [background:#f4eef9] *:data-[ui~='workspace-label']:ml-2.5 *:data-[ui~='workspace-label']:mb-3.25 max-[900px]:pl-2.5 max-[900px]:pr-2.5 max-[768px]:hidden"
        data-ui="dashboard-sidebar"
        aria-label={t("Demo workspace")}
      >
        <div
          className="flex items-center [font-family:var(--display)] text-[19px] font-[650] tracking-[-0.7px] mb-9.5 max-[900px]:text-[16px]"
          data-ui="demo-brand"
        >
          <span
            className="grid place-items-center h-7.5 w-7.5 rounded-[7px] [background:#eadcf3] text-[#76518c] mr-2 max-[900px]:mr-1.25 max-[900px]:w-6.25 max-[900px]:h-6.25"
            data-ui="demo-brand-symbol"
          >
            <Grid2X2 size={18} />
          </span>
          {t("FORMA")}
          <span className="text-[#9a4996]" data-ui="demo-brand-dot">
            .
          </span>
        </div>
        <span
          className="text-[14px] font-[650] text-[#73657e] tracking-[0.07em] max-[768px]:text-[14px]"
          data-ui="workspace-label"
        >
          {t("YOUR WORKSPACE")}
        </span>
        <div
          className="flex flex-col gap-1 [&_button]:flex [&_button]:items-center [&_button]:gap-2.5 [&_button]:min-h-11 [&_button]:pt-2.25 [&_button]:pr-2.5 [&_button]:pb-2.25 [&_button]:pl-2.5 [&_button]:[background:transparent] [&_button]:text-[14px] [&_button]:text-[#776580] [&_button]:rounded-md [&_button]:text-left [&_button[data-ui~='active']]:[background:#eadcf5] [&_button[data-ui~='active']]:text-[#66417c] [[data-theme='dark']_:is(&_button,[data-ui~='workspace-label'],[data-ui~='knowledge-list']_>_div,[data-ui~='assistant-sidebar-note'],[data-ui~='assistant-intro']_>_p,[data-ui~='assistant-compose']_>_p,[data-ui~='source-detail']_small,[data-ui~='workspace-note']_p,[data-ui~='workspace-user']_small,[data-ui~='dashboard-title-row']_p,[data-ui~='dashboard-metrics']_span,[data-ui~='dashboard-metrics']_small,[data-ui~='table-scroll-hint'],[data-ui~='project-table']_td,[data-ui~='project-table']_th,[data-ui~='table-summary'],[data-ui~='demo-thinking'])]:text-[#bdb4c7] [&_button]:border-[none] [&_button]:border-solid"
          data-ui="workspace-navigation"
        >
          {(["All", "Website", "Platform", "Assistant"] as const).map(
            (item, i) => {
              const Icon = [
                LayoutDashboard,
                Layers,
                BriefcaseBusiness,
                CircleHelp,
              ][i];
              return (
                <button
                  key={item}
                  className={category === item ? "" : ""}
                  data-ui={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  disabled={!hydrated}
                >
                  <Icon size={17} />
                  {t(item === "All" ? "Overview" : `${item}s`)}
                  {item === "All" && (
                    <span
                      className="ml-auto grid place-items-center text-[14px] [background:#f9f5fc] min-w-4.75 h-4.25 rounded-sm"
                      data-ui="nav-count"
                    >
                      {records.length}
                    </span>
                  )}
                </button>
              );
            },
          )}
        </div>
        <div
          className="mt-auto pt-6.5 pr-2.5 pb-8.75 pl-2.5 [&_strong]:block [&_strong]:text-[14px] [&_strong]:leading-[1.4] [&_strong]:max-w-32.5 [&_p]:mt-2.25 [&_p]:text-[14px] [&_p]:text-[#706079] [&_p]:leading-[1.6] max-[900px]:pl-1 max-[900px]:pr-1"
          data-ui="workspace-note"
        >
          <span
            className="block text-[29px] font-extralight text-[#b395c2] leading-none mb-3.5"
            data-ui="small-cross"
          >
            +
          </span>
          <strong>{t("Make room for better work.")}</strong>
          <p>
            {t("One place for the things your team needs to move forward.")}
          </p>
        </div>
        <div
          className="flex items-center gap-2.25 [border-top-width:1px] [border-top-style:solid] border-t-[#e6ddec] pt-4.75 text-[14px] [&_small]:block [&_small]:text-[#706079] [&_small]:text-[14px] [&_small]:mt-0.5 max-[900px]:gap-1.25"
          data-ui="workspace-user"
        >
          <span
            className="grid place-items-center w-7.25 h-7.25 rounded-[50%] [background:#e8dfee] text-[#725d83] text-[9px]"
            data-ui="avatar"
          >
            {t("JD")}
          </span>
          <span>
            {t("Jamie Davis")}
            <small>{t("Demo workspace")}</small>
          </span>
        </div>
      </aside>
      <div
        className="min-w-0 pt-0 pr-7 pb-0 pl-7 max-[1100px]:pl-5 max-[1100px]:pr-5 max-[900px]:pl-3.75 max-[900px]:pr-3.75 max-[768px]:pl-5.5 max-[768px]:pr-5.5 max-[600px]:pl-3.5 max-[600px]:pr-3.5"
        data-ui="dashboard-main"
      >
        <div
          className="min-h-13.5 [border-bottom-width:1px] [border-bottom-style:solid] border-b-[#ede6f2] flex items-center justify-between gap-3 text-[14px] [&_>_span:first-child_>_span]:ml-2.5 [&_>_span:first-child_>_span]:mr-2.5 [&_>_span:first-child_>_span]:text-[#b4a2bf] **:data-[slot='badge']:text-[14px] **:data-[slot='badge']:font-[550] **:data-[slot='badge']:whitespace-normal **:data-[slot='badge']:text-center max-[600px]:text-[14px] max-[600px]:flex-wrap max-[600px]:gap-2.5 max-[600px]:**:data-[slot='badge']:text-[12px]"
          data-ui="dashboard-topbar"
        >
          <span>
            {t("Workspace")} <span>/</span> {t("Overview")}
          </span>
          <Badge variant="outline">
            {t("Working demo · try the controls")}
          </Badge>
        </div>
        <div
          className="flex items-center justify-between gap-3.75 mt-7.5 mb-6.5 [&_p]:text-[14px] [&_p]:text-[#706079] [&_p]:mb-1.25 [&_h3]:text-[31px] [&_h3]:leading-[1.1] [&_h3]:font-[560] [&_h3]:tracking-[-1px] [&_h3_span]:text-[#a365ad] **:data-[slot='button']:text-[12px] **:data-[slot='button']:min-h-11 max-[900px]:[&_h3]:text-[28px] max-[768px]:[&_h3]:text-[31px] max-[600px]:mt-5.75 max-[600px]:mb-5.5 max-[600px]:items-end max-[600px]:gap-4.5 max-[600px]:flex-wrap max-[600px]:[&_p]:text-[14px] max-[600px]:[&_h3]:text-[28px] max-[600px]:[&_h3]:max-w-42.5 max-[600px]:**:data-[slot='button']:pl-3 max-[600px]:**:data-[slot='button']:pr-3 max-[600px]:**:data-[slot='button']:text-[12px] max-[600px]:**:data-[slot='button']:min-h-12 max-[600px]:**:data-[slot='button']:gap-1.25 max-[600px]:**:data-[slot='button']:w-full max-[600px]:**:data-[slot='button']:justify-center max-[600px]:[&_[data-slot='button']_svg]:w-3.25 max-[600px]:[&_[data-slot='button']_svg]:h-3.25 max-[600px]:[&_>_div:first-child]:w-full"
          data-ui="dashboard-title-row"
        >
          <div>
            <p>{t("Let’s make things happen.")}</p>
            <h3>
              {t("Project overview")}
              <span>.</span>
            </h3>
          </div>
          <Dialog
            open={open}
            onOpenChange={(value) => {
              setOpen(value);
              setFormError("");
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="[background:linear-gradient(115deg,#714191,#9a4b85)] text-white [&:hover]:[background:#714191] border-0 border-solid"
                data-ui="demo-add-project"
                disabled={!hydrated}
              >
                <Plus size={16} />
                {t("Add project")}
              </Button>
            </DialogTrigger>
            <DialogContent
              closeLabel={t("Close")}
              className="[background:var(--surface)]! border-(--line)! rounded-[15px]! pt-8! pr-8! pb-8! pl-8! **:data-[slot='dialog-title']:[font-family:var(--display)] **:data-[slot='dialog-title']:text-[28px] **:data-[slot='dialog-title']:tracking-[-0.6px] **:data-[slot='dialog-title']:mb-1.75 **:data-[slot='dialog-description']:text-[12px] **:data-[slot='dialog-description']:leading-[1.6] **:data-[slot='dialog-close']:w-11 **:data-[slot='dialog-close']:h-11 **:data-[slot='dialog-close']:grid **:data-[slot='dialog-close']:place-items-center **:data-[slot='dialog-close']:top-1 **:data-[slot='dialog-close']:right-1 [&_p]:text-[14px] [&_p]:leading-[1.6]"
              data-ui="demo-dialog"
            >
              <DialogHeader>
                <DialogTitle>{t("Add a project")}</DialogTitle>
                <DialogDescription>
                  {t(
                    "This is a local demonstration. Your entry resets when the page is refreshed.",
                  )}
                </DialogDescription>
              </DialogHeader>
              <form
                className="flex flex-col gap-4.5 [&_label]:mb-1.75 [&_label]:inline-flex [&_label]:text-[12px] [&_input]:min-h-11 [&_input]:[background:var(--page)] [&_input]:rounded-[7px] [&_input]:w-full [&_input]:text-[14px] [&_input]:pt-2.5 [&_input]:pr-3 [&_input]:pb-2.5 [&_input]:pl-3 [&_select]:min-h-11 [&_select]:[background:var(--page)] [&_select]:rounded-[7px] [&_select]:w-full [&_select]:text-[14px] [&_select]:pt-2.5 [&_select]:pr-3 [&_select]:pb-2.5 [&_select]:pl-3 [&_input]:border [&_input]:border-solid [&_input]:border-(--line) [&_select]:border [&_select]:border-solid [&_select]:border-(--line)"
                data-ui="record-form"
                onSubmit={addRecord}
              >
                <div>
                  <Label htmlFor="project-name">{t("Project name")}</Label>
                  <Input
                    id="project-name"
                    name="name"
                    required
                    maxLength={60}
                    autoComplete="off"
                    placeholder={t("e.g. Customer portal")}
                  />
                </div>
                <div>
                  <Label htmlFor="project-client">{t("Client")}</Label>
                  <Input
                    id="project-client"
                    name="client"
                    required
                    maxLength={50}
                    autoComplete="off"
                    placeholder={t("e.g. Your business")}
                  />
                </div>
                <div
                  className="grid grid-cols-[1fr_1fr] gap-3.75"
                  data-ui="form-columns"
                >
                  <div>
                    <Label htmlFor="project-category">{t("Service")}</Label>
                    <select id="project-category" name="category">
                      <option value="Website">{t("Website")}</option>
                      <option value="Platform">{t("Platform")}</option>
                      <option value="Assistant">{t("Assistant")}</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="project-value">
                      {t("Quoted value (AED)")}
                    </Label>
                    <Input
                      id="project-value"
                      name="value"
                      type="number"
                      min="0"
                      max="100000000"
                      step="1"
                      defaultValue="12000"
                      required
                    />
                  </div>
                </div>
                {formError && (
                  <p
                    role="alert"
                    className="text-(--destructive) text-[12px]"
                    data-ui="form-error"
                  >
                    {t(formError)}
                  </p>
                )}
                <Button type="submit">
                  {t("Add to workspace")} <ArrowUpRight size={17} />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <p
          className="text-[14px] leading-[1.6] text-[#6a4d7d] pt-3 pr-4.5 pb-3 pl-4.5 rounded-[7px] [background:#f8f0fc] mb-5 max-[600px]:text-[14px] max-[600px]:pt-3.5 max-[600px]:pr-3.5 max-[600px]:pb-3.5 max-[600px]:pl-3.5 border border-solid border-[#e4d5ef]"
          data-ui="dashboard-inline-guide"
        >
          {t(
            "You can use this dashboard: add a project, search below or click a status to change it.",
          )}
        </p>
        <div
          className="grid grid-cols-[1fr_1fr_1.45fr] rounded-lg overflow-hidden mb-6.75 [&_>_div]:flex [&_>_div]:flex-col [&_>_div]:pt-4.5 [&_>_div]:pr-5 [&_>_div]:pb-4.5 [&_>_div]:pl-5 [&_>_div]:[border-right-width:1px] [&_>_div]:[border-right-style:solid] [&_>_div]:border-r-[#e5dcec] [&_>_div:last-child]:[background:#f7effb] [&_>_div:last-child]:[border-right-width:0] [&_>_div:last-child]:[border-right-style:solid] [&_span]:text-[14px] [&_span]:text-[#756180] [&_strong]:[font-family:var(--display)] [&_strong]:text-[37px] [&_strong]:font-[550] [&_strong]:tracking-[-1.2px] [&_strong]:leading-[1.3] [&_strong]:mt-1 [&_strong]:mb-1 [&_strong_em]:[font-family:var(--body)] [&_strong_em]:text-[10px] [&_strong_em]:not-italic [&_strong_em]:font-medium [&_strong_em]:align-middle [&_strong_em]:tracking-normal [&_small]:text-[14px] [&_small]:text-[#706079] max-[1100px]:[&_>_div]:pt-4 max-[1100px]:[&_>_div]:pr-3.75 max-[1100px]:[&_>_div]:pb-4 max-[1100px]:[&_>_div]:pl-3.75 max-[1100px]:[&_strong]:text-[31px] max-[900px]:[&_strong]:text-[27px] max-[900px]:[&_>_div]:pl-3 max-[900px]:[&_>_div]:pr-3 max-[900px]:[&_small]:text-[14px] max-[768px]:[&_strong]:text-[34px] max-[768px]:[&_small]:text-[14px] max-[768px]:[&_>_div]:pl-4.25 max-[768px]:[&_>_div]:pr-4.25 max-[600px]:grid-cols-[1fr_1fr] max-[600px]:mb-5.5 max-[600px]:[&_>_div]:pt-4 max-[600px]:[&_>_div]:pr-3 max-[600px]:[&_>_div]:pb-4 max-[600px]:[&_>_div]:pl-3 max-[600px]:[&_>_div:nth-child(2)]:[border-right-width:0] max-[600px]:[&_>_div:nth-child(2)]:[border-right-style:solid] max-[600px]:[&_>_div:last-child]:col-span-full max-[600px]:[&_>_div:last-child]:[border-top-width:1px] max-[600px]:[&_>_div:last-child]:[border-top-style:solid] max-[600px]:[&_>_div:last-child]:border-t-[#e1e7da] max-[600px]:[&_>_div:last-child]:flex-row max-[600px]:[&_>_div:last-child]:flex-wrap max-[600px]:[&_>_div:last-child]:items-center max-[600px]:[&_>_div:last-child]:justify-between max-[600px]:[&_>_div:last-child]:gap-[4px_12px] max-[600px]:[&_>_div:last-child_small]:w-full max-[600px]:[&_>_div:last-child_strong]:text-[28px] max-[600px]:[&_>_div:last-child_strong]:mt-0 max-[600px]:[&_>_div:last-child_strong]:mb-0 max-[600px]:[&_span]:text-[14px] max-[600px]:[&_strong]:text-[33px] max-[600px]:[&_small]:text-[12px] max-[600px]:[&_small]:leading-normal max-[600px]:[&_>_div_>_span]:text-[13px] border border-solid border-[#e5dcec]"
          data-ui="dashboard-metrics"
        >
          <div>
            <span>{t("Total projects")}</span>
            <strong>{records.length.toString().padStart(2, "0")}</strong>
            <small>{t("Across your workspace")}</small>
          </div>
          <div>
            <span>{t("In progress")}</span>
            <strong>
              {records
                .filter((item) => item.status === "Active")
                .length.toString()
                .padStart(2, "0")}
              <i
                className="inline-block w-1.75 h-1.75 rounded-[50%] [background:#ba84c8] ml-2.5 align-middle"
                data-ui="metric-dot"
              />
            </strong>
            <small>{t("Ready for the next step")}</small>
          </div>
          <div>
            <span>{t("Quoted value")}</span>
            <strong>
              <em>{t("AED")}</em>{" "}
              {money(records.reduce((sum, item) => sum + item.value, 0))}
            </strong>
            <small>{t("Fictional demonstration data")}</small>
          </div>
        </div>
        <div
          className="flex items-center justify-between gap-3 mb-3 [&_h4]:text-[14px] [&_h4]:font-[650] [&_h4]:whitespace-nowrap [&_h4_span]:inline-block [&_h4_span]:pt-px [&_h4_span]:pr-1.5 [&_h4_span]:pb-px [&_h4_span]:pl-1.5 [&_h4_span]:ml-1 [&_h4_span]:[background:#f3edf8] [&_h4_span]:text-[#9987a6] [&_h4_span]:rounded-sm [&_h4_span]:text-[14px] [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-2.5 max-[900px]:flex-wrap max-[900px]:[&_>_div]:ml-auto max-[600px]:gap-3 max-[600px]:[&_>_div]:w-full max-[600px]:[&_>_div]:ml-0 max-[600px]:[&_>_div]:justify-between max-[600px]:[&_>_div]:gap-2 [[data-theme='dark']_&_h4_span]:[background:#302039] [[data-theme='dark']_&_h4_span]:text-[#e8bff7]"
          data-ui="table-toolbar"
        >
          <h4>
            {t("Your projects")} <span>{visible.length}</span>
          </h4>
          <div>
            <label
              className="flex gap-2 items-center rounded-md pl-2.5 pr-2.5 min-h-11 [&_svg]:text-[#b098c2] [&_input]:w-36.25 [&_input]:min-w-0 [&_input]:[background:transparent] [&_input]:text-[12px] [&_input]:outline-offset-2 max-[600px]:flex-1 max-[600px]:min-h-11 max-[600px]:pl-2 max-[600px]:pr-2 max-[600px]:[&_input]:w-full max-[600px]:[&_input]:text-[16px] max-[600px]:[&_input::placeholder]:text-[9px] border border-solid border-[#e6dcec] [&_input]:border-[none] [&_input]:border-solid"
              data-ui="search-field"
            >
              <Search size={16} />
              <span className="sr-only">{t("Search projects")}</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t("Search projects")}
                disabled={!hydrated}
              />
            </label>
            <label
              className="relative flex items-center [&_select]:appearance-none [&_select]:min-h-11 [&_select]:text-[14px] [&_select]:rounded-md [&_select]:pt-2 [&_select]:pr-7.25 [&_select]:pb-2 [&_select]:pl-2.75 [&_select]:[background:#fff] [&_svg]:absolute [&_svg]:right-2.5 [&_svg]:pointer-events-none max-[600px]:[&_select]:min-h-11 max-[600px]:[&_select]:text-[14px] [&_select]:border [&_select]:border-solid [&_select]:border-[#e6dcec]"
              data-ui="status-filter"
            >
              <span className="sr-only">{t("Filter by status")}</span>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as Status | "All")
                }
                disabled={!hydrated}
              >
                <option value="All">{t("All statuses")}</option>
                <option value="Planned">{t("Planned")}</option>
                <option value="Active">{t("Active")}</option>
                <option value="Complete">{t("Complete")}</option>
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
        </div>
        <p
          className="hidden max-[600px]:flex max-[600px]:justify-end max-[600px]:items-center max-[600px]:gap-2 max-[600px]:text-[#725583] max-[600px]:text-[12px] max-[600px]:pt-3 max-[600px]:pr-0 max-[600px]:pb-1 max-[600px]:pl-0"
          data-ui="table-scroll-hint"
        >
          {t("Swipe the table to see status and actions")}{" "}
          <ArrowRight size={15} />
        </p>
        <div
          className="relative overflow-x-auto scrollbar-thin"
          data-ui="project-table-scroll"
          tabIndex={0}
          role="region"
          aria-label={t("Projects table, scroll horizontally on small screens")}
        >
          <table
            className="border-collapse w-full text-[14px] text-left min-w-141.25 [&_th]:[background:#f9f5fc] [&_th]:text-[#826891] [&_th]:font-medium [&_th]:h-10 [&_th]:pl-3 [&_th]:pr-3 [&_th_button]:flex [&_th_button]:gap-1.25 [&_th_button]:items-center [&_th_button]:[background:transparent] [&_th_button]:min-h-11 [&_th_button]:text-[14px] [&_th:first-child]:rounded-[6px_0_0_6px] [&_th:first-child]:w-[38%] [&_th:last-child]:rounded-[0_6px_6px_0] [&_th:last-child]:w-8.75 [&_td]:h-14.5 [&_td]:[border-bottom-width:1px] [&_td]:[border-bottom-style:solid] [&_td]:border-b-[#ede6f2] [&_td]:pl-3 [&_td]:pr-3 max-[768px]:min-w-145 max-[600px]:[&_td]:h-15.5 max-[600px]:[&_th_button]:min-h-11 max-[600px]:min-w-147.5 [[data-theme='dark']_&_th]:[background:#251d2e] [[data-theme='dark']_&_th]:text-[#d3c5df] [[data-theme='dark']_&_tbody_tr:hover]:[background:#241b2c] [[data-theme='dark']_&_td_strong]:text-[#f4f0f7] [&_th_button]:border-[none] [&_th_button]:border-solid"
            data-ui="project-table"
          >
            <caption className="sr-only">
              {t(
                "Fictional demo projects. Sort, change status, or remove a project.",
              )}
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  aria-sort={
                    sort === "name"
                      ? descending
                        ? "descending"
                        : "ascending"
                      : "none"
                  }
                >
                  <button
                    onClick={() => changeSort("name")}
                    disabled={!hydrated}
                  >
                    {t("Project")} <ArrowDown size={12} />
                  </button>
                </th>
                <th scope="col">{t("Service")}</th>
                <th scope="col">{t("Status")}</th>
                <th
                  scope="col"
                  aria-sort={
                    sort === "value"
                      ? descending
                        ? "descending"
                        : "ascending"
                      : "none"
                  }
                >
                  <button
                    onClick={() => changeSort("value")}
                    disabled={!hydrated}
                  >
                    {t("Value (AED)")} <ArrowDown size={12} />
                  </button>
                </th>
                <th scope="col">
                  <span className="sr-only">{t("Actions")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((record) => (
                <tr key={record.id}>
                  <td>
                    <div
                      className="flex items-center gap-2.25 [&_strong]:text-[14px] [&_strong]:font-[650] [&_strong]:block [&_small]:text-[14px] [&_small]:text-[#706079] [&_small]:block [&_small]:mt-0.5 max-[600px]:[&_strong]:text-[12px] [[data-theme='dark']_&_small]:text-[#bdb4c7]"
                      data-ui="project-cell"
                    >
                      <span
                        className="w-7 h-7 grid place-items-center [background:#f6eefb] rounded-[7px] text-[#8c609e] [font-family:var(--display)] text-[13px] in-data-[theme='dark']:[background:#302039] in-data-[theme='dark']:border-[#594169] in-data-[theme='dark']:text-[#e8bff7] border border-solid border-[#e6d9ef]"
                        data-ui="project-initial"
                      >
                        {record.client.slice(0, 1)}
                      </span>
                      <span>
                        <strong>{t(record.name)}</strong>
                        <small>{t(record.client)}</small>
                      </span>
                    </div>
                  </td>
                  <td>{t(record.category)}</td>
                  <td>
                    <button
                      className={`inline-flex items-center gap-1.25 min-h-11 [background:transparent] text-[14px] [border-top-width:none] [border-top-style:solid] [border-right-width:none] [border-right-style:solid] [border-bottom-width:none] [border-bottom-style:solid] [border-left-width:none] [border-left-style:solid] pt-1.25 pr-1.75 pb-1.25 pl-1.75 rounded-sm [&_>_span]:w-1 [&_>_span]:h-1 [&_>_span]:rounded-[50%] [&_>_span]:[background:currentColor] [@media((max-width:_600px))]:min-h-11 ${{ active: "[background:#f1e3f8] text-[#7c4093] in-data-[theme='dark']:[background:#352142] in-data-[theme='dark']:text-[#e9bcfa]", complete: "[background:#f0ebf5] text-[#6a4b7b] in-data-[theme='dark']:[background:#2d2737] in-data-[theme='dark']:text-[#d5c7e3]", pending: "" }[record.status.toLowerCase()]}`}
                      data-ui={`status-pill status-${record.status.toLowerCase()}`}
                      onClick={() => toggleStatus(record)}
                      aria-label={t(
                        "Change status of {name}, currently {status}",
                        { name: t(record.name), status: t(record.status) },
                      )}
                      disabled={!hydrated}
                    >
                      <span />
                      {t(record.status)}
                    </button>
                  </td>
                  <td
                    className="[font-variant-numeric:tabular-nums] text-[#735981]"
                    data-ui="value-cell"
                  >
                    {money(record.value)}
                  </td>
                  <td>
                    <button
                      className="min-w-11 min-h-11 [background:transparent] grid place-items-center text-[#9f86af] [&:hover]:text-[#ad3737] [&:hover]:[background:#fff3f1] [&:hover]:rounded-[5px] max-[600px]:min-h-11 border-[none] border-solid"
                      data-ui="row-action"
                      aria-label={t("Delete {name}", { name: t(record.name) })}
                      onClick={() => remove(record)}
                      disabled={!hydrated}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visible.length === 0 && (
            <div
              className="grid justify-items-center gap-3 pt-8.75 pr-8.75 pb-8.75 pl-8.75 text-[11px] text-[#7d658c] [&_button]:[text-decoration:underline] [&_button]:[background:transparent] [&_button]:min-h-11 [&_button]:border-0 [&_button]:border-solid"
              data-ui="table-empty"
            >
              <Search size={22} />
              <p>{t("No projects match your filters.")}</p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setStatus("All");
                }}
              >
                {t("Clear filters")}
              </button>
            </div>
          )}
        </div>
        <div
          className="flex items-center justify-between gap-2.5 text-[14px] text-[#706079] pt-3.5 pb-3.5 [&_>_span]:max-w-105 [&_button]:inline-flex [&_button]:items-center [&_button]:gap-1.25 [&_button]:min-h-11 [&_button]:whitespace-nowrap [&_button]:[background:transparent] [&_button]:text-[14px] [&_button]:[text-decoration:underline] max-[600px]:text-[14px] max-[600px]:items-start max-[600px]:gap-2 max-[600px]:[&_button]:min-h-11 max-[600px]:[&_button]:text-[14px] in-data-[theme='dark']:text-[#bdb4c7] [&_button]:border-[none] [&_button]:border-solid"
          data-ui="dashboard-footnote"
        >
          <span role="status">
            {t(
              notice ||
                "Sample data. Try adding, searching, sorting or changing a status.",
            )}
          </span>
          {deleted && (
            <button
              onClick={() => {
                setRecords((previous) => [...previous, deleted]);
                setNotice(t("{name} restored.", { name: t(deleted.name) }));
                setDeleted(null);
              }}
            >
              {t("Undo delete")}
            </button>
          )}
          <button
            aria-label={t("Reset demo projects")}
            disabled={!hydrated}
            onClick={() => {
              setRecords(initialRecords);
              setSearch("");
              setCategory("All");
              setStatus("All");
              setSort("name");
              setDescending(false);
              setDeleted(null);
              setNotice("Demo projects reset.");
            }}
          >
            <RotateCcw size={13} />
            {t("Reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
