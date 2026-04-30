import React from "react";
import Image from "next/image";

export default function AboutMe() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-24 px-6">

      {/* Radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.07),transparent_65%)]" />

      <div className="relative z-10 max-w-3xl w-full">

        {/* Heading */}
        <h1 className="animate-fade-in text-4xl md:text-5xl font-bold text-cyan-400 mb-10 animate-glow">
          Meet the Mind Behind the Cosmos ✨
        </h1>

        {/* Profile photo — floating with animated rings */}
        <div className="flex justify-center mb-10 animate-float">
          <div className="relative flex items-center justify-center">
            {/* Outer blur halo */}
            <div className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-cyan-400/10 blur-2xl" />
            {/* Slow-spinning decorative ring */}
            <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full border border-cyan-400/30 animate-spin-slow" />
            {/* Inner dashed ring */}
            <div
              className="absolute w-44 h-44 md:w-60 md:h-60 rounded-full border border-dashed border-violet-400/25"
              style={{ animation: "spinSlow 35s linear infinite reverse" }}
            />
            <Image
              width={400}
              height={400}
              src="images/ud.jpg"
              alt="Udhav — creator"
              className="relative w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-cyan-400/60 shadow-[0_0_32px_rgba(0,255,255,0.35)] object-cover z-10"
            />
          </div>
        </div>

        {/* Bio card */}
        <div className="animate-slide-up delay-200 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 glow-card max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Hi, I&apos;m{" "}
            <span className="text-cyan-400 font-semibold">Udhav</span> — a
            curious explorer of existence, blending the logical beauty of science
            with the timeless wonder of philosophy and the soulful expression of
            poetry. Through this space, I share my reflections, discoveries, and
            creative musings that seek to connect mind and cosmos.
          </p>

          <div className="cosmic-divider" />

          <p className="text-gray-400 italic text-base">
            &ldquo;Between atoms and stars lies the story of what it means to be human.&rdquo;
          </p>
        </div>

      </div>
    </main>
  );
}
