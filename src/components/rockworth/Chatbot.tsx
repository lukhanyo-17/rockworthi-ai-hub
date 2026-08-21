import { useEffect, useRef, useState } from "react";
import { chatbotReplies } from "./mock-data";
import { AccentButton, Panel, Spinner } from "./ui";

type Msg = { id: number; role: "user" | "ai"; text: string };

export function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      role: "ai",
      text: "Hi, I'm the RockWorthi workplace assistant. Ask me about drafting comms, prioritising your week, or handling a tricky internal request.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const turn = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    const text = draft.trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      const reply = chatbotReplies[turn.current % chatbotReplies.length]!;
      turn.current += 1;
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: reply }]);
      setTyping(false);
    }, 2000);
  };

  return (
    <Panel
      title="AI Workplace Chatbot"
      subtitle="A quick sounding board for everyday work questions."
    >
      <div className="h-[26rem] overflow-y-auto rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%] ${
                  m.role === "user"
                    ? "btn-accent rounded-br-sm"
                    : "rounded-bl-sm border border-border bg-card text-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {typing ? (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                RockWorthi is typing…
              </div>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask the workplace assistant…"
          aria-label="Message"
          className="w-full rounded-full border border-input bg-background/60 px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
        <AccentButton onClick={send} disabled={typing} className="shrink-0">
          {typing ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            "Send"
          )}
        </AccentButton>
      </div>
    </Panel>
  );
}
