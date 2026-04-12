import datasetProject from "@/app/images/projects/dataset_project.png";
import MermaidChart from "@/components/mermaid_chart";
import ProjectHeader from "../project_header";

export const metadata = {
  title: "Dataset Curation Pipeline | Project",
  description: "Project overview for Dataset Curation Pipeline",
};

const SYSTEM_FLOW_DIAGRAM = `flowchart TD
A[Large Raw Dataset]
A --> B[Feature Extraction\\nDINOv2 Embeddings]
B --> C[Image + Metadata Storage]
C --> D[Duplicate Filtering]
D --> E[Filtered Dataset]
E --> F[Diversity Sampling]
E --> G[Semantic Retrieval]
F --> H[Training Dataset]
G --> I[Similar Images]`;

export default function DatasetCurationPipelinePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeader
          title="Dataset Curation Pipeline"
          projectRole="Software Engineer"
          year="2026"
          imageSrc={datasetProject}
          imageAlt="Dataset Curation Pipeline architecture preview"
          description="A scalable pipeline for transforming large, noisy image datasets into high-quality training datasets using modern vision embeddings and vector similarity search."
          techStack={[
            "Python",
            "PyTorch",
            "DINOv2",
            "PostgreSQL + pgvector",
            "AWS S3",
            "OpenCV / Pillow",
            "NumPy",
          ]}
          sourceCodeUrl="https://github.com/elijahzhao24/dataset-curation-pipeline"
        />

        <hr className="border-border" />

        <div className="space-y-8">
          <section className="space-y-4">
            <span className="project-section-header">Overview</span>
            <div className="project-bold-header">
              Dataset curation + targeted retrieval for large-scale ML training.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                This pipeline processes <strong>millions of images</strong> to
                remove duplicates and near-duplicates, then selects a{" "}
                <strong>diverse subset of images</strong> suitable for model
                training.
              </p>
              <p>
                Beyond filtering and sampling, it also supports{" "}
                <strong>targeted image retrieval</strong>: users can retrieve
                images semantically similar to a candidate image or folder,
                which is useful for object-specific datasets, environment
                coverage, and failure-case mining.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">Problem Context</span>
            <div className="project-bold-header">
              Real-world dataset quality bottlenecks at scale.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Large image datasets often contain{" "}
                <strong>near-duplicates</strong>,{" "}
                <strong>poor-quality frames</strong>,{" "}
                <strong>redundant samples</strong>, and{" "}
                <strong>class imbalance</strong>.
              </p>
              <p>
                In robotics-style capture pipelines, millions of frames can be
                collected while only a fraction are training-worthy. Unfiltered
                training data wastes compute and can{" "}
                <strong>increase overfitting risk</strong>.
              </p>
              <p>
                Manual curation does not scale when datasets reach hundreds of
                thousands or millions of images, so an automated and cloud-ready
                pipeline is essential.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">System Flow</span>
            <div className="project-bold-header">
              From raw dataset to training-ready outputs.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                The core flow is: <strong>feature extraction</strong> with
                DINOv2 embeddings, <strong>duplicate filtering</strong>,{" "}
                <strong>diversity sampling</strong>, and{" "}
                <strong>semantic retrieval</strong>.
              </p>
              <MermaidChart
                chart={SYSTEM_FLOW_DIAGRAM}
                className="rounded-md border border-border/70 bg-surface/25 p-2 sm:p-3"
              />
              <p>
                The output can either be a curated training dataset or a
                targeted set of similar images for analysis and downstream model
                iteration.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">Core Tech</span>
            <div className="project-bold-header">
              Embeddings + vector search + cloud storage.
            </div>
            <div className="project-body-text space-y-3">
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <strong>Python</strong> for pipeline orchestration
                </li>
                <li>
                  <strong>PyTorch + DINOv2</strong> for embedding generation
                </li>
                <li>
                  <strong>PostgreSQL + pgvector</strong> for nearest-neighbor
                  search
                </li>
                <li>
                  <strong>AWS S3</strong> for scalable dataset storage and
                  server-side copy
                </li>
                <li>
                  <strong>OpenCV / Pillow</strong> for image IO and
                  preprocessing
                </li>
                <li>
                  <strong>NumPy</strong> for vector operations
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">Design Decisions</span>
            <div className="project-bold-header">
              Why vector indexing and pgvector.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Without indexing, duplicate checks become{" "}
                <strong>O(N) comparisons</strong> per image. With HNSW-based
                vector indexing, nearest-neighbor lookup is approximately{" "}
                <strong>O(log N)</strong>.
              </p>
              <p>
                Using pgvector directly in Postgres keeps metadata and
                embeddings in one system, simplifies infrastructure, and is
                often more cost-effective than hosting a separate vector
                database.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <span className="project-section-header">Scaling Notes</span>
            <div className="project-bold-header">
              Performance and memory tradeoffs at 100K to 1M+ images.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Embedding extraction is the most expensive stage and is
                optimized with <strong>batch GPU inference</strong>.
              </p>
              <p>
                Diversity sampling with k-center style selection introduces
                memory pressure because filtered embeddings must be loaded into
                memory. Future improvements include candidate-pool caps and
                reduced precision where possible.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
