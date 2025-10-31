"use client";

import React from "react";

export default function Quotes() {
  const quotes = [
    {
      text: " ",
      author: "Ud",
    }
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white flex flex-col items-center py-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)] blur-3xl"></div>

      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 relative z-10">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-3 drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">
          Nazme, Ghazle aur Tum
        </h1>

        {/* Decorative divider */}
        <div className="h-[2px] w-28 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent mb-4 rounded-full shadow-[0_0_10px_rgba(0,255,255,0.4)] animate-pulse"></div>

        {/* Poetic tagline */}
        <p className="text-gray-300 text-lg italic max-w-2xl text-center">
          “Alfaaz jo dil ke raaste se nikal kar rooh tak pahunch jaayein.”
        </p>
      </div>

      {/* Quotes List */}
      <div className="relative z-10 max-w-3xl w-full space-y-6">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-800/40 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start">
              <div className="text-cyan-400 text-2xl font-semibold mr-4 mt-1">
                {index + 1}.
              </div>
              <p className="text-gray-200 italic text-lg leading-relaxed flex-1">
                “{quote.text}”
              </p>
            </div>
            <div className="text-gray-400 text-right text-sm mt-3 pr-2">
              — {quote.author}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
