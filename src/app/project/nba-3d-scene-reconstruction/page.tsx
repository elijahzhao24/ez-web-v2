import Image from "next/image";
import nbaReconstruction from "@/app/images/projects/nba_reconstruction_1.png";
import nbaTracking from "@/app/images/projects/nba_reconstruction_2.png";
import nbaDesign from "@/app/images/projects/nba_reconstruction_3.png";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "NBA 3D Scene Reconstruction | Project",
  description:
    "A computer vision pipeline for reconstructing basketball footage through player tracking, court calibration, and 3D pose estimation.",
};

export default function Nba3dSceneReconstructionPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="NBA 3D Scene Reconstruction"
          projectRole="Software Engineer"
          year="2026"
          imageSrc={nbaDesign}
          imageAlt="3D basketball scene preview with players positioned around the basket"
          description="A computer vision pipeline for reconstructing basketball footage with player tracking, court calibration, and 3D pose estimation. The goal is to replay a play from any angle in Three.js."
          techStack={[
            "Python",
            "RF-DETR",
            "SAM 2",
            "SigLIP",
            "RTMPose",
            "MotionBERT",
            "Three.js",
          ]}
          sourceCodeUrl="https://github.com/elijahzhao24/nba_3d_scene_reconstruction"
        />

        <hr className="border-border" />

        <div className="space-y-8">
          <section className="space-y-4">
            <span className="project-section-header">Why I Built It</span>
            <div className="project-bold-header">
              Learning inference and computer vision
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Computer vision and machine learning have always interested me.
                This project gave me a chance to explore the theory while
                building something practical around another interest of mine:
                basketball.
              </p>
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Through this project, I was able to learn about object/player tracking and segmentation,
                transformer architectures with SAM 2, embeddings, similarity
                search, and clustering. I also worked with keypoint detection,
                homography, pose tracking and estimation, data cleanup, and
                trajectory smoothing.
              </p>
            </div>
            <div className="project-body-text space-y-3">
              <p>
                The GitHub README includes the full engineering design document,
                high-level design, and low-level design.
              </p>
            </div>
            <Image
              src={nbaDesign}
              alt="Basketball footage with tracked player masks above a top-down court projection"
              className="h-auto w-full border border-border/35"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </section>
          <section className="space-y-4">
            <span className="project-section-header">How it works</span>
            <div className="project-bold-header">
              From broadcast footage to court positions and body poses.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                RF-DETR detects players and SAM 2 tracks them across frames.
                SigLIP embeddings group players by team, while court landmarks
                and homography map their positions from video pixels onto the
                court.
              </p>
              <p>
                RTMPose estimates body joints and MotionBERT lifts them into 3D.
                Temporal smoothing cleans noisy trajectories and fills short
                gaps. The scence is then reconstructed in a 3js visualizer.
              </p>
            </div>
            <Image
              src={nbaTracking}
              alt="Basketball footage with tracked player masks above a top-down court projection"
              className="h-auto w-full border border-border/35"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </section>
        </div>
      </section>
    </main>
  );
}
