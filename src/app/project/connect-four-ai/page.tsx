import connectFour from "@/app/images/projects/connectfour.webp";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "Connect Four AI | Project",
  description: "Project overview for Connect Four AI",
};

export default function ConnectFourAiPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="Connect Four AI"
          projectRole="Software Engineer"
          year="2024"
          imageSrc={connectFour}
          imageAlt="Connect Four AI game board and interface"
          description="Connect Four AI opponent implemented using a Minimax algorithm with Alpha-beta pruning."
          techStack={["Java", "Swing", "Junit"]}
          sourceCodeUrl="https://github.com/elijahzhao24/Connect-Four-AI"
        />

        <hr className="border-border" />

        <div className="space-y-3 text-[0.98rem] leading-relaxed text-muted font-[450] sm:text-[1.05rem]">
          <span className="block text-xs uppercase tracking-[0.25em] text-muted sm:text-[0.6rem]">
            Overview
          </span>
          <p>
            A Connect Four game featuring an AI opponent built with Minimax and
            Alpha-beta pruning for efficient move search and stronger gameplay
            decisions.
          </p>
          <p>
            The interface was developed with Java Swing, and game logic behavior
            was validated with Junit tests.
          </p>
        </div>
      </section>
    </main>
  );
}
