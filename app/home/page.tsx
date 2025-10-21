import StarField from "@/components/StarField";

export default function About() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <StarField />
      <div className="relative z-10 p-10">
       <h1 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          Welcome to Ud&apos;s Personal Blogging website — where science, philosophy, and poetry meet the cosmos.
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl items-center text-center mx-auto" >
          Explore the mysteries of the this world through insightful blogs, scientific explorations, philosophical dilemma
          and poetic reflections.
        </p>
      </div>
    </main>
  );
}
