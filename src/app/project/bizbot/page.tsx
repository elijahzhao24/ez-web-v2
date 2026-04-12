import bizbot from "@/app/images/projects/bizbot.png";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "BizBot | Project",
  description: "Project overview for BizBot",
};

export default function BizBotPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="BizBot"
          projectRole="Software Engineer"
          year="2026"
          imageSrc={bizbot}
          imageAlt="BizBot autonomous event photographer interface"
          description="BIZBOT is an autonomous event photography robot that roams venues, detects interesting scenes, and captures candid moments. It uses an AI quality gate to filter and publish only the best photos to a curated gallery, with admin controls for fine-tuning selection and quality."
          techStack={[
            "FastAPI",
            "Supabase",
            "Google Gemini",
            "YOLOv8",
            "PyTorch",
            "OpenCV",
            "Next.js",
          ]}
          sourceCodeUrl="https://github.com/elijahzhao24/BizBot"
          websiteUrl="https://devpost.com/software/bizbot-1m45lk"
          websiteLabel="View on Devpost"
        />

        <hr className="border-border" />

        <div className="space-y-10">
          <div className="space-y-4">
            <span className="project-section-header">
              {"What it does"}
            </span>
            <div className="project-bold-header">
              An event photographer for real-world chaos.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                BIZBOT is a robot event photographer designed for real
                environments: crowded rooms, messy backgrounds, unpredictable
                lighting, and lots of motion.
              </p>
              <p>
                The goal is simple: capture moments people actually want to
                keep, and make it easy to look back on an event without dumping
                hundreds of random low-quality shots on attendees.
              </p>
              <p>
                BIZBOT can roam an event, automatically detect hot spots, and
                take candid and B-roll photos. It also runs an AI quality gate
                and only releases photos that meet a configurable standard,
                making the system more reliable, respectful, and real-world
                ready.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <span className="project-section-header">
              {"How we built it and the system flow"}
            </span>
            <div className="project-bold-header">
              System flow from roaming to curated publishing.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                BIZBOT is directly connected and controlled through a web app
                with three main surfaces: a Control Panel, a Gallery, and an
                Admin Dashboard.
              </p>
              <p>
                From the Control Panel, starting the robot calls the backend to
                launch the main robot loop and place BIZBOT in roam mode. While
                roaming, the robot continuously captures frames and listens for
                control or stop events.
              </p>
              <p>
                The main loop runs CV inference on incoming frames, including
                person detection and scene-quality checks. When a frame meets
                capture conditions (sharpness, framing, exposure), it is
                promoted to a candidate photo and passed to the PhotoPipeline.
              </p>
              <p>
                The PhotoPipeline scores each candidate image with Gemini for
                technical quality factors like blur, exposure, subject framing,
                clutter, and distracting items. Images are uploaded to Supabase
                Storage, while storage path and score are stored in Supabase
                Postgres.
              </p>
              <p>
                The Gallery serves only photos where score is above the
                threshold, hiding technically poor photos. In Admin Dashboard
                mode, photos can be approved or removed manually, image scores
                can be adjusted, and the release threshold can be tuned for each
                event.
              </p>
              <p>
                If Gemini fails, score is set to <code>NULL</code>, and that
                image remains hidden until admin review.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <span className="project-section-header">
              {"Tech stack"}
            </span>
            <div className="project-bold-header">
              Built for fast iteration and control.
            </div>
            <div className="project-body-text space-y-3">
              <ul className="list-disc space-y-1 pl-5 text-muted">
                <li>
                  <strong className="font-semibold text-foreground">
                    FastAPI
                  </strong>{" "}
                  backend for upload and admin/public endpoints
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Supabase Storage
                  </strong>{" "}
                  for image hosting
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Supabase Postgres
                  </strong>{" "}
                  for photo metadata (
                  <code>id</code>, <code>storage_path</code>, <code>score</code>
                  )
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Google Gemini API
                  </strong>{" "}
                  for multimodal image scoring (0 to 1)
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    YOLOv8, PyTorch, and OpenCV
                  </strong>{" "}
                  for people detection, model inference, and frame capture
                </li>
                <li>
                  <strong className="font-semibold text-foreground">
                    Next.js
                  </strong>{" "}
                  frontend for the web application
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
