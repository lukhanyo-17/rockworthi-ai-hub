import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full btn-accent">
        <span className="font-script text-2xl leading-none">RW</span>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-foreground">
        RockWorthi
      </span>
    </Link>
  );
}
