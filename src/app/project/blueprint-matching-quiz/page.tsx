import type { Metadata } from "next";
import Image from "next/image";

import ProjectHeaderVideo from "../project_header_video";
import networkRecommender from "./blueprint-project-header.webp";

import highLevelDiagram from "./high_level.webp";
import panelImage from "./panel.webp";

export const metadata: Metadata = {
  title: "Blueprint Matching Quiz + NFC networking cards | Project",
  description:
    "Project overview for Blueprint Matching Quiz + NFC networking cards",
};

export default function BlueprintMatchingQuizPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl space-y-8 pt-0 pb-6 font-sans sm:pb-8">
        <ProjectHeaderVideo
          title="Blueprint Matching Quiz + NFC networking cards"
          projectRole="Software Engineer"
          year="2026"
          videoSrc="/project/blueprint-matching-quiz/blueprint-video.webm"
          description="Matching 200 students with networking delegates using cosine similarity algorithms. We made it easier to achieve your goals by matching you with the right people. Ingesting registration data and personality traits from an interactive kiosk quiz enabled us to recommend students to networking delegates using cosine similarity algorithms."
          techStack={["Algolia", "DynamoDB", "AWS Lambda", "Next.js"]}
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
                Remembering who they have talked to and where to find them
                later is a major pain point.
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
                Connections persist between two
                people throughout the event, defined as everyone who visits your profile and
                everyone whose profile you have visited. This gave attendees a
                running list of everyone they met at the event.
              </p>
            </div>

            <div className="project-body-text">
              <p>
                We also added a Algolia-powered networking
                recommender in the companion app to help attendees discover
                high-relevance people to meet next.
              </p>
            </div>
          </div>

            <div className="space-y-2 pt-2">
              <div className="relative aspect-[16/10] overflow-hidden border border-border/35 bg-surface/10">
                <Image
                  src={networkRecommender}
                  alt="Connection made flow in the NFC companion app"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 70vw"
                />
              </div>
            </div>

          <div className="space-y-4">
            <span className="project-section-header">Technical</span>
            <div className="project-body-text space-y-3">
              <p>
                Quick rundown: Next.js powered the companion web app and kiosk
                surfaces, Lambda APIs handled profile/interaction/quiz logic,
                DynamoDB stored attendee and connection state, and Algolia +
                embedding retrieval powered recommendation quality. Around that
                core, we added monitoring and analytics hooks so event-day
                traffic stayed fast, observable, and reliable.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <div className="relative aspect-[16/10] overflow-hidden border border-border/35 bg-surface/10">
                <Image
                  src={highLevelDiagram}
                  alt="High-level architecture diagram for UBC NFC networking cards"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 70vw"
                />
              </div>
              <p className="text-[0.72rem] text-muted">
                High-level architecture for the UBC NFC networking cards system
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
