"use client";

import Image, { type StaticImageData } from "next/image";

interface ProjectCardMediaProps {
  title: string;
  image?: StaticImageData;
  videoSrc?: string;
}

export default function ProjectCardMedia({
  title,
  image,
  videoSrc,
}: ProjectCardMediaProps) {
  if (videoSrc) {
    return (
      <video
        autoPlay
        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.82]"
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/webm" />
      </video>
    );
  }

  if (!image) {
    return null;
  }

  return (
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover transition duration-300 group-hover:scale-[1.02] group-hover:brightness-[0.82]"
      sizes="(max-width: 640px) 100vw, 50vw"
    />
  );
}
