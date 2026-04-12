"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Footer from "@/components/footer";

interface ContactCard {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
}

const CONTACTS: ContactCard[] = [
  {
    label: "Email",
    value: "elijahzhao24@gmail.com",
    href: "mailto:elijahzhao24@gmail.com",
    icon: <MailIcon />,
    external: false,
  },
  {
    label: "Resume",
    value: "Download resume",
    href: "/elijah_zhao_resume.pdf",
    icon: <ResumeIcon />,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "in/elijahzhao24",
    href: "https://www.linkedin.com/in/elijahzhao24/",
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    label: "GitHub",
    value: "elijahzhao24",
    href: "https://github.com/elijahzhao24",
    icon: <GithubIcon />,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main className="flex min-h-[calc(100dvh-6.5rem)] flex-col bg-background text-foreground nav container-width font-sans">
      <section className="w-full max-w-4xl flex-1 space-y-4 pt-0 pb-6 sm:space-y-6 sm:pb-8">
        <motion.header
          className="space-y-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <h1 className="text-[1.8rem] sm:text-[2.1rem] font-semibold tracking-tight text-foreground">
            Contact
          </h1>
          <p className="text-[0.85rem] leading-normal sm:text-[0.95rem]">
            Let&apos;s connect.
          </p>
        </motion.header>

        <div className="space-y-3">
          <motion.p
            className="max-w-3xl pt-1 text-[0.85rem] leading-normal text-muted sm:text-[0.95rem]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.07 }}
          >
            Connect with me through any of these platforms.
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-3">
            {CONTACTS.map((contact, index) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noreferrer" : undefined}
                className="group flex min-h-[3rem] items-center gap-3 rounded-lg border border-border bg-surface/12 px-4 py-3.5 transition-colors hover:border-border-strong hover:bg-surface/16"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0.12 + index * 0.05,
                }}
              >
                <span className="text-muted-2 transition-colors group-hover:text-foreground">
                  {contact.icon}
                </span>
                <span className="space-y-0.5">
                  <span className="block text-[0.80rem] leading-tight text-foreground sm:text-[0.87rem]">
                    {contact.label}
                  </span>
                  <span className="block text-muted-2 text-[0.73rem] leading-tight text-muted sm:text-[0.78rem]">
                    {contact.value}
                  </span>
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.1rem] w-[1.1rem] fill-current"
    >
      <title>Email</title>
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908z" />
    </svg>
  );
}

function ResumeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.1rem] w-[1.1rem] fill-current"
    >
      <title>Resume</title>
      <path d="M6 2.75A2.25 2.25 0 0 0 3.75 5v14A2.25 2.25 0 0 0 6 21.25h12A2.25 2.25 0 0 0 20.25 19V8.56a2.25 2.25 0 0 0-.66-1.59l-3.56-3.56a2.25 2.25 0 0 0-1.59-.66H6Zm7.25 1.87v3.13c0 .96.79 1.75 1.75 1.75h3.13V19c0 .14-.11.25-.25.25H6A.25.25 0 0 1 5.75 19V5c0-.14.11-.25.25-.25h7.56ZM8 11.25a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2H8Zm0 4a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2H8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.1rem] w-[1.1rem] fill-current"
    >
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.1rem] w-[1.1rem] fill-current"
    >
      <title>GitHub</title>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.15-1.1-1.45-1.1-1.45-.9-.6.07-.59.07-.59 1 .08 1.53 1.03 1.53 1.03.88 1.52 2.31 1.08 2.87.82.09-.64.35-1.08.63-1.33-2.23-.25-4.57-1.12-4.57-4.95 0-1.1.39-2 1.03-2.72-.1-.25-.45-1.27.1-2.65 0 0 .85-.27 2.78 1.03A9.66 9.66 0 0 1 12 6.8c.85 0 1.7.11 2.5.33 1.93-1.3 2.78-1.03 2.78-1.03.55 1.38.2 2.4.1 2.65.65.72 1.04 1.63 1.04 2.72 0 3.84-2.34 4.7-4.58 4.95.36.31.68.92.68 1.86v2.23c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
