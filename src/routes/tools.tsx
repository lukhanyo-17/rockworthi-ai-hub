import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EmailGenerator } from "@/components/rockworth/EmailGenerator";
import { NotesSummarizer } from "@/components/rockworth/NotesSummarizer";
import { TaskPlanner } from "@/components/rockworth/TaskPlanner";
import { ResearchAssistant } from "@/components/rockworth/ResearchAssistant";
import { Chatbot } from "@/components/rockworth/Chatbot";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "AI Tools — RockWorthi" },
      {
        name: "description",
        content:
          "Draft emails, summarize meeting notes, research topics, chat with the workplace assistant, and plan your week with RockWorthi.",
      },
      { property: "og:title", content: "AI Tools — RockWorthi" },
      {
        property: "og:description",
        content:
          "Email Generator, Notes Summarizer, Task Planner, Research Assistant and Workplace Chatbot.",
      },
    ],
  }),
  component: Tools,
  validateSearch: (search: Record<string, unknown>): { tool?: TabId } => {
    const tool = search["tool"];
    return typeof tool === "string" &&
      ["email", "notes", "planner", "research", "chat"].includes(tool)
      ? { tool: tool as TabId }
      : {};
  },
});

const TABS = [
  { id: "email", label: "Email Generator" },
  { id: "notes", label: "Notes Summarizer" },
  { id: "planner", label: "Task Planner" },
  { id: "research", label: "Research Assistant" },
  { id: "chat", label: "Workplace Chatbot" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Tools() {
  const { tool } = Route.useSearch();
  const [active, setActive] = useState<TabId>(tool ?? "email");

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">AI Tools</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Five refined tools for the work that eats your week: writing, recall, research, planning and
        quick answers.
      </p>

      <div
        role="tablist"
        aria-label="AI tools"
        className="mt-7 flex gap-2 overflow-x-auto rounded-full border border-border bg-card p-1.5"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "btn-accent"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-7">
        {active === "email" ? <EmailGenerator /> : null}
        {active === "notes" ? <NotesSummarizer /> : null}
        {active === "planner" ? <TaskPlanner /> : null}
        {active === "research" ? <ResearchAssistant /> : null}
        {active === "chat" ? <Chatbot /> : null}
      </div>
    </div>
  );
}
