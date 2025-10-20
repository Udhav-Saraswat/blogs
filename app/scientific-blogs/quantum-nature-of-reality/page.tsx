"use client";

import React from "react";
import Image from "next/image";

export default function QuantumNatureOfReality() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start text-white bg-gradient-to-b from-gray-900 via-black to-gray-950 py-20 px-6">
      {/* Header */}
      <div className="text-center max-w-4xl mb-12">
        <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          The Quantum Nature of Reality
        </h1>
        <p className="text-gray-300 mt-4 text-lg italic">
          Exploring the bizarre, beautiful world where certainty dissolves and probability reigns.
        </p>
      </div>

      {/* Content Container */}
      <article className="prose prose-invert prose-lg max-w-4xl text-gray-200 leading-relaxed space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            1. The Strange Foundations
          </h2>
          <p>
            Quantum mechanics challenges our very perception of what’s real. At
            the smallest scales, particles behave both as waves and as
            discrete entities — a duality that defies classical intuition. The
            famous double-slit experiment shows that observation itself changes
            the outcome, suggesting consciousness plays a subtle role in shaping
            the universe.
          </p>
          <Image
            src="/images/science/quantum-wave.jpg"
            alt="Quantum Wave Interference"
            width={900}
            height={500}
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            2. The Mathematics of Possibility
          </h2>
          <p>
            At its core, quantum mechanics is a mathematical framework that
            predicts probabilities rather than certainties. A particle’s
            behavior is described by a wave function, denoted as ψ (psi), which
            encodes all possible states it could occupy.
          </p>

          {/* Equation block */}
          <div className="bg-gray-800/60 border border-cyan-400/30 rounded-lg p-4 mt-4 text-center text-cyan-200 text-lg font-mono">
            |ψ|² = Probability Density
          </div>

          <p className="mt-6">
            The act of measurement “collapses” this wave function, forcing the
            system to take on one definite value — an idea that continues to
            puzzle even the greatest physicists. In the words of Richard Feynman:
          </p>

          <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 mt-4">
            “I think I can safely say that nobody understands quantum mechanics.”
          </blockquote>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            3. Quantum Entanglement — The Cosmic Connection
          </h2>
          <p>
            When two particles become entangled, their states are linked no
            matter how far apart they are. Measuring one instantly influences
            the other — faster than the speed of light. Einstein called this
            “spooky action at a distance,” but experiments have repeatedly
            confirmed it.
          </p>
          <Image
            src="/images/science/entanglement.jpg"
            alt="Quantum Entanglement"
            width={900}
            height={500}
            className="rounded-xl mt-6 shadow-lg"
          />
          <p className="mt-4">
            Modern quantum computing and teleportation research rely on this
            phenomenon — showing that entanglement isn’t just theoretical, but a
            cornerstone of next-generation technology.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            4. Schrödinger’s Cat — A Thought Experiment
          </h2>
          <p>
            Erwin Schrödinger proposed a paradox to illustrate quantum
            superposition: a cat in a box that is both alive and dead until
            observed. Mathematically, the cat’s state can be described as:
          </p>

          {/* Equation block */}
          <div className="bg-gray-800/60 border border-cyan-400/30 rounded-lg p-4 mt-4 text-center text-cyan-200 text-lg font-mono">
            |Ψ⟩ = (1/√2)(|Alive⟩ + |Dead⟩)
          </div>

          <p className="mt-6">
            Only when someone opens the box does the wave function collapse,
            revealing a single outcome — a poetic reminder that reality itself
            may be born from observation.
          </p>
          <Image
            src="/images/science/schrodinger-cat.jpg"
            alt="Schrödinger's Cat Thought Experiment"
            width={900}
            height={500}
            className="rounded-xl mt-6 shadow-lg"
          />
        </section>

        {/* Footer */}
        <section className="text-center mt-12">
          <hr className="border-gray-700 my-8" />
          <p className="text-gray-400 italic">
            Written by <span className="text-cyan-400">Ud</span> —  
            where science meets wonder, and equations become poetry.
          </p>
        </section>
      </article>
    </main>
  );
}
