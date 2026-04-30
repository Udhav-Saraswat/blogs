"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SUBTITLE =
  "Explore the mysteries of this world through insightful blogs, scientific explorations, philosophical dilemmas, and poetic reflections.";

const sections = [
  {
    title: "Philosophy",
    icon: "🧠",
    desc: "Free will, existence, consciousness",
    href: "/philosophical-blogs",
    gradient: "from-cyan-600/25 to-violet-700/20",
    border: "border-cyan-500/30 hover:border-cyan-400/70",
    glow: "hover:shadow-[0_0_22px_rgba(0,255,255,0.18)]",
  },
  {
    title: "Science",
    icon: "🔭",
    desc: "Quantum worlds, cosmic frontiers",
    href: "/scientific-blogs",
    gradient: "from-blue-600/25 to-indigo-700/20",
    border: "border-blue-500/30 hover:border-blue-400/70",
    glow: "hover:shadow-[0_0_22px_rgba(59,130,246,0.2)]",
  },
  {
    title: "Stories & Poetry",
    icon: "📖",
    desc: "Short stories, ghazals, nazms",
    href: "/books-ghazals-and-stories",
    gradient: "from-pink-600/20 to-purple-700/20",
    border: "border-pink-500/30 hover:border-pink-400/70",
    glow: "hover:shadow-[0_0_22px_rgba(236,72,153,0.18)]",
  },
];

export default function HomePage() {
  const [displayed, setDisplayed] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(SUBTITLE.slice(0, i));
      if (i >= SUBTITLE.length) {
        clearInterval(id);
        setTypingDone(true);
      }
    }, 18);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

      <div className="relative z-10 px-6 py-12 max-w-5xl w-full mx-auto">

        {/* Tag line */}
        <p className="animate-fade-in text-cyan-500/65 text-xs uppercase tracking-[0.38em] mb-5 delay-100">
          science · philosophy · poetry
        </p>

        {/* Hero heading */}
        <h1 className="animate-fade-in delay-200 text-4xl md:text-6xl font-bold leading-tight mb-4 shimmer-text">
          Welcome to Udhav&apos;s<br />
          <span className="text-white">Fragments of Life</span>
        </h1>

        {/* Decorative divider */}
        <div className="animate-fade-in delay-300 cosmic-divider" />

        {/* Typewriter subtitle */}
        <p className="animate-fade-in delay-400 text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 min-h-[4rem]">
          {displayed}
          {!typingDone && (
            <span className="inline-block w-0.5 h-[1.1em] bg-cyan-400 ml-0.5 align-middle animate-pulse-dot" />
          )}
        </p>

        {/* Explore section cards */}
        <div className="animate-slide-up delay-500 grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto w-full">
          {sections.map((s, i) => (
            <Link key={s.href} href={s.href}>
              <div
                className={`bg-gradient-to-br ${s.gradient} border ${s.border} ${s.glow} rounded-xl px-5 py-5 cursor-pointer transition-all duration-300 hover:scale-[1.05] text-left group`}
                style={{ animationDelay: `${0.5 + i * 0.08}s` }}
              >
                <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </span>
                <h3 className="text-white font-semibold text-base mb-1 group-hover:text-cyan-200 transition-colors duration-200">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-xs italic">{s.desc}</p>
                <span className="block mt-3 text-xs text-cyan-500/60 group-hover:text-cyan-400 transition-colors duration-200">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Poem card */}
        <div className="animate-slide-up delay-600 max-w-md mx-auto mb-6">
          <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl glow-card animate-border-glow">
            <div className="absolute -top-3 left-6 bg-gradient-to-r from-cyan-600 to-violet-600 text-white text-[10px] px-3 py-1 rounded-full tracking-widest uppercase font-semibold shadow-lg">
              Winter Silence
            </div>
            <p className="text-gray-200 leading-loose whitespace-pre-line text-left font-serif text-base md:text-lg italic">
{`Colder days,
Darker nights,
Heavier hearts,
Still eyes.
Words of silence,
Fire of ice,
Empty dreams —
That's life, sometimes.`}
            </p>
          </div>
        </div>

        {/* Quote card */}
        <div className="animate-slide-up delay-700 max-w-sm mx-auto">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl">
            <span className="text-5xl text-cyan-400/25 font-serif leading-none block -mb-2 text-left">
              &ldquo;
            </span>
            <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#baccff] via-white to-[#7faaff] italic text-sm drop-shadow-[0_0_8px_rgba(150,180,255,0.4)]">
              I said, I even don&apos;t know why I am writing, they said keep writing to know.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
