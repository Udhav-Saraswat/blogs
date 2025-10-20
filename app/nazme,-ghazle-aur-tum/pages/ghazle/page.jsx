"use client";

import React, { useState } from "react";

export default function Ghazle() {
  const [expanded, setExpanded] = useState(null);

  const ghazals = [
    {
      id: 1,
      title: "Vo tera khuda hai kya ?",
      content: `Jo itni mohabbat se bhi na badla,  
                Vo tera khuda hai kya...  

                Hairat h mujhe es bat par,  
                Tu ab bhi uspar fida hai kya...
                
                ek pal sukon nhi uske bina,
                ye dil dewana hai kya...

                bina chuua uska ahsas h yaha,
                ye in hawao se mera rishta h kya... 

                bechain dil ko mai na btau ki vo h kaha,
                ye khudme khudse mera rishta hai kya... 

                kon h uske sath, ye sawal kyu, 
                mere dil se koi farar h kya... 

                duniya magan h apni dhun mai,
                ye mera dil he yaha pareshan h kya... 

                uski ankho ke bahar bhi duniya hai,
                ye mere dil se chupa hai kya... 

                sab chor.. ye bata,
                pure jahan mai ek vohi dilruba hai kya... `,

      author: "— Ud",
    },
    { id: 2,
      title: "Zikarr kyuu ?",
      content: `Jo paani ke liya terse,  
                unse en sharabo ka zikarr kyu...  

                Jo jawani ke liya terse,
                unse es zindgani ka zikarr kyu... 

                Jo kahani ke liya terse,
                unse en khwabo ka zikarr kyu... 

                Jo mohabbat ke liya terse,
                unse be-wafai ka zikarr kyu... 

                Jo deewaro ke liya terse,
                unse en makano ka zikarr kyu... 

                Jo hawa ke liya terse,
                unse en fizao ka zikarr kyu...`,
                
      author: "— Ud",
    }
    //  ,{ id: 2,
    //   title: "Khwabo ke sehar mai",
    //   content: `Ek khwabo ke sehar mai,  
    //             Rat dhali duphar mai...  

                

    //             `,
                
    //   author: "— Ud",
    // },
  ];

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start text-center bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white py-20 px-6 relative overflow-hidden">
      {/* Subtle starry background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.05),transparent_70%)] blur-3xl"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 animate-pulse opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px]"></div>

      {/* Header */}
      <h1 className="relative text-5xl md:text-6xl font-bold text-cyan-400 mb-8 drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]">
        “Ghazle — Echoes of the Heart”
      </h1>
      <p className="relative text-lg text-gray-300 max-w-3xl mb-12 italic">
        Where every couplet whispers a story, and silence carries poetry.
      </p>

      {/* Ghazal List */}
      <div className="relative z-10 w-full max-w-4xl space-y-10">
        {ghazals.map((ghazal) => (
          <div
            key={ghazal.id}
            className="bg-gray-800/50 rounded-2xl p-6 text-left shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 hover:scale-[1.02] border border-gray-700/50"
          >
            {/* Title */}
            <h2 className="text-2xl font-semibold text-cyan-300 mb-3">
              {ghazal.id}. {ghazal.title}
            </h2>

            {/* Ghazal Text */}
            <p
              className={`relative text-gray-200 whitespace-pre-line transition-all duration-500 ease-in-out italic tracking-wide leading-relaxed ${
                expanded === ghazal.id ? "" : "line-clamp-3 blur-[0.2px]"
              }`}
            >
              “{ghazal.content}”
            </p>

            {/* Author */}
            <p className="text-gray-400 text-sm italic text-right mt-3">
              {ghazal.author}
            </p>

            {/* Expand / Collapse Button */}
            <div className="flex justify-end">
              <button
                onClick={() => toggleExpand(ghazal.id)}
                className="mt-3 text-cyan-400 hover:text-cyan-200 transition-all text-sm"
              >
                {expanded === ghazal.id ? "▲ Show Less" : "▼ Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
