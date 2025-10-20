
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-black/40 backdrop-blur-md fixed w-full z-50">
      <h1 className="text-cyan-400 text-2xl font-bold">Udhav's Life</h1>
      <div className="flex gap-4">
        {['Home', 'About Me', 'Philosophical Blogs', 'Scientific Blogs', "Nazme, Ghazle aur tum"].map((page) => (
          <Link key={page} href={`/${page.toLowerCase().replace(/ /g, '-')}`}>
            <span className="hover:text-cyan-300">{page}</span>
          </Link>
        ))}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="ml-4 px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
