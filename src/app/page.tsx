"use client";

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

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
              sequence={[
                'hello, Elijah here',
              ]}
              wrapper="h1"
              cursor={true}
              repeat={0}
              speed={50}
              style={{ display: 'inline-block' }}
            />
          </motion.div>
          <motion.p
            className="text-sm sm:text-base leading-normal text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            your average boba enjoyer from socal trying to document the struggles of becoming a software engineer.
          </motion.p>
        </section>
    </main>
  );
}
