"use client";

import {
  Activity,
  Boxes,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Copy,
  FileJson,
  GitBranch,
  MonitorPlay,
  Play,
  Settings2,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { useMemo, useState } from "react";

const projects = ["chromium", "firefox", "webkit", "mobile-chrome"];
const environments = ["qa", "uat", "stage", "prod"];

const navigation = [
  { label: "Dashboard", active: true },
  { label: "Executions", active: false },
  { label: "Test Suites", active: false },
  { label: "Environments", active: false },
  { label: "Artifacts", active: false },
  { label: "Settings", active: false },
];

const timeline = [
  {
    label: "Request received",
    detail: "Portal normalized the execution request payload",
    status: "complete",
    time: "00:00",
  },
  {
    label: "Runner command resolved",
    detail: "Environment, project, workers, grep, and headless flags prepared",
    status: "complete",
    time: "00:03",
  },
  {
    label: "Reporter stream attached",
    detail: "Portal event channel points to framework JSONL output",
    status: "active",
    time: "01:18",
  },
  {
    label: "Artifact collection",
    detail: "HTML report, JSON results, traces, screenshots, and videos",
    status: "pending",
    time: "--:--",
  },
];

const executionHistory = [
  {
    id: "runner-full",
    trigger: "Portal validation",
    env: "qa",
    project: "all projects",
    suite: "@reference",
    status: "Finished",
    result: "Passed",
    tests: "12 / 12",
  },
  {
    id: "runner-smoke",
    trigger: "Runner smoke",
    env: "qa",
    project: "chromium",
    suite: "@reference",
    status: "Finished",
    result: "Passed",
    tests: "3 / 3",
  },
  {
    id: "local-dev",
    trigger: "Manual request",
    env: "qa",
    project: "chromium",
    suite: "@smoke",
    status: "Staged",
    result: "Ready",
    tests: "queued",
  },
];

const artifactChannels = [
  { label: "Realtime Events", path: "artifacts/realtime/events.jsonl" },
  { label: "JSON Results", path: "artifacts/results/results.json" },
  { label: "HTML Report", path: "artifacts/playwright-report" },
  { label: "Trace Output", path: "artifacts/test-results" },
];

export default function Home() {
  const [executionId, setExecutionId] = useState("portal-local-001");
  const [environment, setEnvironment] = useState("qa");
  const [grep, setGrep] = useState("@reference");
  const [project, setProject] = useState("chromium");
  const [workers, setWorkers] = useState(2);
  const [headless, setHeadless] = useState(true);
  const [copied, setCopied] = useState(false);
  const [requestStatus, setRequestStatus] = useState(
    "Ready to stage a runner request."
  );

  const runnerCommand = useMemo(() => {
    const projectArg = project === "all" ? "" : ` --project=${project}`;
    return `node ../playwright-enterprise/runner/run-tests.cjs --portal --execution-id=${executionId} --env=${environment} --grep=${grep}${projectArg} --workers=${workers} --headless=${headless}`;
  }, [environment, executionId, grep, headless, project, workers]);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(runnerCommand);
      setRequestStatus("Runner command copied.");
    } catch {
      setRequestStatus(
        "Clipboard permission blocked. Command preview is ready to select."
      );
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function stageExecution() {
    setRequestStatus(
      `Execution ${executionId} staged for ${environment} with ${
        project === "all" ? "all projects" : project
      }.`
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#18202a]">
      <header className="border-b border-[#d9dee7] bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-[#14213d] text-white">
              <MonitorPlay size={21} aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-6">TestMate Portal</h1>
              <p className="text-sm text-[#647084]">
                Execution control plane for Playwright automation
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-[#647084] sm:flex">
            <GitBranch size={16} aria-hidden="true" />
            <span>Git deployment enabled</span>
          </div>
        </div>

        <nav className="mx-auto flex w-full max-w-7xl gap-1 overflow-x-auto px-6 pb-3">
          {navigation.map((item) => (
            <button
              key={item.label}
              className={`h-9 shrink-0 rounded-md px-3 text-sm font-medium transition ${
                item.active
                  ? "bg-[#14213d] text-white"
                  : "text-[#526176] hover:bg-[#eef2f7] hover:text-[#18202a]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <section className="rounded-lg border border-[#d9dee7] bg-white">
            <SectionHeader
              icon={<Settings2 size={17} />}
              title="Runner Request"
              subtitle="Parameters sent to the framework runner"
            />

            <div className="space-y-4 p-4">
              <label className="block">
                <FieldLabel>Execution ID</FieldLabel>
                <input
                  value={executionId}
                  onChange={(event) => setExecutionId(event.target.value)}
                  className="mt-1 h-10 w-full rounded-md border border-[#cbd2dd] bg-white px-3 text-sm outline-none ring-[#2f6f73]/20 transition focus:border-[#2f6f73] focus:ring-4"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <FieldLabel>Environment</FieldLabel>
                  <select
                    value={environment}
                    onChange={(event) => setEnvironment(event.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-[#cbd2dd] bg-white px-3 text-sm outline-none ring-[#2f6f73]/20 transition focus:border-[#2f6f73] focus:ring-4"
                  >
                    {environments.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <FieldLabel>Browser Project</FieldLabel>
                  <select
                    value={project}
                    onChange={(event) => setProject(event.target.value)}
                    className="mt-1 h-10 w-full rounded-md border border-[#cbd2dd] bg-white px-3 text-sm outline-none ring-[#2f6f73]/20 transition focus:border-[#2f6f73] focus:ring-4"
                  >
                    <option value="all">all</option>
                    {projects.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <FieldLabel>Suite Filter</FieldLabel>
                <input
                  value={grep}
                  onChange={(event) => setGrep(event.target.value)}
                  className="mt-1 h-10 w-full rounded-md border border-[#cbd2dd] bg-white px-3 font-mono text-sm outline-none ring-[#2f6f73]/20 transition focus:border-[#2f6f73] focus:ring-4"
                />
              </label>

              <label className="block">
                <FieldLabel>Parallel Workers</FieldLabel>
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={workers}
                  onChange={(event) => setWorkers(Number(event.target.value))}
                  className="mt-1 h-10 w-full rounded-md border border-[#cbd2dd] bg-white px-3 text-sm outline-none ring-[#2f6f73]/20 transition focus:border-[#2f6f73] focus:ring-4"
                />
              </label>

              <label className="flex items-center justify-between rounded-md border border-[#d9dee7] px-3 py-2 text-sm">
                <span>Headless Browser</span>
                <input
                  type="checkbox"
                  checked={headless}
                  onChange={(event) => setHeadless(event.target.checked)}
                  className="size-4 accent-[#2f6f73]"
                />
              </label>

              <button
                onClick={stageExecution}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#2f6f73] px-4 text-sm font-semibold text-white transition hover:bg-[#285f63]"
              >
                <Play size={16} aria-hidden="true" />
                Stage Execution Request
              </button>

              <div className="rounded-md border border-[#d9dee7] bg-[#f8fafc] px-3 py-2 text-sm text-[#3b4656]">
                {requestStatus}
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#d9dee7] bg-[#18202a] text-white">
            <SectionHeader
              icon={<TerminalSquare size={17} />}
              title="Runner Command"
              subtitle="Backend-safe command contract"
              dark
            />
            <div className="p-4">
              <pre className="max-h-44 overflow-auto whitespace-pre-wrap break-words rounded-md bg-black/25 p-3 font-mono text-xs leading-5 text-[#dbe7e9]">
                {runnerCommand}
              </pre>
              <button
                onClick={copyCommand}
                className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md border border-white/15 px-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Copy size={15} aria-hidden="true" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </section>
        </aside>

        <section className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Metric
              label="Execution Status"
              value="Ready"
              icon={<ShieldCheck size={18} />}
              tone="green"
            />
            <Metric
              label="Selected Project"
              value={project === "all" ? "matrix" : project}
              icon={<Activity size={18} />}
              tone="blue"
            />
            <Metric
              label="Event Reporter"
              value="JSONL"
              icon={<FileJson size={18} />}
              tone="amber"
            />
            <Metric
              label="Framework Runner"
              value="linked"
              icon={<Boxes size={18} />}
              tone="slate"
            />
          </div>

          <section className="rounded-lg border border-[#d9dee7] bg-white">
            <div className="flex flex-col gap-3 border-b border-[#e6e9ef] px-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold">Execution Overview</h2>
                <p className="text-sm text-[#647084]">
                  {executionId} · {environment} · {grep} ·{" "}
                  {project === "all" ? "browser matrix" : project}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-[#e8f4ef] px-3 py-1 text-sm font-medium text-[#20724f]">
                <CheckCircle2 size={15} aria-hidden="true" />
                request ready
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
              <div className="border-b border-[#e6e9ef] p-4 lg:border-b-0 lg:border-r">
                <h3 className="mb-4 text-sm font-semibold">Execution Lifecycle</h3>
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[28px_1fr_auto] gap-3"
                    >
                      <StatusDot status={item.status} />
                      <div>
                        <div className="text-sm font-semibold">{item.label}</div>
                        <div className="text-sm text-[#647084]">{item.detail}</div>
                      </div>
                      <div className="font-mono text-xs text-[#647084]">
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold">Artifact Channels</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {artifactChannels.map((item) => (
                    <div
                      key={item.path}
                      className="rounded-md border border-[#e1e5ec] px-3 py-2"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wide text-[#647084]">
                        {item.label}
                      </div>
                      <div className="mt-1 font-mono text-xs text-[#3b4656]">
                        {item.path}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#d9dee7] bg-white">
            <div className="border-b border-[#e6e9ef] px-4 py-3">
              <h2 className="text-base font-semibold">Execution History</h2>
              <p className="mt-1 text-sm text-[#647084]">
                Runs shown here reflect the current framework validation baseline.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] border-collapse text-left text-sm">
                <thead className="bg-[#f8fafc] text-xs uppercase tracking-wide text-[#647084]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Run ID</th>
                    <th className="px-4 py-3 font-semibold">Trigger</th>
                    <th className="px-4 py-3 font-semibold">Environment</th>
                    <th className="px-4 py-3 font-semibold">Browser Project</th>
                    <th className="px-4 py-3 font-semibold">Suite Filter</th>
                    <th className="px-4 py-3 font-semibold">Tests</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {executionHistory.map((run) => (
                    <tr key={run.id} className="border-t border-[#edf0f5]">
                      <td className="px-4 py-3 font-mono text-xs">{run.id}</td>
                      <td className="px-4 py-3">{run.trigger}</td>
                      <td className="px-4 py-3">{run.env}</td>
                      <td className="px-4 py-3">{run.project}</td>
                      <td className="px-4 py-3 font-mono text-xs">{run.suite}</td>
                      <td className="px-4 py-3">{run.tests}</td>
                      <td className="px-4 py-3">{run.status}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#f1f5f9] px-2 py-1 text-xs font-medium">
                          {run.result === "Passed" ? (
                            <CheckCircle2 size={13} className="text-[#20724f]" />
                          ) : (
                            <Clock3 size={13} className="text-[#9b6a16]" />
                          )}
                          {run.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`border-b px-4 py-3 ${
        dark ? "border-white/10" : "border-[#e6e9ef]"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <p className={`mt-1 text-xs ${dark ? "text-white/60" : "text-[#647084]"}`}>
        {subtitle}
      </p>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium uppercase tracking-wide text-[#647084]">
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: "green" | "blue" | "amber" | "slate";
}) {
  const tones = {
    green: "bg-[#e8f4ef] text-[#20724f]",
    blue: "bg-[#e9f0fb] text-[#285f9d]",
    amber: "bg-[#fff4dd] text-[#9b6a16]",
    slate: "bg-[#edf1f5] text-[#3b4656]",
  };

  return (
    <div className="rounded-lg border border-[#d9dee7] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-[#647084]">{label}</div>
          <div className="mt-1 text-xl font-semibold">{value}</div>
        </div>
        <div className={`flex size-9 items-center justify-center rounded-md ${tones[tone]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  if (status === "complete") {
    return (
      <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-[#e8f4ef] text-[#20724f]">
        <CheckCircle2 size={15} aria-hidden="true" />
      </div>
    );
  }

  if (status === "active") {
    return (
      <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-[#e9f0fb] text-[#285f9d]">
        <Activity size={15} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-[#fff4dd] text-[#9b6a16]">
      <CircleAlert size={15} aria-hidden="true" />
    </div>
  );
}
