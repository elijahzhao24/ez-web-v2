import Image, { type StaticImageData } from "next/image";

interface ProjectHeaderProps {
  title: string;
  role: string;
  year: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  description: string;
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
}: ProjectHeaderProps) {
  const values = { title, role, year };

  return (
    <div className="space-y-5 sm:space-y-6">
        <div className="space-y-2">
            <div className="flex max-w-[34rem] items-start gap-2 sm:gap-8">
                {META_ITEMS.map((item) => (
                <div key={item.key} className="shrink-0 space-y-1">
                    <span className="block font-serif text-[0.65rem] leading-none text-muted/85 sm:text-[0.75rem]">
                    {item.label}
                    </span>
                    <h2 className="font-serif text-[0.7rem] font-normal leading-tight tracking-[-0.01em] text-foreground sm:text-[0.8rem]">
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
      </div>

      <p className="max-w-[44rem] font-serif text-[1.04rem] leading-[1.5] tracking-[-0.01em] text-foreground/95 sm:text-[1.1rem]">
        {description}
      </p>
    </div>
  );
}
