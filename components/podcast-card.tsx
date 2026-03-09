import Image from "next/image";

type PodcastCardProps = {
  title: string;
  hosts: string;
  href: string;
  image: string;
};

export function PodcastCard({ title, hosts, href, image }: PodcastCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 py-1.5 transition-colors group"
    >
      <Image
        src={image}
        alt={title}
        width={32}
        height={32}
        className="shrink-0 rounded-md"
      />
      <span className="text-sm text-foreground group-hover:text-heading transition-colors">
        {title}
      </span>
      <span className="text-sm text-dim">{hosts}</span>
      <span className="ml-auto shrink-0 text-dim opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
