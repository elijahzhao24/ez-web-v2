"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { useTheme } from "@/context/themeProvider";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { currentTheme, isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="w-full backdrop-blur-sm">
      <nav className="container-width py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/profile.png" alt="Elijah Zhao" width={32} height={32} />
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-nav-text-hover"
                      : "text-nav-text hover:text-nav-text-hover"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="bubble"
                      className="absolute inset-0 -z-10 rounded-lg"
                      style={{ backgroundColor: currentTheme.nav.bubble }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <motion.button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-nav-text transition-colors hover:text-nav-text-hover"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </nav>
    </header>
  );
}
