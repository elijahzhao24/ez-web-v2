import ProjectHeader from "../project_header";
import campusExplorerImage from "./campusexplorer.png";

export const metadata = {
  title: "Campus Explorer | Project",
  description: "Project overview for Campus Explorer",
};

export default function CampusExplorerPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="Campus Explorer"
          projectRole="Software Engineer"
          year="2026"
          imageSrc={campusExplorerImage}
          imageAlt="Campus Explorer UBC campus map and navigation interface"
          description="A fullstack Campus Explorer application, with room data, building location, and navigation between classrooms. Built as a project for CPSC 310."
          techStack={["Mocha", "Express", "Node.js", "React"]}
          sourceCodeUrl="https://github.com/elijahzhao24/UBC_finder"
          websiteUrl="https://www.youtube.com/watch?v=4LrrwJphYQk"
          websiteLabel="Watch demo"
        />

        <hr className="border-border" />

        <div className="space-y-6">
          <section className="space-y-4">
            <span className="project-section-header">Overview</span>
            <div className="project-bold-header">
              UBC campus search, room data, and classroom navigation.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Campus Explorer is a fullstack navigation app for UBC campus. It
                combines room data, building locations, and route planning so
                students can search campus spaces and navigate between
                classrooms.
              </p>
              <p>
                The project was built for CPSC 310 with a React frontend,
                Node.js and Express backend services, and Mocha tests around the
                application logic.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
