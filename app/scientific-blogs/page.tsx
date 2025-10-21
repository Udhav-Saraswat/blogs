"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Science() {
  const router = useRouter();

  // Scientific blog data with routes
  const blogs = [
    {
      id: 1,
      title: "Coming Soon",
      excerpt: "",
      image: "images/coming_soon.png",
      route: "",
    }
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-20 px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)] blur-3xl"></div>

      {/* Header Section */}
      <div className="relative z-10 p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          Exploring the Science Behind the Stars 🔭
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Step into the world of scientific discovery — where curiosity fuels exploration and every mystery hides a new truth.
        </p>
      </div>

      {/* Blog List */}
      <div className="relative z-10 mt-12 w-full max-w-5xl space-y-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col md:flex-row bg-gray-800/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-[1.02]"
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
                onClick={() => router.push(blog.route)}
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

// export default function Science() {
//   const router = useRouter();

//   // Scientific blog data with routes
//   const blogs = [
//     {
//       id: 1,
//       title: "The Quantum Nature of Reality",
//       excerpt:
//         "Dive into the mysterious world of quantum mechanics — where particles exist in multiple states and observation changes everything.",
//       image: "/images/science/quantum.jpg",
//       route: "/scientific-blogs/quantum-nature-of-reality",
//     },
//     {
//       id: 2,
//       title: "Journey to the Edge of the Universe",
//       excerpt:
//         "Explore the cosmic frontier — from black holes to distant galaxies — and uncover how science expands our understanding of existence.",
//       image: "/images/science/universe.jpg",
//       route: "/scientific-blogs/journey-to-the-edge-of-the-universe",
//     },
//     {
//       id: 3,
//       title: "The Dance of DNA",
//       excerpt:
//         "A deep look into the blueprint of life — decoding how genetics shapes our being and connects us to all living forms.",
//       image: "/images/science/dna.jpg",
//       route: "/scientific-blogs/the-dance-of-dna",
//     },
//   ];

//   return (
//     <main className="relative min-h-screen flex flex-col items-center justify-start text-center overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-20 px-6">
//       {/* Background Glow */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)] blur-3xl"></div>

//       {/* Header Section */}
//       <div className="relative z-10 p-10 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-6 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
//           Exploring the Science Behind the Stars 🔭
//         </h1>
//         <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//           Step into the world of scientific discovery — where curiosity fuels exploration and every mystery hides a new truth.
//         </p>
//       </div>

//       {/* Blog List */}
//       <div className="relative z-10 mt-12 w-full max-w-5xl space-y-10">
//         {blogs.map((blog) => (
//           <div
//             key={blog.id}
//             className="flex flex-col md:flex-row bg-gray-800/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-[1.02]"
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
//                 onClick={() => router.push(blog.route)}
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
