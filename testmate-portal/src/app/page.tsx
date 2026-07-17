"use client";

import {
  Activity,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Copy,
  GitBranch,
  MonitorPlay,
  Play,
  Server,
  Settings2,
  TerminalSquare,
} from "lucide-react";
import { useMemo, useState } from "react";

const projects = ["chromium", "firefox", "webkit", "mobile-chrome"];
const environments = ["qa", "uat", "stage", "prod"];

const timeline = [
  {
    label: "Execution accepted",
    detail: "Request normalized and execution id assigned",
    status: "complete",
    time: "00:00",
  },
  {
    label: "Runner prepared",
    detail: "Environment variables and Playwright args resolved",
    status: "complete",
    time: "00:03",
  },
  {
    label: "Tests running",
    detail: "Reporter events streaming from framework artifacts",
    status: "active",
    time: "01:18",
  },
  {
    label: "Artifacts pending",
    detail: "HTML report, JSON results, traces, and event log",
    status: "pending",
    time: "--:--",
  },
];

const recentRuns = [
  {
    id: "runner-full",
    suite: "@reference",
    project: "all projects",
    result: "Passed",
    tests: "12 / 12",
    duration: "1.3m",
  },
  {
    id: "runner-smoke",
    suite: "@reference",
    project: "chromium",
    result: "Passed",
    tests: "3 / 3",
    duration: "1.2m",
  },
  {
    id: "local-dev",
    suite: "@smoke",
    project: "chromium",
    result: "Ready",
    tests: "queued",
    duration: "--",
  },
];

