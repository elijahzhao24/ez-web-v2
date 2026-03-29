"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import tempImage from "@/app/temp.jpg";
import tempImageTwo from "@/app/temp2.png";

type ProjectFilter = "featured" | "all" | "hackathons";

interface ProjectItem {
  slug: string;
  title: string;
  summary: string;
  note: string;
  image: StaticImageData;
  featured: boolean;
  hackathon: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    slug: "athena-hq",
    title: "AthenaHQ",
    summary:
      "Built an end-to-end onboarding flow with TypeScript, React, and AI SDK to speed up customer setup.",
    note: "Backed by Y Combinator (W25)",
    image: tempImage,
    featured: true,
    hackathon: false,
  },
  {
    slug: "blueprint-nfc",
    title: "BluePrint NFC",
    summary:
      "Shipped an NFC-based networking workflow and event check-in experience for high-volume campus events.",
    note: "CUS Conference of the Year 2025",
    image: tempImageTwo,
    featured: false,
    hackathon: true,
  },
];

const FILTER_LABELS: Record<ProjectFilter, string> = {
  featured: "Featured",
  all: "All",
  hackathons: "Hackathons",
};

function getCount(filter: ProjectFilter) {
  if (filter === "all") {
    return PROJECTS.length;
  }

  if (filter === "featured") {
    return PROJECTS.filter((project) => project.featured).length;
  }

  return PROJECTS.filter((project) => project.hackathon).length;
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("featured");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return PROJECTS;
    }

    if (activeFilter === "featured") {
      return PROJECTS.filter((project) => project.featured);
    }

    return PROJECTS.filter((project) => project.hackathon);
  }, [activeFilter]);

  return (
    <div className="space-y-4">
      <div className="space-y-0.5 text-center">
        <p className="text-xs uppercase tracking-[0.32em] leading-none text-muted">
          selected work
        </p>
        <h3 className="text-base font-medium leading-tight text-foreground sm:text-[1.5rem]">
          projects
        </h3>
      </div>

      <div className="flex items-center gap-3 text-[0.96rem] sm:text-[1.02rem]">
        {(Object.keys(FILTER_LABELS) as ProjectFilter[]).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              className={`transition-colors duration-150 ${
                isActive
                  ? "text-foreground"
                  : "text-muted hover:text-foreground/80"
              }`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={isActive}
            >
              {FILTER_LABELS[filter]} ({getCount(filter)})
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="group block focus:outline-none"
          >
            <article className="space-y-2.5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-[1.04rem] leading-snug text-foreground sm:text-[1.18rem]">
                  {project.title}
                </h4>
                <p className="text-[0.95rem] leading-relaxed text-foreground/90">
                  {project.summary}
                </p>
                <p className="text-[0.83rem] leading-relaxed text-muted">
                  {project.note}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
