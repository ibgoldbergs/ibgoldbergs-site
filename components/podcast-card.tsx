import Image from "next/image";

type PodcastCardProps = {
  title: string;
  hosts: string;
  description: string;
  href: string;
  image: string;
};

export function PodcastCard({
  title,
  hosts,
  description,
  href,
  image,
}: PodcastCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 rounded-lg border border-border p-4 transition-colors hover:border-muted"
    >
      <Image
        src={image}
        alt={title}
        width={72}
        height={72}
        className="shrink-0 rounded-lg"
      />
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-heading">{title}</h3>
          <span className="shrink-0 text-dim" aria-hidden="true">
            ↗
          </span>
        </div>
        <p className="mt-0.5 text-xs text-dim">{hosts}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>
    </a>
  );
}
