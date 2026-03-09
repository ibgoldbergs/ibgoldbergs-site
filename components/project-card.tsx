type ProjectCardProps = {
  title: string;
  description: string;
  role: string;
  href?: string;
};

export function ProjectCard({
  title,
  description,
  role,
  href,
}: ProjectCardProps) {
  const Wrapper = href ? "a" : "div";
  const externalProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...externalProps}
      className={`block rounded-lg border border-border p-4 transition-colors ${
        href ? "hover:border-muted" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-heading">{title}</h3>
        {href && (
          <span className="shrink-0 text-dim" aria-hidden="true">
            ↗
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-dim">{role}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </Wrapper>
  );
}
