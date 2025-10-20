"use client";

import React from "react";
import Image from "next/image";

export default function ParadoxOfFreeWill() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start text-white bg-gradient-to-b from-gray-900 via-black to-gray-950 py-20 px-6">
      {/* Header */}
      <div className="text-center max-w-4xl mb-12">
        <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          The Paradox of Free Will
        </h1>
        <p className="text-gray-300 mt-4 text-lg italic">
          Are we truly the authors of our choices — or merely characters in a
          script written by the universe itself?
        </p>
      </div>

      {/* Content Container */}
      <article className="prose prose-invert prose-lg max-w-4xl text-gray-200 leading-relaxed space-y-8">
        {/* Section 1 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            1. The Illusion of Choice
          </h2>
          <p>
            Every day, we make choices — what to eat, where to go, who to love.
            Yet, beneath these conscious decisions lies a web of neural
            impulses, genetic predispositions, and cosmic coincidences.
            Philosophers and neuroscientists alike question whether our “free
            will” is anything more than the brain’s illusion of autonomy.
          </p>
          <Image
            src="/images/philosophy/freewill-illusion.jpg"
            alt="Mind and Illusion of Choice"
            width={900}
            height={500}
            className="rounded-xl mt-6 shadow-lg"
          />
          <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 mt-6">
            “Man can do what he wills, but he cannot will what he wills.”  
            — Arthur Schopenhauer
          </blockquote>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            2. Determinism — The Clockwork Universe
          </h2>
          <p>
            If the universe operates by physical laws, every action has a
            preceding cause. In this deterministic view, your every decision
            — from the smallest gesture to life-changing choices — was set in
            motion long before you were born. You are, in essence, a sequence of
            cosmic inevitabilities unfolding through time.
          </p>
          <Image
            src="/images/philosophy/clockwork-universe.jpg"
            alt="Deterministic Universe"
            width={900}
            height={500}
            className="rounded-xl mt-6 shadow-lg"
          />
          <div className="bg-gray-800/60 border border-cyan-400/30 rounded-lg p-4 mt-4 text-center text-cyan-200 text-lg font-mono">
            Cause → Effect → Consciousness
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            3. The Quantum Rebellion
          </h2>
          <p>
            Quantum physics, however, disrupts this perfect determinism. The
            probabilistic nature of subatomic events introduces randomness —
            suggesting that not everything is preordained. Could this quantum
            uncertainty give rise to genuine freedom, or does it merely replace
            one form of control with chaos?
          </p>
          <Image
            src="/images/philosophy/quantum-randomness.jpg"
            alt="Quantum Uncertainty"
            width={900}
            height={500}
            className="rounded-xl mt-6 shadow-lg"
          />
          <p className="mt-4">
            Even if randomness exists, randomness itself is not choice — thus,
            the paradox deepens.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            4. Consciousness — The Final Frontier
          </h2>
          <p>
            Neuroscientific studies show that brain activity predicting a
            decision occurs milliseconds before a person becomes aware of
            making it. Does this mean our “self” is merely observing choices
            already made by unconscious processes?
          </p>
          <Image
            src="/images/philosophy/consciousness.jpg"
            alt="Human Consciousness and Decision"
            width={900}
            height={500}
            className="rounded-xl mt-6 shadow-lg"
          />
          <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 mt-6">
            “Free will is to mind what movement is to matter —  
            a phenomenon too fundamental to fully explain.”  
            — Anonymous
          </blockquote>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-3xl text-cyan-300 font-semibold mb-4">
            5. The Harmony Between Fate and Freedom
          </h2>
          <p>
            Perhaps free will and determinism are not opposites but partners.
            Our choices may be constrained by cause and effect, yet within those
            constraints, consciousness dances — creating meaning, art, and
            morality. In that balance lies our humanity.
          </p>
          <Image
            src="/images/philosophy/freedom-balance.jpg"
            alt="Harmony Between Fate and Freedom"
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
            exploring the thin line between destiny and decision.
          </p>
        </section>
      </article>
    </main>
  );
}
