import { useState } from "react";
import { summaryMock } from "./mock-data";
import { FieldLabel, LoadingState, AccentButton, OutputCard, Panel, Spinner } from "./ui";

export function NotesSummarizer() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const summarize = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setDone(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <Panel
      title="Meeting Notes Summarizer"
      subtitle="Drop in messy notes and get a clean brief your team can act on."
    >
      <label className="block">
        <FieldLabel>Paste Raw Meeting Notes Here</FieldLabel>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={10}
          placeholder="Thandi: we're tight on QA… Sipho mentioned vendor latency… budget check with finance…"
          className="w-full resize-y rounded-md border border-input bg-background/60 p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </label>

      <div className="mt-6">
        <AccentButton onClick={summarize} disabled={loading}>
          {loading ? (
            <>
              <Spinner /> Summarizing…
            </>
          ) : (
            "Summarize Notes"
          )}
        </AccentButton>
      </div>

      {loading ? <LoadingState label="Extracting decisions and owners" /> : null}

      {done ? (
        <>
          <OutputCard title="Executive Summary">
            <p className="text-sm leading-relaxed text-foreground">{summaryMock.executive}</p>
          </OutputCard>

          <OutputCard title="Action Items, Decisions & Deadlines">
            <ul className="space-y-3">
              {summaryMock.items.map((item, i) => (
                <li key={item.label}>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={!!checked[i]}
                      onChange={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                      className="mt-1 size-4 shrink-0 accent-primary"
                    />
                    <span>
                      <span
                        className={`block text-sm font-medium text-foreground ${checked[i] ? "line-through opacity-60" : ""}`}
                      >
                        {item.label}
                      </span>
                      <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {item.meta}
                      </span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </OutputCard>
        </>
      ) : null}
    </Panel>
  );
}