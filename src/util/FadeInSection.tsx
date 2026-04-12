"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  animateOnMount?: boolean;
}

export const FadeInSection = ({
  children,
  delay = 0,
  duration = 1,
  once = true,
  amount = 0.2,
  animateOnMount = false,
}: FadeInSectionProps) => {
  const animationTarget = { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      {...(animateOnMount
        ? { animate: animationTarget }
        : { whileInView: animationTarget, viewport: { once, amount } })}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};
