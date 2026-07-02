import MermaidChart from "@/components/mermaid_chart";
import ProjectHeader from "../project_header";
import failureCloudImage from "./failurecloud.png";

export const metadata = {
  title: "Failure Cloud | Project",
  description: "Project overview for Failure Cloud",
};

const SYSTEM_FLOW_DIAGRAM = `flowchart TD
A[Natural-language robot task]
A --> B[Edge-case generation]
B --> C[Versioned scenario contract]
C --> D[Preview and simulator adapter]
D --> E[PyBullet execution]
E --> F[Sensor recording and evaluation]
F --> G[Canonical run bundle]
G --> H[Simulator and dataset exports]`;

export default function FailureCloudPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="Failure Cloud"
          projectRole="Software Engineer"
          year="2026"
          imageSrc={failureCloudImage}
          imageAlt="Failure Cloud robot simulation preview interface"
          description="Robots fail in rare edge cases, not normal demos. FailureCloud generates 3D robot unit tests with sensor data, labels, rewards, and pass/fail reports - like carrying a cup of water on a slippery floor."
          techStack={[
            "Next.js",
            "React",
            "Three.js",
            "FastAPI",
            "PyBullet",
            "Claude",
            "Redis",
            "NumPy",
          ]}
          sourceCodeUrl="https://github.com/elijahzhao24/FailureCloud"
          websiteUrl="https://devpost.com/software/failurecloud"
          websiteLabel="View on Devpost"
        />

        <hr className="border-border" />

        <div className="space-y-8">
          <section className="space-y-4">
            <span className="project-section-header">Overview</span>
            <div className="project-bold-header">
              Unit tests for robots before real-world failure.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                FailureCloud helps robotics teams test the cases that clean
                demos rarely cover: slippery floors, dropped obstacles, noisy
                sensors, bad lighting, occlusion, and fragile object handling.
              </p>
              <p>
                Instead of hand-building every simulation, users describe a
                normal robot task, choose from generated failure scenarios, tune
                parameters, run the scenario, and export a reproducible test
                bundle for analysis or training.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">System Flow</span>
            <div className="project-bold-header">
              From prompt to executable edge-case test.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                The core design is a simulator-independent scenario contract.
                Claude can compile a natural-language request into structured
                failure scenarios, while deterministic templates keep the
                workflow usable when external services are unavailable.
              </p>
              <MermaidChart
                chart={SYSTEM_FLOW_DIAGRAM}
                className="rounded-md border border-border/70 bg-surface/25 p-2 sm:p-3"
              />
              <p>
                PyBullet is the current execution adapter, but the contract is
                designed so the same scenario can be exported toward tools like
                Isaac Sim, Gazebo, CARLA, ROS-style folders, and OpenPCDet
                datasets.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">What it captures</span>
            <div className="project-bold-header">
              Sensor evidence, labels, rewards, and pass/fail reports.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Each run records synchronized robot evidence and evaluation
                data, so teams can understand not just that a robot failed, but
                why it failed and whether the same edge case can be reproduced.
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Environment, robot, route, hazards, and custom URDFs</li>
                <li>RGB, depth, segmentation, LiDAR, labels, and telemetry</li>
                <li>
                  Collision checks, cup stability, water retention, rewards, and
                  success criteria
                </li>
                <li>
                  Export bundles for replay, datasets, simulator configs, and
                  cloud job manifests
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">Build</span>
            <div className="project-bold-header">
              A web workflow on top of simulation and export adapters.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                The frontend was built with Next.js, React, TypeScript,
                Three.js, React Three Fiber, SWR, and Playwright. It covers the
                seven-step workflow from prompt entry through scenario editing,
                preview, run inspection, and export.
              </p>
              <p>
                The backend uses FastAPI, Pydantic, PyBullet, NumPy, Pillow,
                Redis, and Claude. The main engineering challenge was avoiding
                simulator lock-in by separating scenario intent, simulation
                execution, recorded evidence, and export delivery.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
