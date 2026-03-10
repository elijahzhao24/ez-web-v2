"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export const FadeInSection = ({
  children,
  delay = 0,
  once = true,
  amount = 0.2,
}: FadeInSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 1, delay }}
    >
      {children}
    </motion.div>
  );
};
