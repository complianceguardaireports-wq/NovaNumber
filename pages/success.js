import React, { useState, useEffect } from "react";
import Script from "next/script";
import { CheckCircle, Wifi, Copy } from "lucide-react";

export default function Success() {
  const [adTimer, setAdTimer] = useState(5);
  const [showNumber, setShowNumber] = useState(false);
  const [sdkActive, setSdkActive] = useState(false);

  // Forced Ad Countdown Logic
  useEffect(() => {
    if (adTimer > 0) {
      const timer = setTimeout(() => setAdTimer(adTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowNumber(true);
    }
  }, [adTimer]);

  // Bright SDK Initialization (Simulated for Demo)
  useEffect(() => {
    if (showNumber) {
      // In production, this would be the actual SDK init
      console.log("Bright SDK Initialized: Opt-in=TRUE");
      setSdkActive(true);
    }
  }, [showNumber]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans max-w-md mx-auto p-6 text-center">
      {!showNumber ? (
        <div className="mt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-6"></div>
          <h2 className="text-xl font-bold">Finalizing Verification...</h2>
          <p className="text-gray-400 mt-2">Please watch this sponsor message</p>
          <div className="mt-6 bg-black p-4 rounded border border-gray-700">
            <p className="font-mono text-yellow-400">ADVERTISEMENT ({adTimer}s)</p>
            <div className="h-32 bg-gray-800 mt-2 flex items-center justify-center text-gray-500 text-xs">
              [PropellerAds Interstitial Container]
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-green-100 text-green-800 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <CheckCircle size={32} />
          </div>
          
          <h1 className="text-2xl font-bold">Number Active!</h1>
          
          {/* The Number Display */}
          <div className="bg-white text-gray-900 p-6 rounded-xl shadow-lg">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Your US Number</div>
            <div className="text-3xl font-mono font-bold tracking-wider mb-4">+1 (234) 567-8900</div>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded flex items-center justify-center gap-2 text-sm font-medium">
              <Copy size={16} /> Copy to Clipboard
            </button>
          </div>

          {/* Bright SDK Active Status */}
          {sdkActive && (
            <div className="bg-blue-900/50 border border-blue-500/30 p-4 rounded-lg text-left flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Wifi size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-blue-100 text-sm">? Bandwidth Sharing Active</div>
                <div className="text-xs text-blue-300 mt-1">
                  You are earning +5 min/day. <span className="underline cursor-pointer">Settings</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-8">
            Next billing cycle: <span className="text-gray-400">Sponsored (Free)</span>
          </p>
        </div>
      )}
      
      {/* Actual Bright SDK Script Injection */}
      <Script 
        src="https://sdk.bright-sdk.com/bright-sdk.js" 
        strategy="lazyOnload"
        onLoad={() => console.log("Bright SDK Loaded")}
      />
    </div>
  );
}
