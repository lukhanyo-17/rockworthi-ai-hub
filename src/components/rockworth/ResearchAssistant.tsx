import { useState } from "react";
import { researchMock } from "./mock-data";
import { FieldLabel, LoadingState, AccentButton, OutputCard, Panel, Spinner } from "./ui";

export function ResearchAssistant() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const analyze = () => {
    setLoading(true);
    setDone(false);
    setTimeout(() => {
      setDone(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <Panel
      title="AI Research Assistant"
      subtitle="Drop in a topic and get a decision-ready briefing."
    >
      <label className="block">
        <FieldLabel>Paste research topic here</FieldLabel>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={8}
          placeholder="e.g. AI productivity tool adoption in South African mid-market firms"
          className="w-full resize-y rounded-md border border-input bg-background/60 p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </label>

      <div className="mt-6">
        <AccentButton onClick={analyze} disabled={loading}>
          {loading ? (
            <>
              <Spinner /> Analyzing…
            </>
          ) : (
            "Analyze & Summarize"
          )}
        </AccentButton>
      </div>

      {loading ? <LoadingState label="Scanning sources and extracting signal" /> : null}

      {done ? (
        <>
          <OutputCard title="Key Takeaways">
            <ul className="space-y-3">
              {researchMock.takeaways.map((t, i) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="font-display font-extrabold text-primary">{i + 1}.</span>
                  {t}
                </li>
              ))}
            </ul>
          </OutputCard>

          <OutputCard title="Strategic Recommendations">
            <ul className="space-y-3">
              {researchMock.recommendations.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </OutputCard>
        </>
      ) : null}
    </Panel>
  );
}
