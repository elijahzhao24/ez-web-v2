import WorkExperienceItem from "@/components/work_experience_item";

export default function WorkPage() {
  const workItems = [
    {
      title: "Software Intern",
      company: "Nexera Robotics",
      date: "Summer 2026",
      href: "https://openai.com",
      details: ["Incoming to OpenAI in San Francisco for Summer 2026."],
      accentCompany: true,
      showCursorBadge: true,
      cursorBadgeText: "In Progress",
    },
    {
      title: "Software Engineer Intern",
      company: "Palantir",
      date: "May 2025 - Sep 2025",
      href: "https://www.palantir.com",
      details: [
        "Worked on internal platform tooling to speed up developer workflows.",
        "Shipped production features across multiple internal services.",
      ],
      accentCompany: false,
      showCursorBadge: true,
      cursorBadgeText: "View Overview",
    },
    {
      title: "Forward Deployed Software Engineer Intern",
      company: "Palantir",
      date: "Sep 2024 - Dec 2024",
      href: "https://www.palantir.com",
      details: [
        "Partnered with end users to build data workflows in production.",
        "Delivered tools tailored to operational and customer needs.",
      ],
      accentCompany: false,
      showCursorBadge: true,
      cursorBadgeText: "View Overview",
    },
    {
      title: "Software Engineer Intern",
      company: "SAP",
      date: "Jan 2024 - Aug 2024",
      href: "https://www.sap.com",
      details: [
        "Built full-stack product improvements for enterprise users.",
        "Improved reliability and release quality through testing upgrades.",
      ],
      accentCompany: false,
      showCursorBadge: false,
      cursorBadgeText: "View Overview",
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
          <p className="max-w-3xl pt-1 text-[1.1rem] leading-tight font-light text-foreground sm:text-[1.6rem]">
            i&apos;m interested in the future of how we{" "}
            <span className="highlight italic">interact</span> with the internet
            as AI becomes part of everyday workflows.
          </p>
        </header>

        <div className="space-y-1">
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

        <p className="pt-2 text-sm sm:text-base leading-relaxed text-muted">
          You can reach out at{" "}
          <span className="font-semibold text-foreground">
            elijahzhao24@gmail.com
          </span>{" "}
          or through my socials in the nav.
        </p>
      </section>
    </main>
  );
}