export default function Home() {
  const [executionId, setExecutionId] = useState("portal-local-001");
  const [environment, setEnvironment] = useState("qa");
  const [grep, setGrep] = useState("@reference");
  const [project, setProject] = useState("chromium");
  const [workers, setWorkers] = useState(2);
  const [headless, setHeadless] = useState(true);
  const [copied, setCopied] = useState(false);

  const runnerCommand = useMemo(() => {
    const projectArg = project === "all" ? "" : ` --project=${project}`;
    return `node ../playwright-enterprise/runner/run-tests.cjs --portal --execution-id=${executionId} --env=${environment} --grep=${grep}${projectArg} --workers=${workers} --headless=${headless}`;
  }, [environment, executionId, grep, headless, project, workers]);

  async function copyCommand() {
    await navigator.clipboard.writeText(runnerCommand);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#18202a]">
      <div className="border-b border-[#d9dee7] bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-md bg-[#14213d] text-white">
              <MonitorPlay size={21} aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-6">TestMate Portal</h1>
              <p className="text-sm text-[#647084]">Execution control plane</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-[#647084] sm:flex">
            <GitBranch size={16} aria-hidden="true" />
            <span>framework linked</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-6 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <section className="rounded-lg border border-[#d9dee7] bg-white">
            <div className="flex items-center gap-2 border-b border-[#e6e9ef] px-4 py-3">
              <Settings2 size={17} aria-hidden="true" />
              <h2 className="text-sm font-semibold">Execution Request</h2>
            </div>

            <div className="space-y-4 p-4">
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-wide text-[#647084]">
                  Execution ID
                </span>
                <input
                  value={executionId}
                  onChange={(event) => setExecutionId(event.target.value)}
                  className="mt-1 h-10 w-full rounded-md border border-[#cbd2dd] bg-white px-3 text-sm outline-none ring-[#2f6f73]/20 transition focus:border-[#2f6f73] focus:ring-4"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-medium uppercase tracking-wide text-[#647084]">
                    Env
                  </span>
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
                  <span className="text-xs font-medium uppercase tracking-wide text-[#647084]">
                    Project
                  </span>
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
                <span className="text-xs font-medium uppercase tracking-wide text-[#647084]">
                  Grep
                </span>
                <input
                  value={grep}
                  onChange={(event) => setGrep(event.target.value)}
                  className="mt-1 h-10 w-full rounded-md border border-[#cbd2dd] bg-white px-3 font-mono text-sm outline-none ring-[#2f6f73]/20 transition focus:border-[#2f6f73] focus:ring-4"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium uppercase tracking-wide text-[#647084]">
                  Workers
                </span>
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
                <span>Headless browser</span>
                <input
                  type="checkbox"
                  checked={headless}
                  onChange={(event) => setHeadless(event.target.checked)}
                  className="size-4 accent-[#2f6f73]"
                />
              </label>

              <button className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#2f6f73] px-4 text-sm font-semibold text-white transition hover:bg-[#285f63]">
                <Play size={16} aria-hidden="true" />
                Queue Execution
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-[#d9dee7] bg-[#18202a] text-white">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <TerminalSquare size={17} aria-hidden="true" />
              <h2 className="text-sm font-semibold">Runner Command</h2>
            </div>
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Metric label="Last run" value="12 passed" icon={<CheckCircle2 size={18} />} tone="green" />
            <Metric label="Active project" value={project === "all" ? "matrix" : project} icon={<Activity size={18} />} tone="blue" />
            <Metric label="Event sink" value="JSONL ready" icon={<Server size={18} />} tone="amber" />
          </div>

          <section className="rounded-lg border border-[#d9dee7] bg-white">
            <div className="flex flex-col gap-3 border-b border-[#e6e9ef] px-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold">Live Execution</h2>
                <p className="text-sm text-[#647084]">runner-full · portal mode · SauceDemo reference</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-[#e8f4ef] px-3 py-1 text-sm font-medium text-[#20724f]">
                <CheckCircle2 size={15} aria-hidden="true" />
                healthy
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
              <div className="border-b border-[#e6e9ef] p-4 lg:border-b-0 lg:border-r">
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div key={item.label} className="grid grid-cols-[28px_1fr_auto] gap-3">
                      <StatusDot status={item.status} />
                      <div>
                        <div className="text-sm font-semibold">{item.label}</div>
                        <div className="text-sm text-[#647084]">{item.detail}</div>
                      </div>
                      <div className="font-mono text-xs text-[#647084]">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold">Artifacts</h3>
                <div className="mt-3 space-y-2 text-sm">
                  {["artifacts/realtime/events.jsonl", "artifacts/results/results.json", "artifacts/playwright-report", "artifacts/test-results"].map((item) => (
                    <div key={item} className="rounded-md border border-[#e1e5ec] px-3 py-2 font-mono text-xs text-[#3b4656]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#d9dee7] bg-white">
            <div className="border-b border-[#e6e9ef] px-4 py-3">
              <h2 className="text-base font-semibold">Recent Runs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead className="bg-[#f8fafc] text-xs uppercase tracking-wide text-[#647084]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Execution</th>
                    <th className="px-4 py-3 font-semibold">Suite</th>
                    <th className="px-4 py-3 font-semibold">Project</th>
                    <th className="px-4 py-3 font-semibold">Tests</th>
                    <th className="px-4 py-3 font-semibold">Duration</th>
                    <th className="px-4 py-3 font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRuns.map((run) => (
                    <tr key={run.id} className="border-t border-[#edf0f5]">
                      <td className="px-4 py-3 font-mono text-xs">{run.id}</td>
                      <td className="px-4 py-3">{run.suite}</td>
                      <td className="px-4 py-3">{run.project}</td>
                      <td className="px-4 py-3">{run.tests}</td>
                      <td className="px-4 py-3">{run.duration}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#f1f5f9] px-2 py-1 text-xs font-medium">
                          {run.result === "Passed" ? <CheckCircle2 size={13} className="text-[#20724f]" /> : <Clock3 size={13} className="text-[#9b6a16]" />}
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

function Metric({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: "green" | "blue" | "amber";
}) {
  const tones = {
    green: "bg-[#e8f4ef] text-[#20724f]",
    blue: "bg-[#e9f0fb] text-[#285f9d]",
    amber: "bg-[#fff4dd] text-[#9b6a16]",
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
