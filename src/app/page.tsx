"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import ImageCarousel from "@/components/image_carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground nav container-width space-y-4">
      <section className="space-y-4">
        <motion.div
          className="text-2xl sm:text-3xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
          Developer by profession, vibe coder by passion. Nice to meet you or
          welcome back! Here's what I've been up too.
        </motion.p>
      </section>

      <ImageCarousel />
    </main>
  );
}
