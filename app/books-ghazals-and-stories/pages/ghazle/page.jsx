"use client";

import React, { useState } from "react";

export default function Ghazle() {
  const [expanded, setExpanded] = useState(null);

  const ghazals = [
    {
      id: 1,
      title: "Vo tera khuda hai kya ?",
      content: `Jo itni mohabbat se bhi na badla,
Vo tera Khuda hai kya...

Hairat hai mujhe is baat par,
Tu ab bhi us par fida hai kya...

Ek pal bhi sukoon nahi uske bina,
Yahi dil-e-fanah hai kya...

Bina chhuye uska ehsaas hai yahan,
Ye in hawaon se mera rishta hai kya...

Bechain dil ko na bataun main ki vo kahan,
Ye khud mein khud se mera rishta hai kya...

Kaun hai uske saath, dil mein sawal kyu,
Mere dil se koi farar hai kya...

Bina kuch jaane samajhta hai khud ko,
Yahi dil-e-ghafil hai kya...

Jise dhoondta phirta hoon puri duniya mein main,
Vo yahi mere dil mein kahin chhupa hai kya...

Duniya magan hai apni dhun mein,
Ye ek mera dil hai yahan pareshan hai kya...

Uski aankhon ke bahar bhi duniya hai,
Mere dil se yahan kuch chhupa hai kya...

Jana... ab to khwabon mein aana chhod do,
Ab puri zindagi he tanhaaiyon ka ehsaas dilaogi kya...`,

      author: "— Ud",
    },
    { id: 2,
      title: "Zikarr kyuu ?",
      content: `Jo paani ke liye tarse,
Unse in sharaabon ka zikr kyu...

Jo jawani ke liye tarse,
Unse is zindagani ka zikr kyu...

Jo kahani ke liye tarse,
Unse in khwabon ka zikr kyu...

Jo mohabbat ke liye tarse,
Unse bewafai ka zikr kyu...

Jo deewaron ke liye tarse,
Unse in makanon ka zikr kyu...

Jo hawao ke liye tarse,
Unse in fizaaon ka zikr kyu...`,
                
      author: "— Ud",
    },
       { id: 3,
      title: "Har to chuke hai !",
      content: `Har to chuke hai,
ab bas tamasha hona baki hai...

Mohabbat to ho chuki hai,
ab bas unka rusva hona baki hai...

Manzil bhi mil gayi,
ab mera pagal hona baki hai...

Mujhe meri kismat bhi mil gayi,
ab kiske haq mai faisla hona baki hai...

Samajh kar ye samajh bhi aa gaya,
ab bas khud ko barbaad karna baki hai...

Mar to chuke hai,
ab bas janaza hona baki hai...`,
                
      author: "— Ud",
    }
   
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
