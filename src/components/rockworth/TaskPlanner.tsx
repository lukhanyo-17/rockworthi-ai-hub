import { useState } from "react";
import { scheduleBuckets } from "./mock-data";
import { FieldLabel, LoadingState, AccentButton, OutputCard, Panel, Spinner } from "./ui";

type Task = { text: string; due: string };

export function TaskPlanner() {
  const [draft, setDraft] = useState("");
  const [due, setDue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<{ title: string; window: string; items: string[] }[]>([]);

  const addTask = () => {
    const t = draft.trim();
    if (!t) return;
    setTasks((prev) => [...prev, { text: t, due }]);
    setDraft("");
    setDue("");
  };

  const formatDue = (value: string) =>
    value
      ? new Date(value).toLocaleString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No deadline set";

  const generate = () => {
    setLoading(true);
    setSchedule([]);
    setTimeout(() => {
      setSchedule(
        scheduleBuckets.map((bucket, i) => {
          const owned = tasks
            .filter((_, idx) => idx % 3 === i)
            .map((t) => `${t.text} — due ${formatDue(t.due)}`);
          return {
            title: bucket.title,
            window: bucket.window,
            items: owned.length ? owned : bucket.fallback,
          };
        }),
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <Panel
      title="AI Task Planner"
      subtitle="Capture the week's work, then let RockWorthi sequence it by priority."
    >
      <FieldLabel>Add a task</FieldLabel>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="e.g. Rewrite the Q3 client timeline note"
          className="w-full rounded-md border border-input bg-background/60 p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
        <input
          type="datetime-local"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          aria-label="Task date and time"
          className="shrink-0 rounded-md border border-input bg-background/60 p-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40 sm:w-56"
        />
        <button
          type="button"
          onClick={addTask}
          className="shrink-0 rounded-md border border-primary/50 px-5 py-3 font-display text-xs font-extrabold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/10"
        >
          Add Task
        </button>
      </div>

      {tasks.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tasks.map((t, i) => (
            <li
              key={`${t.text}-${i}`}
              className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-foreground"
            >
              <span>
                {t.text}
                <span className="ml-2 text-muted-foreground">{formatDue(t.due)}</span>
              </span>
              <button
                type="button"
                aria-label={`Remove ${t.text}`}
                onClick={() => setTasks((prev) => prev.filter((_, idx) => idx !== i))}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-xs text-muted-foreground">
          No tasks yet — add a few with dates, or generate a sample week.
        </p>
      )}


      <div className="mt-6">
        <AccentButton onClick={generate} disabled={loading}>
          {loading ? (
            <>
              <Spinner /> Building schedule…
            </>
          ) : (
            "Generate Weekly Schedule"
          )}
        </AccentButton>
      </div>

      {loading ? <LoadingState label="Ranking tasks by severity and deadline" /> : null}

      {schedule.length ? (
        <>
        <OutputCard title="How this week was prioritised">
          <p className="text-sm leading-relaxed text-foreground">
            Tasks were ranked first by severity — client-visible and blocking work outranks internal
            admin — and then by deadline proximity, with anything due in the next 24 hours pulled
            into the morning deep-focus block. Lower-severity items with distant deadlines are
            batched together to protect your focus time.
          </p>
        </OutputCard>
        <div className="grid gap-4 lg:grid-cols-3">

          {schedule.map((bucket) => (
            <OutputCard key={bucket.title} title={bucket.title}>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {bucket.window}
              </p>
              <ul className="mt-3 space-y-2">
                {bucket.items.map((item, i) => (
                  <li key={`${item}-${i}`} className="flex gap-2 text-sm text-foreground">
                    <span className="font-display font-extrabold text-primary">{i + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </OutputCard>
          ))}
        </div>
        </>
      ) : null}

    </Panel>
  );
}