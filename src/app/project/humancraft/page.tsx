import humanCraft from "@/app/images/projects/humancraft.png";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "HumanCraft | Project",
  description:
    "Bring real people into Minecraft with iPhone LiDAR. Best Use of Sentry winner at Hack the North 2026.",
};

export default function HumanCraftPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="HumanCraft"
          projectRole="Software Engineer"
          year="2026"
          imageSrc={humanCraft}
          imageAlt="HumanCraft preview showing a real person inside Minecraft"
          description="HumanCraft brings real people into Minecraft as colored 3D point clouds, with body tracking and hitboxes that follow their limbs."
          techStack={[
            "Swift",
            "ARKit",
            "LiDAR",
            "Python",
            "MediaPipe",
            "Java",
            "Fabric",
            "Sentry",
          ]}
          sourceCodeUrl="https://github.com/elijahzhao24/minecraft_hack_the_north"
          websiteUrl="https://devpost.com/software/humancraft"
          websiteLabel="View on Devpost"
        />

        <hr className="border-border" />

        <div className="space-y-8">
          <section className="space-y-4">
            <span className="project-section-header">Overview</span>
            <div className="project-bold-header">
              Play as yourself in Minecraft.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Built at Hack the North 2026, HumanCraft won Best Use of Sentry.
                We wanted to put our actual friends into a world made of blocks,
                with body movements reflected in the game.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">How we built it</span>
            <div className="project-bold-header">
              From iPhone capture to a Minecraft mod.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                iPhone LiDAR and RGB capture feed a Python pipeline that
                reconstructs point clouds and detects body landmarks. A custom
                Java Fabric mod renders the person and their hitboxes in
                Minecraft.
              </p>
              <p>
                Sentry connects the iOS app, FastAPI reconstruction service, and
                Minecraft mod through logs, errors, and traces. This helped us
                debug missing depth data and misaligned scans while keeping the
                point cloud and hitboxes synchronized.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
