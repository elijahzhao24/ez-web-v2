"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import bizbot from "@/app/images/projects/bizbotprofile.png";
import bucsFighter from "@/app/images/projects/bucsFighter.webp";
import connectFour from "@/app/images/projects/connectfour.webp";
import datasetProject from "@/app/images/projects/dataset_project.png";
import kickfund from "@/app/images/projects/kickfund.webp";
import lecruiter from "@/app/images/projects/lecruiter.webp";
import nbasalary from "@/app/images/projects/nbasalary.webp";
import blueprintMatchingQuiz from "@/app/images/projects/project-blueprint.webp";
import pvzClone from "@/app/images/projects/pvzclone.webp";
import rememberMe from "@/app/images/projects/remeberMe.webp";

type ProjectFilter = "featured" | "all" | "hackathons" | "production";

interface ProjectItem {
  slug: string;
  title: string;
  note: string;
  image: StaticImageData;
  featured: boolean;
  hackathon: boolean;
  production: boolean;
  badgeText?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    slug: "bizbot",
    title: "BizBot",
    note: "An autonomous event photography robot",
    image: bizbot,
    featured: true,
    hackathon: true,
    production: false,
    badgeText: "winner 🏆",
  },
  {
    slug: "dataset-curation-pipeline",
    title: "Dataset Curation Pipeline",
    note: "Scalable dataset curation with dedupe, diversity sampling, and semantic retrieval.",
    image: datasetProject,
    featured: true,
    hackathon: false,
    production: true,
  },
  {
    slug: "kickfund",
    title: "KickFund",
    note: "Investment market judging system for UBC KickStart",
    image: kickfund,
    featured: true,
    hackathon: false,
    production: true,
  },
  {
    slug: "bucs-fighter",
    title: "BUCS Fighter",
    note: "Super smash bros but with BUCS characters.",
    image: bucsFighter,
    featured: true,
    hackathon: true,
    production: false,
    badgeText: "winner 🏆",
  },
  {
    slug: "blueprint-matching-quiz",
    title: "Blueprint Matching Quiz",
    note: "Matching 200 students with networking delegates using cosine similarity algorithms.",
    image: blueprintMatchingQuiz,
    featured: true,
    hackathon: false,
    production: true,
  },
  {
    slug: "lecruiterai",
    title: "leCruiter AI",
    note: "Practice software interviews with Lebron",
    image: lecruiter,
    featured: false,
    hackathon: true,
    production: false,
  },
  {
    slug: "nbasalary",
    title: "NBA Salary",
    note: "Interactive salary cap visualizer for all NBA teams",
    image: nbasalary,
    featured: true,
    hackathon: false,
    production: true,
  },
  {
    slug: "remember-me",
    title: "Remember Me",
    note: "Assistive camera companion for Alzheimer's care",
    image: rememberMe,
    featured: false,
    hackathon: true,
    production: false,
  },
  {
    slug: "connect-four-ai",
    title: "Connect Four AI",
    note: "Minimax AI opponent with alpha-beta pruning.",
    image: connectFour,
    featured: false,
    hackathon: false,
    production: false,
  },
  {
    slug: "pvz-clone",
    title: "Plants Vs. Zombies Clone",
    note: "Gameplay clone with a story mode and endless mode.",
    image: pvzClone,
    featured: false,
    hackathon: false,
    production: true,
  },
];

const FILTER_LABELS: Record<ProjectFilter, string> = {
  featured: "Featured",
  all: "All",
  hackathons: "Hackathons",
  production: "Production",
};

function getCount(filter: ProjectFilter) {
  if (filter === "all") {
    return PROJECTS.length;
  }

  if (filter === "featured") {
    return PROJECTS.filter((project) => project.featured).length;
  }

  if (filter === "production") {
    return PROJECTS.filter((project) => project.production).length;
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

    if (activeFilter === "production") {
      return PROJECTS.filter((project) => project.production);
    }

    return PROJECTS.filter((project) => project.hackathon);
  }, [activeFilter]);

  return (
    <div id="projects" className="space-y-4 scroll-mt-24">
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
                className={`inline-flex items-baseline gap-[0.14em] font-normal transition-all duration-150 hover:-translate-y-px ${
                  isActive
                    ? "text-foreground hover:text-foreground/85"
                    : "text-muted hover:text-foreground/88"
                }`}
                onClick={() => {
                  setActiveHoverSlug(null);
                  setActiveFilter(filter);
                }}
                aria-pressed={isActive}
              >
                <span>{FILTER_LABELS[filter]}</span>
                <span>({getCount(filter)})</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeFilter}
          className="grid gap-5 sm:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.24,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <Link
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
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.82]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    {project.badgeText ? (
                      <span className="pointer-events-none absolute right-2 top-2 z-10 rounded-full border border-white/25 bg-black/58 px-2.5 py-1 text-[0.62rem] font-medium leading-none tracking-[0.02em] text-white backdrop-blur-sm">
                        {project.badgeText}
                      </span>
                    ) : null}
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
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
