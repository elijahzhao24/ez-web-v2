import type { Metadata } from "next";
import Image from "next/image";

import ProjectHeaderVideo from "../project_header_video";
import highLevelDiagram from "./high_level.webp";
import networkHighLevelDiagram from "./network_highlevel.webp";
import panelImage from "./panel.webp";

export const metadata: Metadata = {
  title: "Blueprint Quiz + NFC cards | Project",
  description: "Project overview for Blueprint Quiz + NFC cards",
};

export default function BlueprintMatchingQuizPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeaderVideo
          title="Blueprint Quiz + NFC cards"
          projectRole="Software Engineer"
          year="2026"
          videoSrc="/project/blueprint-matching-quiz/blueprint-video.webm"
          description="For Blueprint, we built two connected networking experiences: an interactive matching quiz that recommends relevant people to meet, and NFC networking cards that let attendees instantly view profiles and keep track of event connections."
          techStack={[
            "Algolia",
            "DynamoDB",
            "AWS Bedrock",
            "AWS Lambda",
            "API Gateway",
            "Next.js",
          ]}
          sourceCodeUrl="https://github.com/ubc-biztech/bt-web-v2"
          websiteUrl="https://www.ubcbiztech.com/events/blueprint2026"
          websiteLabel="Find out more"
        />

        <hr className="border-border" />

        <div className="space-y-10">
          <div className="space-y-4">
            <span className="project-section-header">Why we built it</span>
            <div className="project-bold-header">
              Networking is the biggest pain point with tech events.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                Lining up for 30 minutes to speak with someone you do not know
                just for the chance at an opportunity, fumbling with your phone
                to find someone&apos;s LinkedIn, and then trying to remember
                everyone after the event makes these events exhausting.
              </p>
              <p>
                We combined NFC technology with a mobile interface to facilitate
                meaningful networking, build community, and foster connections
                at UBC&apos;s largest tech conference.
              </p>
            </div>

            <div className="project-bold-header">
              The issue is not just forming connections, but maintaining them
              long after the event is over.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                In our research with students and survey respondents, attendees
                consistently described how difficult it is to navigate the
                overwhelming atmosphere while having quality conversations.
                Remembering who they have talked to and where to find them later
                is a major pain point.
              </p>
              <p>
                How might we reduce the friction of networking and foster more
                meaningful connection between attendees and networking
                delegates?
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="relative aspect-[16/10] overflow-hidden border border-border/35 bg-surface/10">
                <Image
                  src={panelImage}
                  alt="Partner Q&A panel at BluePrint 2025"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 70vw"
                />
              </div>
              <p className="text-[0.72rem] text-muted">
                Partner Q&amp;A panel at BluePrint 2025
              </p>
            </div>

            <div className="project-bold-header">
              We made everything accessible through the tap of a card.
            </div>
            <div className="project-body-text space-y-3">
              <p>
                NFC technology presented the right fit for our product
                requirements while adding an x-factor that got people talking.
                Each attendee nametag came with a UBC NFC card inside, and
                tapping your phone to someone&apos;s badge gave instant access
                to a custom profile with their LinkedIn, company, intentions,
                and fun facts.
              </p>
              <p>
                We ingested event signup data into backend services that
                generated these profiles automatically, then mapped each NFC
                card to a custom profile URL for each attendee.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="group relative aspect-[16/10] overflow-hidden border border-border/35 bg-surface/10">
                <video
                  className="pointer-events-none touch-none select-none w-full h-full object-cover group-hover:scale-[1.02] transition-all duration-200 ease-out"
                  playsInline
                  autoPlay
                  loop
                  muted
                  disableRemotePlayback
                  controlsList="noplaybackrate nodownload nofullscreen"
                  disablePictureInPicture
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <source
                    src="/project/blueprint-matching-quiz/nfc-animation.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </div>

            <div className="project-body-text space-y-3">
              <p>
                Connections persist between two people throughout the event,
                defined as everyone who visits your profile and everyone whose
                profile you have visited. This gave attendees a running list of
                everyone they met at the event.
              </p>
            </div>

            <div className="project-body-text">
              <p>
                We also added a Algolia-powered networking recommender in the
                companion app to help attendees discover high-relevance people
                to meet next.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <span className="project-section-header">Technical</span>

            <div className="project-bold-header">NFC card system</div>
            <div className="project-body-text space-y-3">
              <p>
                High-level flow: executive tools write or map a card to a
                profile ID, attendees tap at kiosks or profiles, and each tap
                resolves through APIs that read/write profile + interaction
                state in near real time.
              </p>
              <p>
                Tech stack: Next.js companion + kiosk interfaces, AWS Lambda
                endpoints for card/profile operations, DynamoDB for profile and
                interaction persistence, with analytics/monitoring hooks for
                event-day reliability.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="w-full overflow-hidden border border-border/35 bg-surface/10">
                <Image
                  src={highLevelDiagram}
                  alt="High-level architecture diagram for UBC NFC networking cards"
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 100vw, 70vw"
                />
              </div>
              <p className="text-[0.72rem] text-muted">
                High-level architecture for the UBC NFC networking cards system
              </p>
            </div>

            <div className="project-bold-header">
              Algolia networking recommender
            </div>
            <div className="project-body-text space-y-3">
              <p>
                High-level flow: attendee profile and event context are indexed,
                a top-k candidate set is retrieved on query, and results are
                ranked to return high-intent matches directly in the companion
                app.
              </p>
              <p>
                Tech stack: Algolia for fast retrieval/ranking, backend services
                for indexing + orchestration, and Next.js surfaces to present
                recommendations with low-latency interactions.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="w-full overflow-hidden border border-border/35 bg-surface/10">
                <Image
                  src={networkHighLevelDiagram}
                  alt="High-level architecture diagram for the Algolia networking recommender"
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 100vw, 70vw"
                />
              </div>
              <p className="text-[0.72rem] text-muted">
                High-level architecture for the Algolia networking recommender
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
