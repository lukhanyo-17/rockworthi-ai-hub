import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine, ListChecks, CalendarDays, BookOpenCheck, MessagesSquare } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RockWorthi — Elegant AI Hub for Modern Professionals" },
      {
        name: "description",
        content:
          "RockWorthi streamlines your writing, recall, research, planning and workplace questions in one calm AI workspace.",
      },
      { property: "og:title", content: "RockWorthi — Elegant AI Hub for Modern Professionals" },
      {
        property: "og:description",
        content: "Streamline your writing, recall, research and planning in seconds.",
      },
    ],
  }),
  component: Home,
});

const FEATURES = [
  {
    id: "email",
    icon: PenLine,
    title: "Smart Email Generator",
    copy: "Turn a rough idea into a send-ready email in the tone the moment calls for.",
  },
  {
    id: "notes",
    icon: ListChecks,
    title: "Meeting Notes Summarizer",
    copy: "Messy notes become an executive summary with owners, decisions and deadlines.",
  },
  {
    id: "planner",
    icon: CalendarDays,
    title: "AI Task Planner",
    copy: "Capture the week's work and get it sequenced by severity and deadline.",
  },
  {
    id: "research",
    icon: BookOpenCheck,
    title: "AI Research Assistant",
    copy: "Turn a topic into key takeaways and strategic recommendations you can act on.",
  },
  {
    id: "chat",
    icon: MessagesSquare,
    title: "AI Workplace Chatbot",
    copy: "A quick sounding board for everyday work questions and tricky internal asks.",
  },
] as const;

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const { id, icon: Icon, title, copy } = feature;
  return (
    <Link
      to="/tools"
      search={{ tool: id }}
      aria-label={`Open ${title}`}
      style={{ animationDelay: `${index * 110}ms` }}
      className="card-soft group animate-fade-up block w-full rounded-2xl p-7 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_-18px_oklch(0.45_0.03_250_/_0.45)] focus-visible:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:-translate-y-1"
    >
      <span className="grid size-11 place-items-center rounded-full bg-secondary text-muted-foreground transition-colors duration-300 group-hover:bg-accent group-hover:text-primary group-focus-visible:text-primary">
        <Icon className="size-5" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold transition-colors duration-300 group-hover:text-primary">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
    </Link>
  );
}

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
        {/* Brick layout: 3 cards on top, 2 centered beneath; single column on mobile */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
          {FEATURES.slice(0, 3).map((feature, i) => (
            <div key={feature.id} className="sm:col-span-2">
              <FeatureCard feature={feature} index={i} />
            </div>
          ))}
          <div className="hidden sm:block sm:col-span-1" />
          {FEATURES.slice(3).map((feature, i) => (
            <div key={feature.id} className="sm:col-span-2">
              <FeatureCard feature={feature} index={i + 3} />
            </div>
          ))}
          <div className="hidden sm:block sm:col-span-1" />
        </div>
      </section>
    </div>
  );
}
