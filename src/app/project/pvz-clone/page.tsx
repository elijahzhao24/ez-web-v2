import pvzClone from "@/app/images/projects/pvzclone.webp";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "Plants Vs. Zombies Clone | Project",
  description: "Project overview for Plants Vs. Zombies Clone",
};

export default function PvzClonePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="Plants Vs. Zombies Clone"
          projectRole="Software Engineer"
          year="2024"
          imageSrc={pvzClone}
          imageAlt="Plants Vs. Zombies clone gameplay screenshot"
          description="Gameplay clone with a story and endless mode. Built using p5.js and a JavaScript sprite editor."
          techStack={["JavaScript", "p5.js"]}
          sourceCodeUrl="https://github.com/elijahzhao24/CS30-MajorProject"
          websiteUrl="https://elijahzhao24.github.io/CS30-MajorProject/"
          websiteLabel="Play Live"
        />

        <hr className="border-border" />

        <div className="space-y-3 text-[0.98rem] leading-relaxed text-muted font-[450] sm:text-[1.05rem]">
          <span className="block text-xs uppercase tracking-[0.25em] text-muted sm:text-[0.6rem]">
            Overview
          </span>
          <p>
            A browser-based Plants Vs. Zombies-inspired game with both a guided
            story experience and an endless survival mode.
          </p>
          <p>
            The project was built with JavaScript and p5.js, including custom
            sprite workflows to drive character animation and gameplay visuals.
          </p>
        </div>
      </section>
    </main>
  );
}
