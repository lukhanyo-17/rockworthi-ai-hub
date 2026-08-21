import { useState } from "react";
import { emailMocks, type Tone } from "./mock-data";
import { FieldLabel, LoadingState, AccentButton, OutputCard, Panel, Spinner } from "./ui";

export function EmailGenerator() {
  const [sender, setSender] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ subject: string; body: string; tone: Tone } | null>(null);

  const generate = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult({ ...emailMocks[tone], tone });
      setLoading(false);
    }, 2000);
  };

  return (
    <Panel
      title="Smart Email Generator"
      subtitle="Turn a rough idea into a send-ready email in seconds."
    >
      <label className="block max-w-md">
        <FieldLabel>Sender's Name</FieldLabel>
        <input
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          placeholder="e.g. Lukhanyo Manciya"
          className="w-full rounded-md border border-input bg-background/60 p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </label>

      <label className="mt-4 block">
        <FieldLabel>What is this email about?</FieldLabel>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={5}
          placeholder="e.g. Ask the client to approve a one-week shift on the Q3 integration milestone"
          className="w-full resize-y rounded-md border border-input bg-background/60 p-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </label>


      <label className="mt-4 block max-w-xs">
        <FieldLabel>Select Tone</FieldLabel>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as Tone)}
          className="w-full rounded-md border border-input bg-background/60 p-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
        >
          <option value="Formal">Formal</option>
          <option value="Friendly">Friendly</option>
          <option value="Persuasive">Persuasive</option>
        </select>
      </label>

      <div className="mt-6">
        <AccentButton onClick={generate} disabled={loading}>
          {loading ? (
            <>
              <Spinner /> Generating…
            </>
          ) : (
            "Generate Email"
          )}
        </AccentButton>
      </div>

      {loading ? <LoadingState label="Drafting your email" /> : null}

      {result ? (
        <OutputCard title={`${result.tone} draft`}>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Subject</p>
          <p className="mt-1 font-display text-base font-extrabold text-foreground">
            {result.subject}
          </p>
          <hr className="my-4 border-border" />
          <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed text-foreground">
            {result.body}
          </pre>
        </OutputCard>
      ) : null}
    </Panel>
  );
}