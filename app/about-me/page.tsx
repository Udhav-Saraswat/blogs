import React from "react";
import Image from "next/image";

export default function AboutMe() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1),transparent_70%)]"></div>

      <div className="relative z-10 p-10 max-w-4xl">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-8 drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]">
          Meet the Mind Behind the Cosmos ✨
        </h1>

        {/* Profile Photo */}
        <div className="flex justify-center mb-8">
          <Image
            width={400}
            height={250}
            src="images/ud.jpg" // 👈 replace with your actual image path
            alt="Ud - Creator"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)] object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Hi, I’m <span className="text-cyan-400 font-semibold">Udhav</span> — a curious explorer of existence,
          blending the logical beauty of science with the timeless wonder of philosophy and the soulful expression of poetry.
          Through this space, I share my reflections, discoveries, and creative musings that seek to connect mind and cosmos.
        </p>

        <p className="text-md text-gray-400 mt-6 italic">
          “Between atoms and stars lies the story of what it means to be human.”
        </p>
      </div>
    </main>
  );
}

