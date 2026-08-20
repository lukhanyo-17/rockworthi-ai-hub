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
    <section className="surface-grit rounded-lg border border-border bg-card p-5 shadow-hard sm:p-7">
      <h2 className="font-display text-xl font-black uppercase tracking-tight sm:text-2xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
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
      className={`btn-accent inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 font-display text-sm font-extrabold uppercase tracking-[0.12em] disabled:cursor-not-allowed ${className}`}
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
    <div className="mt-6 flex items-center gap-3 rounded-md border border-border bg-secondary/60 px-4 py-5">
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
    <div className="mt-6 overflow-hidden rounded-md border border-primary/40 bg-secondary/50">
      <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-3">
        <span className="size-2 rounded-full bg-primary" />
        <h3 className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
          {title}
        </h3>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}