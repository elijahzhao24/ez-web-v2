"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import tempImage from "@/app/temp.jpg";
import tempImage2 from "@/app/temp2.png";

type Featured = {
  id: number;
  image: StaticImageData;
  description: string;
  link: string;
};

type FeaturedCarouselProps = {
  visibleCount?: number;
};

export default function FeaturedCarousel({
  visibleCount = 4,
}: FeaturedCarouselProps) {
  const featuredItems = useMemo<Featured[]>(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        image: i % 2 === 0 ? tempImage : tempImage2,
        description: `description ${i + 1}`,
        link: "/contact",
      })),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef<HTMLAnchorElement>(null);

  const maxIndex = Math.max(0, featuredItems.length - visibleCount);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  useEffect(() => {
    const measure = () => {
      if (!itemRef.current) {
        return;
      }

      setItemWidth(itemRef.current.getBoundingClientRect().width + 12);
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  const nextFeatured = () => {
    if (currentIndex < featuredItems.length - visibleCount) {
      setCurrentIndex((prev) => Math.min(prev + 1, featuredItems.length - 1));
    }
  };

  const prevFeatured = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const getTransformX = () => -currentIndex * itemWidth;

  return (
    <section className="w-full">
      <div className="relative hidden sm:block">
        <div className="relative overflow-hidden px-0">
          <div
            className={`absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 ${
              canGoPrevious ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ${
              canGoNext ? "opacity-100" : "opacity-0"
            }`}
          />

          <motion.div
            className="flex gap-3"
            animate={{ x: getTransformX() }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {featuredItems.map((featured, index) => (
              <a
                ref={index === 0 ? itemRef : null}
                key={featured.id}
                href={featured.link}
                className="group relative aspect-video w-[calc((100%-2.25rem)/4)] flex-none overflow-hidden rounded-lg transition-all duration-300"
              >
                <Image
                  src={featured.image}
                  alt={featured.description}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <p className="px-2 text-center text-xs font-medium text-white">
                    {featured.description}
                  </p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {featuredItems.length > visibleCount && (
          <>
            {canGoPrevious && (
              <button
                type="button"
                onClick={prevFeatured}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-1 text-gray-200 shadow-sm backdrop-blur-sm transition-colors hover:bg-black/30 hover:text-white dark:bg-black/30 dark:text-gray-400 dark:hover:text-white"
                aria-label="Previous featured item"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Previous featured</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {canGoNext && (
              <button
                type="button"
                onClick={nextFeatured}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-1 text-gray-200 shadow-sm backdrop-blur-sm transition-colors hover:bg-black/30 hover:text-white dark:bg-black/30 dark:text-gray-400 dark:hover:text-white"
                aria-label="Next featured item"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Next featured</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
