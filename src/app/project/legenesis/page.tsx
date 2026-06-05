import leGenesisImage from "@/app/project/legenesis/leGenesis.webp";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "LeGenesis | Project",
  description: "Project overview for LeGenesis",
};

export default function LeGenesisPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="LeGenesis"
          projectRole="Software Engineer"
          year="2026"
          imageSrc={leGenesisImage}
          imageAlt="LeGenesis sketch-to-3D model generation interface"
          description="Creating 3D models usually requires specialized tools, technical skills, and a lot of time. We wanted to make that process more accessible by letting users start with something simple: a text prompt and a rough sketch."
          techStack={["React", "Three.js", "Meshy AI", "FastAPI", "Supabase"]}
          websiteUrl="https://devpost.com/software/legenesis"
          websiteLabel="View on Devpost"
        />

        <hr className="border-border" />

        <div className="space-y-6">
          <section className="space-y-4">
            <span className="project-section-header">Overview</span>
            <div className="project-bold-header">
              Prompt + sketch to browser-previewed 3D models.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                LeGenesis is an AI-powered 3D generation tool that turns a
                user&apos;s prompt and rough sketch into a 3D model preview. The
                product flow focuses on fast early-stage prototyping for
                students, creators, and developers who want to visualize an
                asset without starting from scratch in traditional 3D software.
              </p>
              <p>
                Users can describe an object, sketch or upload a concept, run
                generation, preview the returned model in the browser, and save
                generated assets to a library for later refinement.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">Build</span>
            <div className="project-bold-header">
              A thin creative workflow over a 3D generation pipeline.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                The frontend was built with React and Three.js for the prompt
                input, sketch surface, generation controls, and in-browser model
                preview. FastAPI handled uploads, generation requests, model
                saving, and retrieval.
              </p>
              <p>
                Supabase backed storage and database persistence, while Meshy AI
                powered the concept-to-3D asset generation. The main engineering
                challenge was keeping the multi-service flow responsive while
                handling long-running generation requests and inconsistent AI
                outputs.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
