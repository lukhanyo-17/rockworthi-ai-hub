import { useState } from "react";
import { scheduleBuckets } from "./mock-data";
import { FieldLabel, LoadingState, OrangeButton, OutputCard, Panel, Spinner } from "./ui";

export function TaskPlanner() {
  const [draft, setDraft] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<{ title: string; window: string; items: string[] }[]>([]);

  const addTask = () => {
    const t = draft.trim();
    if (!t) return;
    setTasks((prev) => [...prev, t]);
    setDraft("");
  };

  const generate = () => {
    setLoading(true);
    setSchedule([]);
    setTimeout(() => {
      setSchedule(
        scheduleBuckets.map((bucket, i) => {
          const owned = tasks.filter((_, idx) => idx % 3 === i);
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
      subtitle="Capture the week's work, then let RockWorth sequence it by priority."
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
              key={`${t}-${i}`}
              className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-foreground"
            >
              {t}
              <button
                type="button"
                aria-label={`Remove ${t}`}
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
          No tasks yet — add a few, or generate a sample week.
        </p>
      )}

      <div className="mt-6">
        <OrangeButton onClick={generate} disabled={loading}>
          {loading ? (
            <>
              <Spinner /> Building schedule…
            </>
          ) : (
            "Generate Weekly Schedule"
          )}
        </OrangeButton>
      </div>

      {loading ? <LoadingState label="Ranking tasks by impact and effort" /> : null}

      {schedule.length ? (
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
      ) : null}
    </Panel>
  );
}