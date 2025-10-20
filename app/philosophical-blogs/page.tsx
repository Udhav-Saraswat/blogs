"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Philosophy() {
  const router = useRouter();

  // Example blog data (each has its own route)
  const blogs = [
    {
      id: 1,
      title: "Coming Soon",
      excerpt: "",
      image: "/images/coming_soon.png",
      path: "",
    }
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-20 px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]"></div>

      {/* Heading */}
      <div className="relative z-10 p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          Reflections from the Mind — The Philosophy Blog
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Journey into questions of meaning, existence, and consciousness through thoughtful explorations.
        </p>
      </div>

      {/* Blog List */}
      <div className="relative z-10 mt-12 w-full max-w-5xl space-y-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col md:flex-row bg-gray-800/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-400/30 transition-shadow duration-300"
          >
            {/* Blog Image */}
            <div className="md:w-1/3 relative">
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={250}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Blog Content */}
            <div className="md:w-2/3 p-6 flex flex-col justify-center text-left">
              <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-300 mb-4">{blog.excerpt}</p>

              <button
                onClick={() => router.push(blog.path)} // 👈 dynamic route per blog
                className="self-start px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
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

// coming soon

// "use client";

// import React from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Philosophy() {
//   const router = useRouter();

//   // Example blog data (each has its own route)
//   const blogs = [
//     {
//       id: 1,
//       title: "The Paradox of Free Will",
//       excerpt:
//         "Can freedom truly exist in a deterministic universe? A dive into the age-old philosophical puzzle of choice and causality.",
//       image: "/images/philosophy/free-will.jpg",
//       path: "/philosophical-blogs/free-will",
//     },
//     {
//       id: 2,
//       title: "Meaning in a Vast Cosmos",
//       excerpt:
//         "Exploring existentialism and the search for purpose in a universe that seems indifferent to human existence.",
//       image: "/images/philosophy/cosmos-meaning.jpg",
//       path: "/philosophical-blogs/cosmos-meaning",
//     },
//     {
//       id: 3,
//       title: "The Illusion of Time",
//       excerpt:
//         "Does time flow, or do we simply perceive it as such? Let’s unravel what philosophers and physicists think about temporal reality.",
//       image: "/images/philosophy/time.jpg",
//       path: "/philosophical-blogs/time",
//     },
//   ];

//   return (
//     <main className="relative min-h-screen flex flex-col items-center justify-start text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-20 px-6">
//       {/* Background Glow */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]"></div>

//       {/* Heading */}
//       <div className="relative z-10 p-10">
//         <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
//           Reflections from the Mind — The Philosophy Blog
//         </h1>
//         <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//           Journey into questions of meaning, existence, and consciousness through thoughtful explorations.
//         </p>
//       </div>

//       {/* Blog List */}
//       <div className="relative z-10 mt-12 w-full max-w-5xl space-y-10">
//         {blogs.map((blog) => (
//           <div
//             key={blog.id}
//             className="flex flex-col md:flex-row bg-gray-800/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-400/30 transition-shadow duration-300"
//           >
//             {/* Blog Image */}
//             <div className="md:w-1/3 relative">
//               <Image
//                 src={blog.image}
//                 alt={blog.title}
//                 width={400}
//                 height={250}
//                 className="object-cover w-full h-full"
//               />
//             </div>

//             {/* Blog Content */}
//             <div className="md:w-2/3 p-6 flex flex-col justify-center text-left">
//               <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
//                 {blog.title}
//               </h2>
//               <p className="text-gray-300 mb-4">{blog.excerpt}</p>

//               <button
//                 onClick={() => router.push(blog.path)} // 👈 dynamic route per blog
//                 className="self-start px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all"
//               >
//                 Read More →
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

