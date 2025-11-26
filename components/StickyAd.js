import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function StickyAd() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-900/95 border-t border-slate-700 backdrop-blur-sm p-2 shadow-2xl animate-slide-up">
      <div className="max-w-md mx-auto relative">
        {/* Close Button (Fake Compliance) */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-4 right-2 bg-slate-700 text-slate-400 rounded-full p-1 hover:text-white"
        >
          <FaTimes size={10} />
        </button>

        {/* Ad Container (320x50 Mobile Banner) */}
        <div className="w-[320px] h-[50px] mx-auto bg-slate-800 border border-slate-600 border-dashed rounded flex items-center justify-center overflow-hidden">
           {/* PLACEHOLDER FOR AD NETWORK */}
           <div className="text-center">
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Sponsored Banner</p>
             <p className="text-[9px] text-slate-600">Your Brand Here</p>
           </div>
        </div>

        {/* "Remove Ads" Upsell Link */}
        <div className="text-center mt-1">
          <button className="text-[9px] text-slate-500 hover:text-emerald-400 underline decoration-dotted">
            Remove ads for $4.99/mo
          </button>
        </div>
      </div>
    </div>
  );
}
