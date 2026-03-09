"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";

import tempImage from "@/app/temp.jpg";

type Slide = {
  id: number;
  image: StaticImageData;
  header: string;
  description: string;
};

const AUTO_ROTATE_MS = 5000;
const TICK_MS = 50;

export default function ImageCarousel() {
  const slides = useMemo<Slide[]>(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        image: tempImage,
        header: `header ${i + 1}`,
        description: `description ${i + 1}`,
      })),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);

  const shouldPause = isPausedByUser || isTabHidden;
  const activeSlide = slides[currentIndex];

  const goToIndex = (index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    setCurrentIndex(nextIndex);
    setProgress(0);
  };

  const goToNext = () => goToIndex(currentIndex + 1);
  const goToPrevious = () => goToIndex(currentIndex - 1);

  useEffect(() => {
    const onVisibilityChange = () => {
      setIsTabHidden(document.visibilityState === "hidden");
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (shouldPause || slides.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + TICK_MS / AUTO_ROTATE_MS;

        if (nextProgress >= 1) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
          return 0;
        }

        return nextProgress;
      });
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [shouldPause, slides.length]);

  return (
    <section className="w-full">
    <h2 className="text-lg font-semibold">Here's what I've been up to</h2>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black">
        {slides.map((slide, index) => (
          <Image
            key={slide.id}
            src={slide.image}
            alt={slide.header}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35" />

        <div className="absolute left-4 right-4 top-3 z-10 flex items-center gap-2 sm:left-6 sm:right-6 sm:top-3">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            {slides.map((slide, index) => {
              const fill =
                index < currentIndex
                  ? 1
                  : index === currentIndex
                    ? progress
                    : 0;

              return (
                <div
                  key={slide.id}
                  className="h-0.75 flex-1 overflow-hidden rounded-full bg-white/25"
                >
                  <div
                    className="h-full rounded-full bg-white transition-[width] duration-75"
                    style={{ width: `${fill * 100}%` }}
                  />
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsPausedByUser((prev) => !prev)}
            className="grid h-6 w-6 place-items-center rounded-full border border-white/25 bg-black/60 text-white transition-colors hover:bg-black/70 sm:h-6 sm:w-6"
            aria-label={isPausedByUser ? "Resume carousel" : "Pause carousel"}
          >
            {isPausedByUser ? (
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Play</title>
                <path d="M8 6v12l10-6-10-6z" />
              </svg>
            ) : (
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Pause</title>
                <path d="M7 6h4v12H7zM13 6h4v12h-4z" />
              </svg>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-1.5 text-white transition-colors hover:bg-black/70 sm:left-4"
        >
          <svg
            className="h-[14px] w-[14px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Previous image</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 18l-6-6 6-6"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-1.5 text-white transition-colors hover:bg-black/70 sm:right-4"
        >
          <svg
            className="h-[14px] w-[14px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Next image</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 6l6 6-6 6"
            />
          </svg>
        </button>

        <div className="absolute bottom-4 left-4 z-10 max-w-[80%] sm:left-6">
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            {activeSlide.header}
          </h2>
          <p className="mt-1 text-xs text-white/90 sm:text-sm">
            {activeSlide.description}
          </p>
        </div>
      </div>
    </section>
  );
}
