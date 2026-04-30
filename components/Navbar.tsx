"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  const pages = [
    { label: "Home",                      href: "/home" },
    { label: "About Me",                  href: "/about-me" },
    { label: "Philosophical Blogs",       href: "/philosophical-blogs" },
    { label: "Scientific Blogs",          href: "/scientific-blogs" },
    { label: "Books Ghazals And Stories", href: "/books-ghazals-and-stories" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,255,255,0.07)]"
          : "bg-black/40 backdrop-blur-md"
      } px-5 py-3.5 flex justify-between items-center`}
    >
      {/* Brand */}
      <Link href="/home">
        <span className="text-cyan-400 text-xl sm:text-2xl font-bold tracking-wide cursor-pointer animate-glow select-none">
          My fragments of Life
        </span>
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-1 items-center">
        {pages.map((page) => (
          <Link key={page.href} href={page.href}>
            <span
              className={`relative px-3 py-1.5 text-sm rounded transition-colors duration-200 group ${
                isActive(page.href)
                  ? "text-cyan-300"
                  : "text-gray-300 hover:text-cyan-200"
              }`}
            >
              {page.label}
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-2 right-2 h-px bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-300 origin-left ${
                  isActive(page.href)
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`}
              />
            </span>
          </Link>
        ))}

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-3 px-3 py-1.5 bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 rounded-lg hover:bg-cyan-500/30 hover:border-cyan-400/60 transition-all duration-200 text-sm"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 flex items-center justify-center bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <span className="text-base leading-none">{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile dropdown — slide animation via max-height */}
      <div
        className={`absolute top-full left-0 right-0 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/90 backdrop-blur-2xl border-t border-cyan-900/30 px-4 py-3 flex flex-col gap-1">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              onClick={() => setMobileOpen(false)}
            >
              <span
                className={`block py-2.5 px-4 rounded-xl text-sm transition-all duration-200 ${
                  isActive(page.href)
                    ? "text-cyan-300 bg-cyan-900/30 border-l-2 border-cyan-400 pl-3"
                    : "text-gray-300 hover:text-cyan-200 hover:bg-white/5"
                }`}
              >
                {page.label}
              </span>
            </Link>
          ))}

          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setMobileOpen(false);
            }}
            className="mt-2 px-4 py-2.5 bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition-all duration-200 text-sm text-left"
          >
            {theme === "dark" ? "☀️  Light Mode" : "🌙  Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}
