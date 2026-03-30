"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import tempImage from "@/app/temp.jpg";
import tempImageTwo from "@/app/temp2.png";

type ProjectFilter = "featured" | "all" | "hackathons";

interface ProjectItem {
  slug: string;
  title: string;
  note: string;
  image: StaticImageData;
  featured: boolean;
  hackathon: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    slug: "athena-hq",
    title: "AthenaHQ",
    note: "Backed by Y Combinator (W25)",
    image: tempImage,
    featured: true,
    hackathon: false,
  },
  {
    slug: "blueprint-nfc",
    title: "BluePrint NFC",
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
  const [activeHoverSlug, setActiveHoverSlug] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
      <div className="space-y-2">
        <p className="text-[1rem] uppercase tracking-[0.20em] leading-none text-muted">
          projects
        </p>

        <div className="flex items-center gap-2 text-[0.96rem] leading-none tracking-[-0.01em] sm:text-[0.8rem]">
          {(Object.keys(FILTER_LABELS) as ProjectFilter[]).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                className={`inline-flex items-baseline gap-[0.14em] font-normal transition-colors duration-150 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground/80"
                }`}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
              >
                <span>{FILTER_LABELS[filter]}</span>
                <span>({getCount(filter)})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {filteredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/project/${project.slug}`}
            className="group relative block focus:outline-none"
            onMouseEnter={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setMousePosition({
                x: rect.width / 2,
                y: rect.height * 0.35,
              });
              setActiveHoverSlug(project.slug);
            }}
            onMouseLeave={() => setActiveHoverSlug(null)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setMousePosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
            }}
            onFocus={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setMousePosition({
                x: rect.width / 2,
                y: rect.height * 0.35,
              });
              setActiveHoverSlug(project.slug);
            }}
            onBlur={() => setActiveHoverSlug(null)}
          >
            <article className="space-y-2.5">
              <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.82]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[0.80rem] leading-snug text-foreground sm:text-[0.8rem]">
                  {project.title}
                </h4>
                <p className="text-[0.7rem] leading-relaxed text-muted">
                  {project.note}
                </p>
              </div>
            </article>

            <AnimatePresence>
              {activeHoverSlug === project.slug ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="pointer-events-none absolute hidden sm:flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-foreground shadow-lg"
                  style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: "translate(-50%, -145%)",
                  }}
                >
                  View More
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Link>
        ))}
      </div>
    </div>
  );
}
