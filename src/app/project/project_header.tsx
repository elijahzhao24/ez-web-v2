import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

interface ProjectHeaderProps {
  title: string;
  role: string;
  year: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  description: string;
  techStack?: string[];
  sourceCodeUrl?: string;
  sourceCodeLabel?: string;
  websiteUrl?: string;
  websiteLabel?: string;
}

const META_ITEMS = [
  { label: "Title", key: "title" },
  { label: "Role", key: "role" },
  { label: "Year", key: "year" },
] as const;

export default function ProjectHeader({
  title,
  role,
  year,
  imageSrc,
  imageAlt,
  description,
  techStack,
  sourceCodeUrl,
  sourceCodeLabel,
  websiteUrl,
  websiteLabel,
}: ProjectHeaderProps) {
  const values = { title, role, year };
  const links = [
    sourceCodeUrl
      ? {
          href: sourceCodeUrl,
          label: sourceCodeLabel ?? "View on GitHub",
          icon: <GithubIcon />,
        }
      : null,
    websiteUrl
      ? {
          href: websiteUrl,
          label: websiteLabel ?? formatWebsiteLabel(websiteUrl),
          icon: <GlobeIcon />,
        }
      : null,
  ].filter((item): item is { href: string; label: string; icon: ReactNode } =>
    Boolean(item),
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex max-w-[34rem] items-start gap-2 sm:gap-8">
        {META_ITEMS.map((item) => (
          <div key={item.key} className="shrink-0 space-y-0.5">
            <span className="block text-xs uppercase tracking-[0.32em] text-muted sm:text-[0.6rem]">
              {item.label}
            </span>
            <h2 className="text-[0.76rem] font-normal leading-tight tracking-[-0.01em] text-foreground sm:text-[0.9rem]">
              {values[item.key]}
            </h2>
          </div>
        ))}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-surface/10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>

      <p className="max-w-[44rem] text-[1.04rem] leading-[1.5] tracking-[-0.01em] text-foreground/95 font-[400] sm:text-[1.1rem]">
        {description}
      </p>

      {techStack && techStack.length > 0 && (
        <ul className="flex w-full max-w-[44rem] flex-wrap gap-1.5">
          {techStack.map((item) => (
            <li
              key={item}
              className="whitespace-nowrap rounded-lg border border-border/70 bg-surface/70 px-2 py-1 text-[0.6rem] leading-tight text-foreground/95"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 text-[0.8rem] text-foreground/85 transition-colors hover:text-foreground"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function formatWebsiteLabel(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return "Visit website";
  }
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[0.9rem] w-[0.9rem] fill-current"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.15-1.1-1.45-1.1-1.45-.9-.6.07-.59.07-.59 1 .08 1.53 1.03 1.53 1.03.88 1.52 2.31 1.08 2.87.82.09-.64.35-1.08.63-1.33-2.23-.25-4.57-1.12-4.57-4.95 0-1.1.39-2 1.03-2.72-.1-.25-.45-1.27.1-2.65 0 0 .85-.27 2.78 1.03A9.66 9.66 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.93-1.3 2.78-1.03 2.78-1.03.55 1.38.2 2.4.1 2.65.65.72 1.04 1.63 1.04 2.72 0 3.84-2.34 4.7-4.58 4.95.36.31.68.92.68 1.86v2.23c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[0.9rem] w-[0.9rem] fill-none stroke-current"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" />
    </svg>
  );
}
