"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Poetry() {
  const router = useRouter();

  const categories = [
    {
      name: "Short Stories",
      path: "/books-ghazals-and-stories/pages/short-stories",
      color: "from-blue-500 to-cyan-400",
      emoji: "📖",
    },
    {
      name: "Ghazle",
      path: "/books-ghazals-and-stories/pages/ghazle",
      color: "from-pink-500 to-rose-400",
      emoji: "🌹",
    },
    {
      name: "Nazme",
      path: "/books-ghazals-and-stories/pages/nazme",
      color: "from-purple-500 to-fuchsia-400",
      emoji: "✨",
    },
    {
      name: "Quotes",
      path: "/books-ghazals-and-stories/pages/quotes",
      color: "from-amber-400 to-orange-500",
      emoji: "💫",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-20 px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_70%)]"></div>

      {/* Header */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-300 mb-6 drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]">
          Books Ghazals And Stories ✨
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10">
          A soulful collection of words — explore the realms of emotions through stories, verses, and quotes.
        </p>
      </div>

      {/* Category Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => router.push(cat.path)}
            className={`cursor-pointer bg-gradient-to-r ${cat.color} p-[2px] rounded-2xl transition-transform duration-300 hover:scale-105`}
          >
            <div className="bg-gray-900 rounded-2xl py-12 px-10 flex flex-col items-center justify-center hover:bg-opacity-80 transition-all">
              <span className="text-5xl mb-4">{cat.emoji}</span>
              <h2 className="text-2xl font-semibold text-white">{cat.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
