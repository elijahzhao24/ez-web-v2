"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface WorkExperienceItemProps {
  title: string;
  company: string;
  date: string;
  href: string;
  details: string[];
  showDivider?: boolean;
  accentCompany?: boolean;
  showCursorBadge?: boolean;
  cursorBadgeText?: string;
}

export default function WorkExperienceItem({
  title,
  company,
  date,
  href,
  details,
  showDivider = true,
  accentCompany = false,
  showCursorBadge = false,
  cursorBadgeText = "View Overview",
}: WorkExperienceItemProps) {
  const [isActive, setIsActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div className={`relative ${showDivider ? "border-t border-border" : ""}`}>
      <Link
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block focus:outline-none"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      >
        <article className="rounded-xl py-3.5 transition-colors duration-150 ease-out hover:bg-surface/10 sm:py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h3 className="text-[1.22rem] leading-tight text-foreground sm:text-[1.56rem]">
              {title}{" "}
              <span className={accentCompany ? "highlight" : "text-muted"}>
                @ {company}
              </span>
            </h3>

            <div className="flex items-center gap-3 text-xs text-muted sm:text-[0.95rem]">
              <span>{date}</span>
              <span className="text-base leading-none text-muted-2">›</span>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {isActive ? (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pl-3.5 sm:pl-5">
                  <div className="space-y-1">
                    {details.map((line) => (
                      <p
                        key={line}
                        className="text-[0.92rem] leading-relaxed text-muted/90"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </article>
      </Link>

      <AnimatePresence>
        {showCursorBadge && isActive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="pointer-events-none absolute hidden sm:flex items-center rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-[0.12em] text-foreground shadow-lg"
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: "translate(-50%, -150%)",
            }}
          >
            {cursorBadgeText}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
