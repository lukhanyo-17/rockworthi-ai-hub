import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Lock, Users, Mail, Sparkles } from "lucide-react";
import { AccentButton, FieldLabel, Spinner } from "@/components/rockworth/ui";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — RockWorthi" },
      {
        name: "description",
        content:
          "RockWorthi admin area: sign in to review usage analytics, active users and AI generation trends.",
      },
      { property: "og:title", content: "Admin Dashboard — RockWorthi" },
      {
        property: "og:description",
        content: "Usage analytics and AI generation trends for the RockWorthi team.",
      },
    ],
  }),
  component: Admin,
});

const USAGE = [
  { month: "Mar", generations: 820, emails: 410 },
  { month: "Apr", generations: 1140, emails: 560 },
  { month: "May", generations: 1390, emails: 690 },
  { month: "Jun", generations: 1225, emails: 640 },
  { month: "Jul", generations: 1780, emails: 910 },
  { month: "Aug", generations: 2140, emails: 1105 },
];

const STATS = [
  { label: "Active Users", value: "1,284", delta: "+12.4% vs July", icon: Users },
  { label: "Emails Generated", value: "4,315", delta: "+21.0% vs July", icon: Mail },
  { label: "Total AI Generations", value: "8,495", delta: "Last 6 months", icon: Sparkles },
];

function Admin() {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSignedIn(true);
    }, 1200);
  };

  if (!signedIn) {
    return (
      <div className="mx-auto flex max-w-md flex-col justify-center px-5 py-16 sm:py-24">
        <div className="card-soft rounded-2xl p-8">
          <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
            <Lock className="size-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold tracking-tight">Admin Sign In</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Restricted area. Demo access — any credentials will do.
          </p>

          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <label className="block">
              <FieldLabel>Username</FieldLabel>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <label className="mt-4 block">
              <FieldLabel>Password</FieldLabel>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
              />
            </label>
            <AccentButton type="submit" disabled={loading} className="mt-6 w-full">
              {loading ? (
                <>
                  <Spinner /> Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </AccentButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Usage overview for the RockWorthi workspace.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSignedIn(false)}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map(({ label, value, delta, icon: Icon }) => (
          <div key={label} className="card-soft rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </p>
              <Icon className="size-4 text-primary" />
            </div>
            <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{delta}</p>
          </div>
        ))}
      </div>

      <div className="card-soft mt-6 rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">Total AI Generations Over 6 Months</h2>
        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={USAGE} margin={{ left: -12, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                  color: "var(--foreground)",
                }}
              />
              <Line
                type="monotone"
                dataKey="generations"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card-soft mt-6 rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold">Emails Generated per Month</h2>
        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={USAGE} margin={{ left: -12, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip
                cursor={{ fill: "var(--secondary)" }}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.75rem",
                  color: "var(--foreground)",
                }}
              />
              <Bar dataKey="emails" fill="var(--primary-glow)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
