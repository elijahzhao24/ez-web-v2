"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import FeaturedCarousel from "@/components/featured_carousel";
import ImageCarousel from "@/components/image_carousel";
import SpotifyPlaying from "@/components/spotify_playing";
import { FadeInSection } from "@/util/FadeInSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width space-y-4">
      <section className="space-y-4">
        <motion.div
          className="text-2xl sm:text-3xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <TypeAnimation
            sequence={["hello, Elijah here"]}
            wrapper="h1"
            cursor={true}
            repeat={0}
            speed={50}
            style={{ display: "inline-block" }}
          />
        </motion.div>
        <motion.p
          className="text-sm sm:text-base leading-normal text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          Vibe coder by profession, developer by passion. I like building things
          that make a dent in the world.
        </motion.p>
      </section>

      <FadeInSection delay={1.2}>
        <motion.section className="space-y-1">
          <ImageCarousel />
          <div className="w-full max-w-[95%] mx-auto">
            <FeaturedCarousel />
          </div>
        </motion.section>
      </FadeInSection>

      <FadeInSection delay={0.4}>
        <motion.section className="mt-4">
          <SpotifyPlaying />
        </motion.section>
      </FadeInSection>
    </main>
  );
}
