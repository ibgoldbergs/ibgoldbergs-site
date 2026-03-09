import { SOCIAL, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-dim">
        &copy; {new Date().getFullYear()} {SITE.name}
      </p>
      <div className="flex gap-4">
        <a
          href={SOCIAL.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted transition-colors hover:text-foreground"
          aria-label="LinkedIn"
        >
          LinkedIn
          <span className="ml-0.5 text-dim" aria-hidden="true">
            &nearr;
          </span>
        </a>
        <a
          href={SOCIAL.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted transition-colors hover:text-foreground"
          aria-label="X (Twitter)"
        >
          X
          <span className="ml-0.5 text-dim" aria-hidden="true">
            &nearr;
          </span>
        </a>
        <a
          href={`mailto:${SITE.email}`}
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
