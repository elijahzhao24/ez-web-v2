"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import ContributionGraph from "@/components/contribution_graph";
import Footer from "@/components/footer";
import ProjectsSection from "@/components/projects_section";
import WorkExperienceItem from "@/components/work_experience_item";
import { FadeInSection } from "@/util/FadeInSection";

export default function WorkPage() {
  const searchParams = useSearchParams();
  const headingText = "hi, i'm Elijah";
  const typewriterSpeed = 52;
  const typewriterDuration = (headingText.length * typewriterSpeed) / 1000;
  const introStartDelay = typewriterDuration + 0.12;
  const projectsDelay = introStartDelay + 0.22;

  useEffect(() => {
    if (searchParams.get("scroll") !== "projects") {
      return;
    }

    const timer = window.setTimeout(() => {
      document.getElementById("projects")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", "/work");
    }, 500);

    return () => window.clearTimeout(timer);
  }, [searchParams]);

  const workItems = [
    {
      title: "Software Intern",
      company: "Nexera Robotics",
      date: "Winter 2026",
      href: "https://www.nexera-robotics.com/",
      details: [
        "Developing robotic grasping solutions that enable robots to reliably handle diverse, unstructured, and delicate objects.",
      ],
      accentCompany: true,
      showCursorBadge: true,
      cursorBadgeText: "View More",
    },
    {
      title: "CPSC Teaching Assisant",
      company: "UBC",
      date: "May 2025 - Sep 2025",
      href: "https://www.cs.ubc.ca/students/undergrad/courses/core-curriculum#:~:text=CPSC%20221%C2%A0%2D%C2%A0Basic%20Algorithms%20and%20Data%20Structures",
      details: [
        "Teaching data structure and algorithms in C++ to 110+ students (CPSC 221)",
      ],
      accentCompany: false,
      showCursorBadge: true,
      cursorBadgeText: "View More",
    },
  ];

  const leadershipItems = [
    {
      title: "Development Lead",
      company: "UBC BizTech",
      date: "Aug 2025-Present ",
      href: "https://www.ubcbiztech.com/",
      details: [
        "Developing event features that elevate the experience of our 800+ members.",
        "Built a stock market app and NFC cards before—currently building a robot 🤖.",
      ],
      accentCompany: true,
      showCursorBadge: true,
      cursorBadgeText: "View More",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 sm:space-y-12 sm:pb-8">
        <header className="space-y-1.5">
          <motion.div
            className="text-[1.90rem] font-medium tracking-tight text-foreground sm:text-[2.35rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
          >
            <TypeAnimation
              sequence={[headingText]}
              wrapper="h1"
              cursor={true}
              repeat={0}
              speed={typewriterSpeed}
              style={{ display: "inline-block" }}
            />
          </motion.div>

          <motion.p
            className="text-sm leading-normal text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: introStartDelay }}
          >
            computer science @{" "}
            <span className="font-semibold text-foreground highlight">ubc</span>
          </motion.p>
          <motion.p
            className="max-w-3xl pt-1 text-[1.1rem] leading-tight font-light text-foreground sm:text-[1.5rem]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: introStartDelay + 0.14 }}
          >
            i&apos;m interested in the future of how we{" "}
            <span className="highlight italic">interact</span> with the internet
            as AI becomes part of everyday workflows.
          </motion.p>
        </header>

        <div className="space-y-4">
          <FadeInSection delay={introStartDelay + 0.12} duration={0.55}>
            <div className="space-y-0">
              <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-muted">
                Work
              </p>

              <div className="space-y-0">
                {workItems.map((item, index) => (
                  <FadeInSection
                    key={`${item.title}-${item.company}-${item.date}`}
                    delay={introStartDelay + 0.18 + index * 0.08}
                    duration={0.5}
                  >
                    <WorkExperienceItem
                      title={item.title}
                      company={item.company}
                      date={item.date}
                      href={item.href}
                      details={item.details}
                      showDivider={index > 0}
                      accentCompany={item.accentCompany}
                      showCursorBadge={item.showCursorBadge}
                      cursorBadgeText={item.cursorBadgeText}
                    />
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={introStartDelay + 0.28} duration={0.55}>
            <div className="space-y-0">
              <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-muted">
                Leadership
              </p>

              <div className="space-y-0">
                {leadershipItems.map((item, index) => (
                  <FadeInSection
                    key={`${item.title}-${item.company}-${item.date}`}
                    delay={introStartDelay + 0.34 + index * 0.08}
                    duration={0.5}
                  >
                    <WorkExperienceItem
                      title={item.title}
                      company={item.company}
                      date={item.date}
                      href={item.href}
                      details={item.details}
                      showDivider={index > 0}
                      accentCompany={item.accentCompany}
                      showCursorBadge={item.showCursorBadge}
                      cursorBadgeText={item.cursorBadgeText}
                    />
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={introStartDelay + 0.46} duration={0.55}>
          <div>
            <ContributionGraph />
          </div>
        </FadeInSection>

        <FadeInSection
          delay={projectsDelay}
          duration={0.32}
          animateOnMount={true}
        >
          <div>
            <ProjectsSection />
          </div>
        </FadeInSection>

        <FadeInSection delay={introStartDelay + 0.5} duration={0.4}>
          <Footer />
        </FadeInSection>
      </section>
    </main>
  );
}
