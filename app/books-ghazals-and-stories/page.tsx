"use client";

import React from "react";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Short Stories",
    path: "/books-ghazals-and-stories/pages/short-stories",
    gradient: "from-blue-500 to-cyan-400",
    glow: "rgba(6,182,212,0.55)",
    glowSoft: "rgba(6,182,212,0.12)",
    emoji: "📖",
    tagline: "Woven words, real worlds",
  },
  {
    name: "Ghazle",
    path: "/books-ghazals-and-stories/pages/ghazle",
    gradient: "from-pink-500 to-rose-400",
    glow: "rgba(244,63,94,0.55)",
    glowSoft: "rgba(244,63,94,0.12)",
    emoji: "🌹",
    tagline: "Verses of longing",
  },
  {
    name: "Nazme",
    path: "/books-ghazals-and-stories/pages/nazme",
    gradient: "from-purple-500 to-fuchsia-400",
    glow: "rgba(192,38,211,0.55)",
    glowSoft: "rgba(192,38,211,0.12)",
    emoji: "✨",
    tagline: "Poetry of the soul",
  },
  {
    name: "Quotes",
    path: "/books-ghazals-and-stories/pages/quotes",
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(251,146,60,0.55)",
    glowSoft: "rgba(251,146,60,0.12)",
    emoji: "💫",
    tagline: "Fragments of wisdom",
  },
];

export default function Poetry() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-24 px-6">

      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.04),transparent_65%)]" />

      {/* Header */}
      <div className="relative z-10 mb-14 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-4 animate-glow">
          Books, Ghazals &amp; Stories ✨
        </h1>
        <div className="cosmic-divider" />
        <p className="text-lg text-gray-300 max-w-xl mx-auto">
          A soulful collection of words — explore realms of emotion through stories, verses, and quotes.
        </p>
      </div>

      {/* Category Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl w-full">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => router.push(cat.path)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 28px ${cat.glow}, 0 0 56px ${cat.glowSoft}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
            className={`text-left cursor-pointer animate-slide-up delay-${(i + 1) * 100} w-full rounded-2xl transition-all duration-300 hover:scale-[1.04]`}
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <div className={`bg-gradient-to-br ${cat.gradient} p-[1.5px] rounded-2xl`}>
              <div className="bg-gray-900/95 rounded-2xl py-10 px-10 flex flex-col items-center justify-center hover:bg-gray-900/80 transition-colors duration-300">
                <span
                  className="text-5xl mb-4 animate-float"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  {cat.emoji}
                </span>
                <h2 className="text-2xl font-semibold text-white mb-1">{cat.name}</h2>
                <p className="text-sm text-gray-400 italic">{cat.tagline}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

    </main>
  );
}
