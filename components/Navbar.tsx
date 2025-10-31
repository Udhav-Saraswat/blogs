"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const pages = [
    "Home",
    "About Me",
    "Philosophical Blogs",
    "Scientific Blogs",
    "Books Ghazals And Stories",
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md p-4 flex justify-between items-center">
      <h1 className="text-cyan-400 text-xl sm:text-2xl font-bold">My fragments of Life</h1>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-4 items-center">
        {pages.map((page) => (
          <Link key={page} href={`/${page.toLowerCase().replace(/ /g, "-")}`}>
            <span className="hover:text-cyan-300 transition">{page}</span>
          </Link>
        ))}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-4 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden flex items-center gap-2">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="px-3 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="absolute top-full right-4 bg-black/80 backdrop-blur-md rounded-md p-4 flex flex-col gap-2 md:hidden">
          {pages.map((page) => (
            <Link
              key={page}
              href={`/${page.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="hover:text-cyan-300 transition">{page}</span>
            </Link>
          ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-2 px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      )}
    </nav>
  );
}
