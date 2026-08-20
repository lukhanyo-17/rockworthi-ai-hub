import type { ReactNode } from "react";

export function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="card-soft rounded-2xl p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </span>
  );
}

export function AccentButton({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-accent inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function Spinner() {
  return (
    <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-secondary px-4 py-5">
      <span className="inline-block size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">Analyzing context and drafting output…</p>
      </div>
    </div>
  );
}

export function OutputCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-secondary/40">
      <div className="flex items-center gap-2 border-b border-border bg-card px-5 py-3">
        <span className="size-2 rounded-full bg-primary" />
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{title}</h3>
      </div>
      <div className="bg-card p-5">{children}</div>
    </div>
  );
}
