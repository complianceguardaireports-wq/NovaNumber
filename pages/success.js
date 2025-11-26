import React, { useState, useEffect } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { FaCheckCircle, FaWifi, FaCopy, FaAd, FaBolt } from "react-icons/fa";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function Success() {
  const [viewState, setViewState] = useState("loading"); 
  const [adTimer, setAdTimer] = useState(5); // 5 Seconds Forced View
  const [visitorId, setVisitorId] = useState(null);

  // 1. Identity Resolution (Critical for Bright SDK Payment)
  useEffect(() => {
    const loadIdentity = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);
    };
    loadIdentity();
  }, []);

  // 2. Sequence Logic (Loading -> Ad -> Success)
  useEffect(() => {
    setTimeout(() => {
      setViewState("ad");
    }, 2000); // 2s "Fake Verification"
  }, []);

  // 3. Ad Timer & SDK Activation
  useEffect(() => {
    if (viewState === "ad") {
      if (adTimer > 0) {
        const timer = setTimeout(() => setAdTimer(adTimer - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setViewState("success");
        // --- REVENUE STREAM #3: ACTIVATE BRIGHT SDK ---
        if (window.BrightSDK && visitorId) {
            console.log("💰 Bright SDK: Initializing for User", visitorId);
            window.BrightSDK.init({
                userId: visitorId,
                optIn: true, // User consented on Home Page
                onReward: (minutes) => console.log("Passive Income Earned:", minutes)
            });
        }
      }
    }
  }, [viewState, adTimer, visitorId]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex items-center justify-center p-4 overflow-hidden">
      
      <div className="w-full max-w-md relative z-10">
        
        {/* STATE 1: VERIFYING */}
        {viewState === "loading" && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-bold animate-pulse">Verifying Task Completion...</h2>
            <p className="text-slate-400 text-sm">Syncing with advertiser network...</p>
          </div>
        )}

        {/* STATE 2: FORCED AD REVENUE (Stream #2) */}
        {viewState === "ad" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-slate-700">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                 <FaAd className="text-amber-500"/> SPONSORED
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
                Wait: {adTimer}s
              </span>
            </div>
            
            <div className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-neutral-900 relative">
               {/* --- PLACE YOUR PROPELLER ADS SCRIPT HERE --- */}
               <div className="text-center space-y-4 z-10">
                  <p className="text-slate-500 text-xs uppercase tracking-widest">Advertisement</p>
                  <div className="w-[300px] h-[250px] bg-slate-800 border-2 border-dashed border-slate-700 rounded flex items-center justify-center">
                      <span className="text-slate-600 text-sm font-medium px-8 text-center">
                        Place PropellerAds "Banner 300x250" Code Here
                      </span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* STATE 3: PRODUCT DELIVERY + PASSIVE INCOME (Stream #3) */}
        {viewState === "success" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Success Header */}
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <FaCheckCircle className="text-emerald-500 text-4xl" />
              </div>
              <h1 className="text-3xl font-extrabold text-white">Number Active!</h1>
              <p className="text-slate-400">Ready for WhatsApp & Telegram.</p>
            </div>

            {/* The Number Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 relative shadow-2xl group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">
                LIVE
              </div>
              <div className="text-center space-y-1 pt-2">
                <div className="text-xs text-slate-500 uppercase tracking-widest">United States (+1)</div>
                <div className="text-4xl font-mono font-bold text-white tracking-wider py-2 select-all">
                  (234) 567-8900
                </div>
              </div>
              <button className="w-full mt-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 font-medium">
                <FaCopy /> Copy to Clipboard
              </button>
            </div>

            {/* REVENUE STREAM #3: VISUAL CONFIRMATION */}
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-4 flex items-center gap-4 backdrop-blur-sm"
              >
                <div className="bg-blue-500/20 p-3 rounded-full relative">
                  <FaWifi className="text-blue-400 relative z-10" />
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping"></div>
                </div>
                <div>
                  <div className="font-bold text-blue-100 text-sm flex items-center gap-2">
                    Bandwidth Accelerator <FaBolt className="text-yellow-400 text-xs"/>
                  </div>
                  <div className="text-xs text-blue-300/80 leading-tight mt-1">
                    <span className="text-emerald-400 font-bold">Active.</span> Earning credits for next month.
                    <br/>Status: <span className="font-mono opacity-75">Connected (Nigeria_Lagos_Node)</span>
                  </div>
                </div>
              </motion.div>

            {/* Footer */}
            <div className="text-center pt-8">
              <p className="text-slate-600 text-xs">
                Session ID: {visitorId ? visitorId.substring(0, 8) : "LOADING..."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* --- CRITICAL: BRIGHT SDK SCRIPT INJECTION --- */}
      {/* This loads the script so window.BrightSDK becomes available above */}
      <Script 
        src="https://sdk.bright-sdk.com/bright-sdk.js" 
        strategy="afterInteractive"
        onLoad={() => console.log("✅ Bright SDK Script Loaded")}
      />
    </div>
  );
}
