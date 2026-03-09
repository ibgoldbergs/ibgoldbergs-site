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
      className="flex items-center gap-3 py-2.5 transition-colors group"
    >
      <Image
        src={image}
        alt={title}
        width={36}
        height={36}
        className="shrink-0 rounded-md self-start mt-0.5"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground group-hover:text-heading transition-colors">
            {title}
          </span>
          <span className="text-xs text-dim truncate">{hosts}</span>
        </div>
        <p className="text-xs text-muted mt-0.5">{description}</p>
      </div>
      <span className="shrink-0 text-dim opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
