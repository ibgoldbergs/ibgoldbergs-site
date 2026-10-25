import type { CSSProperties, ReactNode } from "react";

// Content is visible in the server HTML. CSS adds movement only when requested.
export function AnimateIn({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="animate-in"
      style={{ "--entrance-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
