import oldPortfolio from "@/app/images/projects/oldportolio.webp";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "Old Portfolio | Project",
  description: "Project overview for Old Portfolio",
};

export default function OldPortfolioPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="Old Portfolio"
          projectRole="Software Engineer"
          year="2023"
          imageSrc={oldPortfolio}
          imageAlt="Old portfolio website preview"
          description="old website keep up for legacy."
          techStack={["Next.js", "React", "TailwindCSS"]}
          sourceCodeUrl="https://github.com/elijahzhao24/elijahzhao24.github.io"
          websiteUrl="https://elijahzhao24-github-io.vercel.app/"
          websiteLabel="Visit Live"
        />

        <hr className="border-border" />
      </section>
    </main>
  );
}
