import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { FaCheckCircle, FaWifi, FaCopy, FaTimes, FaMobileAlt, FaAd } from "react-icons/fa";

export default function Success() {
  const [viewState, setViewState] = useState("loading"); // loading -> ad -> success
  const [adTimer, setAdTimer] = useState(5);
  const [sdkActive, setSdkActive] = useState(false);

  // 1. Sequence Logic
  useEffect(() => {
    // Step 1: Fake "Verifying Task" (2s)
    setTimeout(() => {
      setViewState("ad");
    }, 2000);
  }, []);

  // 2. Ad Timer Logic
  useEffect(() => {
    if (viewState === "ad") {
      if (adTimer > 0) {
        const timer = setTimeout(() => setAdTimer(adTimer - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setViewState("success");
        setSdkActive(true); // Enable SDK visual
      }
    }
  }, [viewState, adTimer]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex items-center justify-center p-4">
      
      <div className="w-full max-w-md">
        
        {/* STATE 1: VERIFYING */}
        {viewState === "loading" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold animate-pulse">Verifying Task Completion...</h2>
            <p className="text-slate-400 text-sm">Communicating with advertiser...</p>
          </div>
        )}

        {/* STATE 2: FORCED AD INTERSTITIAL */}
        {viewState === "ad" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-slate-700 rounded-2xl p-6 text-center relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-white border border-slate-600">
              Skip in {adTimer}s
            </div>
            
            <div className="mt-8 mb-8">
              <div className="w-full h-48 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 border-dashed">
                <div className="text-center text-slate-500">
                  <FaAd className="text-4xl mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Sponsored Advertisement</p>
                  <p className="text-[10px] mt-1">(PropellerAds Container)</p>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm">
              Your number is being provisioned. Please watch this short message.
            </p>
          </motion.div>
        )}

        {/* STATE 3: SUCCESS & DELIVERY */}
        {viewState === "success" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Success Header */}
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-emerald-500 text-4xl" />
              </div>
              <h1 className="text-3xl font-extrabold text-white">You are Live!</h1>
              <p className="text-slate-400">Task verified. Number allocated.</p>
            </div>

            {/* The Product: The Number */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 relative shadow-2xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                ACTIVE NOW
              </div>
              
              <div className="text-center space-y-1">
                <div className="text-xs text-slate-500 uppercase tracking-widest">United States (+1)</div>
                <div className="text-4xl font-mono font-bold text-white tracking-wider py-2">
                  (234) 567-8900
                </div>
              </div>

              <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                <FaCopy /> Copy Number
              </button>
            </div>

            {/* Bright SDK Revenue Badge */}
            {sdkActive && (
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 flex items-center gap-4"
              >
                <div className="bg-blue-500/20 p-3 rounded-full animate-pulse">
                  <FaWifi className="text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-blue-200 text-sm">Network Accelerator Active</div>
                  <div className="text-xs text-blue-400/70">
                    You are earning 5 credits/min via bandwidth sharing.
                  </div>
                </div>
              </motion.div>
            )}

            {/* Footer */}
            <div className="text-center pt-8">
              <p className="text-slate-600 text-xs">
                Session ID: 882-19A-F41 • <span className="underline cursor-pointer">Support</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Script Injection (Hidden) */}
        <Script 
          src="https://sdk.bright-sdk.com/bright-sdk.js" 
          strategy="lazyOnload"
          onLoad={() => console.log("Bright SDK Loaded & Monetizing")}
        />
      </div>
    </div>
  );
}
