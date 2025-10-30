import StarField from "@/components/StarField";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <StarField />

      <div className="relative z-10 p-10">
        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          Welcome to Udhav&apos;s Personal Blogging website — where science, philosophy, and poetry meet the cosmos.
        </h1>

        <p className="text-lg text-gray-300 max-w-3xl items-center text-center mx-auto">
          Explore the mysteries of this world through insightful blogs, scientific explorations, philosophical dilemmas,
          and poetic reflections.
        </p>

        {/* Winter Silence — Main Poem Block */}
        <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl max-w-xl mx-auto shadow-lg">
         <p className="winterPoem leading-relaxed whitespace-pre-line">
{`Colder days,
Darker nights,
Heavier hearts,
Still eyes.
Words of silence,
Fire of ice,
Empty dreams —
That’s life, sometimes.`}
</p>
        </div>

        {/* Winter Silence — Short Line */}
        <div className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl max-w-xs mx-auto shadow-md">
          <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#baccff] via-white to-[#7faaff] italic text-sm drop-shadow-[0_0_8px_rgba(150,180,255,0.4)]">
    I said, I even don&apos;t know why I am writing, they said keep writing to know.
</p>
        </div>

      </div>
    </main>
  );
}
