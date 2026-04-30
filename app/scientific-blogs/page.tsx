"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Science() {
  const router = useRouter();

  const blogs = [
    {
      id: 1,
      title: "Coming Soon",
      excerpt: "",
      image: "images/coming_soon.png",
      route: "",
    },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-20 px-6">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,255,255,0.06),transparent_65%)] blur-3xl" />

      {/* Header */}
      <div className="relative z-10 pt-6 pb-2 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 animate-glow">
          Exploring the Science Behind the Stars 🔭
        </h1>
        <p className="text-cyan-500/60 uppercase tracking-[0.25em] text-xs mb-4">The Science Blog</p>
        <div className="cosmic-divider" />
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Step into the world of scientific discovery — where curiosity fuels exploration and every mystery hides a new truth.
        </p>
      </div>

      {/* Blog list */}
      <div className="relative z-10 mt-14 w-full max-w-5xl space-y-10">
        {blogs.map((blog) =>
          blog.title === "Coming Soon" ? (
            <div key={blog.id} className="flex flex-col items-center justify-center py-16 animate-scale-in">
              <div className="text-8xl mb-6 animate-float">🔭</div>
              <h2 className="text-3xl font-bold text-cyan-300 mb-2 animate-glow">Coming Soon</h2>
              <div className="cosmic-divider" />
              <p className="text-gray-400 italic text-lg mt-2">
                Discoveries on the way — stay curious&hellip;
              </p>
            </div>
          ) : (
            <div
              key={blog.id}
              className="flex flex-col md:flex-row bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden glow-card"
            >
              <div className="md:w-1/3 relative">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-2/3 p-6 flex flex-col justify-center text-left">
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2">{blog.title}</h2>
                <p className="text-gray-300 mb-4">{blog.excerpt}</p>
                <button
                  onClick={() => router.push(blog.route)}
                  className="self-start px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
                >
                  Read More →
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}
