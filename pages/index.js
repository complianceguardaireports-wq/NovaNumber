import React, { useState } from "react";
import { Smartphone } from "lucide-react";

export default function Home() {
  const [optIn, setOptIn] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto border-x border-gray-200 shadow-lg text-gray-900">
      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center border-b">
        <span className="font-bold text-lg flex items-center gap-2"><Smartphone size={20}/> NovaNumber</span>
        <span className="text-sm text-gray-500">???? EN [Help]</span>
      </div>

      {/* Hero */}
      <div className="p-6 text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Free US Number in 60 Seconds</h1>
        <p className="text-gray-600">Complete 1 task ? watch 1 ad ? get WhatsApp delivery.</p>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-left text-xs text-gray-500 mb-1">???? United States ?</div>
          <div className="text-xl font-mono tracking-wider text-black">+1 (234) 567-8900</div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-medium flex items-center justify-center gap-2">
            ?? Continue with Email <span className="text-xs bg-gray-300 px-1 rounded">FREE</span>
          </button>
          
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button 
            onClick={() => window.location.href = "/cpa"}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
          >
            ??? Fingerprint Instant Access
          </button>
          <p className="text-sm text-green-600 font-medium">?? Earn ?800/task | Ad-funded</p>
        </div>

        {/* Bright SDK Opt-in */}
        <div className="border p-3 rounded-lg bg-gray-50 text-left flex items-start gap-3">
          <input 
            type="checkbox" 
            className="mt-1 w-5 h-5"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
          />
          <div className="text-sm text-gray-700">
            <span className="font-bold">Share idle bandwidth</span> for extra features (no cost).
            <br/>
            <span className="text-xs text-gray-500">Earn +5 min number time! [Privacy ?]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
