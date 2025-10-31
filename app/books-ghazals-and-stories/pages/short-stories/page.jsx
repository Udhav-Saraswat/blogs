"use client";
import { useRouter } from "next/navigation";

export default function ShortStories() {
  const router = useRouter();

  const stories = [
    {
      title: "In the street of dreams",
      desc: "In the hush between past and present, he discovers that meaning isn’t found — it is remembered.",
      img: "https://udhav-saraswat.github.io/blogs/images/cover1.png",
      link: "/books-ghazals-and-stories/pages/short-stories/in-the-street-of-dreams"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center text-center text-white bg-black py-16 px-6">
      <h1 className="text-4xl font-bold text-cyan-300 mb-10">📖 Short Stories</h1>

      <div className="w-full max-w-5xl space-y-6">
        {stories.map((story, i) => (
          <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row">
            
            <img 
              src={story.img}
              alt={story.title}
              className="w-full md:w-56 h-48 object-cover md:h-auto cursor-pointer"
              onClick={() => router.push(story.link)}
            />

            <div className="p-5 text-left flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-cyan-300">{story.title}</h2>
              <p className="text-gray-300 mt-2">{story.desc}</p>

              <button
                onClick={() => router.push(story.link)}
                className="mt-4 inline-block w-fit px-4 py-2 bg-cyan-500/20 border border-cyan-400 rounded-lg text-cyan-300 hover:bg-cyan-500/30 hover:border-white transition-all duration-300"
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
