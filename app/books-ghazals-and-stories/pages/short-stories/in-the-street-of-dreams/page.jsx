"use client";

import { useEffect, useState } from "react";

export default function ShortStories() {
  const [chapters, setChapters] = useState({});
  const bookKey = "In the Street of Dreams"; // matches JSON key

  useEffect(() => {
    fetch("/images/books.json")
      .then((res) => res.json())
      .then((data) => setChapters(data[bookKey] || {}))
      .catch((err) => console.error("Error loading book:", err));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-20 px-6 relative">

   {/* Download Button */}
<a
  href="images/InTheStreetOfDreams.pdf"
  target="_blank"
  className="
    absolute right-6 top-6 md:right-20 md:top-14
    px-4 py-2 md:px-5 md:py-2.5
    rounded-full
    text-sm md:text-base font-semibold
    text-cyan-200
    bg-white/5 backdrop-blur-md
    border border-cyan-400/40
    shadow-[0_0_10px_rgba(0,255,255,0.15)]
    hover:border-cyan-300 hover:text-white
    hover:shadow-[0_0_18px_rgba(0,255,255,0.35)]
    hover:bg-white/10
    transition-all duration-300
    flex items-center gap-2
  "
>
  <span className="text-base">📘</span>
  Download PDF
</a>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text
        bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 
        drop-shadow-[0_0_25px_rgba(0,200,255,0.5)] text-center">
        {bookKey}
      </h1>

      {/* Book Cover */}
      <img
        src="/images/cover.png"
        alt="Book Cover"
        className="
          mt-10 
          w-[350px] md:w-[420px]
          aspect-[2/3]
          object-cover 
          rounded-2xl 
          shadow-[0_0_25px_rgba(0,255,255,0.4)] 
          border border-cyan-500/40
        "
      />

      {/* Contents */}
      <div className="mt-16 w-full max-w-3xl bg-gray-900/40 p-6 rounded-xl border border-gray-800 backdrop-blur shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-300 mb-3">Contents</h2>

        <ul className="space-y-3 text-left">
          {Object.keys(chapters).map((chapter) => (
            <li
              key={chapter}
              className="cursor-pointer hover:text-purple-300 transition-all"
              onClick={() => scrollTo(chapter)}
            >
              • {chapter}
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="mt-10 w-full max-w-3xl border-b border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.3)]" />

      {/* Reader Section */}
      <article className="mt-20 max-w-3xl space-y-28 text-left leading-relaxed tracking-wide text-lg">
{Object.entries(chapters).map(([chapter, text], index, array) => (
  <div key={chapter}>
    <section id={chapter} className="scroll-mt-32">
      <h2 className="text-4xl font-bold text-purple-300 mb-5 drop-shadow-[0_0_20px_rgba(180,100,255,0.6)]">
        {chapter}
      </h2>
      <p className="text-gray-300 whitespace-pre-line text-[1.15rem] leading-[1.9rem]">
        {text}
      </p>
    </section>

    {/* Divider — except after last chapter */}
    {index < array.length - 1 && (
      <div className="my-10 w-full border-b border-purple-400/40 shadow-[0_0_12px_rgba(160,0,255,0.3)]" />
    )}
  </div>
        ))}
      </article>

      <div className="h-32" />

    </main>
  );
}
