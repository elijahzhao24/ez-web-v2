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
    label: "Instagram",
    value: "@elijahzhao.24",
    href: "https://www.instagram.com/elijahzhao.24/",
    icon: <InstagramIcon />,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "in/elijahzhao24",
    href: "https://www.linkedin.com/in/elijahzhao24/",
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    label: "Discord",
    value: "Message me",
    href: "https://discord.com/users/1134624678430908577",
    icon: <DiscordIcon />,
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

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.1rem] w-[1.1rem] fill-current"
    >
      <title>Instagram</title>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.1rem] w-[1.1rem] fill-current"
    >
      <title>Discord</title>
      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
    </svg>
  );
}
