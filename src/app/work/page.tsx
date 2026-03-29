import WorkExperienceItem from "@/components/work_experience_item";
import { FadeInSection } from "@/util/FadeInSection";
import Footer from "@/components/footer";
import ContributionGraph from "@/components/contribution_graph";

export default function WorkPage() {
  const workItems = [
    {
      title: "Software Intern",
      company: "Nexera Robotics",
      date: "Summer 2026",
      href: "https://www.nexera-robotics.com/",
      details: ["Developing robotic grasping solutions that enable robots to reliably handle diverse, unstructured, and delicate objects."],
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
        "Teaching data structure and algorithms in C++ to 110+ students (CPSC 221)"
      ],
      accentCompany: false,
      showCursorBadge: true,
      cursorBadgeText: "View More",
    }
  ];

  const leadershipItems = [
    {
      title: "Development Lead",
      company: "UBC BizTech",
      date: "2025-Present ",
      href: "https://www.ubcbiztech.com/",
      details: [
        "Developing event features that elevate the experience of our 800+ members.",
        "Built a stock market app and NFC cards before—currently building a robot 🤖."
      ],
      accentCompany: true,
      showCursorBadge: true,
      cursorBadgeText: "View More",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width">
      <section className="section w-full max-w-4xl space-y-8 sm:space-y-12">
        <header className="space-y-1.5">
          <h1 className="text-[1.90rem] font-medium tracking-tight text-foreground sm:text-[2.35rem]">
            hi, i&apos;m elijah
          </h1>
          <p className="text-sm leading-normal text-muted">
            computer science @{" "}
            <span className="font-semibold text-foreground highlight">ubc</span>
          </p>
          <p className="max-w-3xl pt-1 text-[1.1rem] leading-tight font-light text-foreground sm:text-[1.5rem]">
            i&apos;m interested in the future of how we{" "}
            <span className="highlight italic">interact</span> with the internet
            as AI becomes part of everyday workflows.
          </p>
        </header>

        <div className="space-y-4">
          <div className="space-y-0">
            <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-muted">
              Work
            </p>

            <div className="space-y-0">
              {workItems.map((item, index) => (
                <WorkExperienceItem
                  key={`${item.title}-${item.company}-${item.date}`}
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
              ))}
            </div>
          </div>

          <div className="space-y-0">
            <p className="text-xs sm:text-sm uppercase tracking-[0.32em] text-muted">
              Leadership
            </p>

            <div className="space-y-0">
              {leadershipItems.map((item, index) => (
                <WorkExperienceItem
                  key={`${item.title}-${item.company}-${item.date}`}
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
              ))}
            </div>
          </div>
        </div>

        <div>
          <ContributionGraph />
        </div>

        <FadeInSection delay={0.8}>
          <Footer />
        </FadeInSection>
      </section>
    </main>
  );
}
