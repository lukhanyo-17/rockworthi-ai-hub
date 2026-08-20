import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EmailGenerator } from "@/components/rockworth/EmailGenerator";
import { NotesSummarizer } from "@/components/rockworth/NotesSummarizer";
import { TaskPlanner } from "@/components/rockworth/TaskPlanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RockWorth — AI Workplace Productivity Hub" },
      {
        name: "description",
        content:
          "RockWorth drafts smart emails, summarizes meeting notes, and builds your weekly schedule — one dark, focused workspace.",
      },
      { property: "og:title", content: "RockWorth — AI Workplace Productivity Hub" },
      {
        property: "og:description",
        content:
          "Smart Email Generator, Meeting Notes Summarizer, and AI Task Planner in one premium workspace.",
      },
    ],
  }),
  component: Index,
});

const TOOLS = [
  { id: "email", label: "Email Generator", tag: "01" },
  { id: "notes", label: "Notes Summarizer", tag: "02" },
  { id: "planner", label: "Task Planner", tag: "03" },
] as const;

type ToolId = (typeof TOOLS)[number]["id"];

function Index() {
  const [active, setActive] = useState<ToolId>("email");

  return (
    <div className="min-h-screen lg:flex">
      <aside className="surface-grit border-b border-sidebar-border bg-sidebar lg:min-h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 px-5 py-5 lg:px-6 lg:py-7">
          <span className="grid size-10 place-items-center rounded-md btn-orange font-display text-lg font-black">
            R
          </span>
          <div>
            <h1 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-foreground">
              Rock<span className="text-gradient-orange">Worth</span>
            </h1>
            <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              AI Productivity Hub
            </p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:flex-col lg:overflow-visible lg:px-4 lg:pb-6">
          {TOOLS.map((tool) => {
            const isActive = tool.id === active;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActive(tool.id)}
                aria-current={isActive ? "page" : undefined}
                className={`flex shrink-0 items-center gap-3 rounded-md px-4 py-3 text-left font-display text-xs font-extrabold uppercase tracking-[0.12em] transition-colors lg:w-full ${
                  isActive
                    ? "btn-orange"
                    : "border border-transparent text-muted-foreground hover:border-border hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <span className="opacity-70">{tool.tag}</span>
                {tool.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden px-6 pb-8 lg:block">
          <div className="rounded-md border border-border bg-card/70 p-4">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
              Demo mode
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Outputs are simulated with realistic sample results so every flow is fully testable.
            </p>
          </div>
        </div>
      </aside>

      <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.3em] text-primary">
            Workspace
          </p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Three sharp tools for the work that eats your week: writing, recall, and planning.
          </p>

          <div className="mt-6">
            {active === "email" ? <EmailGenerator /> : null}
            {active === "notes" ? <NotesSummarizer /> : null}
            {active === "planner" ? <TaskPlanner /> : null}
          </div>

          <footer className="mt-10 border-t border-border pt-5 text-xs text-muted-foreground">
            RockWorth · Simulated AI outputs for demonstration purposes.
          </footer>
        </div>
      </main>
    </div>
  );
}
