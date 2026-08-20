import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine, ListChecks, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RockWorthi — Elegant AI Hub for Modern Professionals" },
      {
        name: "description",
        content:
          "RockWorthi streamlines your writing, recall, and planning in seconds with a calm, elegant AI workspace.",
      },
      { property: "og:title", content: "RockWorthi — Elegant AI Hub for Modern Professionals" },
      {
        property: "og:description",
        content: "Streamline your writing, recall, and planning in seconds.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    icon: PenLine,
    title: "Smart Email Generator",
    copy: "Turn a rough idea into a send-ready email in the tone the moment calls for.",
  },
  {
    icon: ListChecks,
    title: "Meeting Notes Summarizer",
    copy: "Messy notes become an executive summary with owners, decisions and deadlines.",
  },
  {
    icon: CalendarDays,
    title: "AI Task Planner",
    copy: "Capture the week's work and get it sequenced by priority and energy.",
  },
];

function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            AI Productivity Hub
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            RockWorthi: The elegant AI hub for{" "}
            <span className="text-gradient-accent">modern professionals</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Streamline your writing, recall, and planning in seconds — in one calm, uncluttered
            workspace built for people who take their work seriously.
          </p>
          <div className="mt-9">
            <Link
              to="/tools"
              className="btn-accent inline-flex items-center justify-center rounded-full px-9 py-4 text-sm font-semibold tracking-wide"
            >
              Access AI Tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="card-soft rounded-2xl p-7">
              <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
