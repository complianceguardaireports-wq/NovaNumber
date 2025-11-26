import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaDownload, FaCheckCircle, FaLock, FaShieldAlt, FaClock } from "react-icons/fa";

export default function CPADashboard() {
  const [verifying, setVerifying] = useState(false);
  const [progress, setProgress] = useState(30);

  // Simulate a "System Scan" on load
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 85 ? prev + 1 : prev));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = () => {
    setVerifying(true);
    // In a real app, this would poll the CPA network for postback
    // For demo, we pretend to wait for them to return
    setTimeout(() => {
      alert("Please install the app and open it for 30 seconds to confirm.");
      setVerifying(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 pb-20">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center sticky top-0 z-10 shadow-lg">
        <div className="font-bold text-xl flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Verification Pending
        </div>
        <div className="text-xs font-mono text-slate-400">ID: 8X-2910</div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-8">
        
        {/* Status Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-700">
            <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
            <FaLock className="text-slate-400 text-2xl" />
            <div className="absolute bottom-0 right-0 bg-amber-500 w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-800">
              <span className="text-[10px] font-bold text-slate-900">!</span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Final Security Step</h1>
          <p className="text-slate-400 text-sm">
            To prevent bot abuse, please complete <span className="text-emerald-400 font-bold">1 sponsor task</span> to unlock your number +1 (234) ***-****.
          </p>
        </div>

        {/* Task List (The Revenue Generator) */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">Available Tasks (High Speed)</div>
          
          {/* Offer 1: High Payout */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-between shadow-lg cursor-pointer relative group overflow-hidden"
            onClick={handleTaskClick}
          >
            {/* Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="flex items-center gap-4">
              <div className="bg-yellow-500/10 p-3 rounded-lg">
                 {/* Icon placeholder for Binance */}
                 <FaShieldAlt className="text-yellow-500 text-xl" />
              </div>
              <div>
                <div className="font-bold text-white">Binance Pro</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded">Free Install</span>
                  <span>+ Instant Unlock</span>
                </div>
              </div>
            </div>
            <Link href="/success" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-sm font-bold px-4 py-2 rounded-lg transition-colors z-10">
              Unlock
            </Link>
          </motion.div>

          {/* Offer 2: Backup */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/10 p-3 rounded-lg">
                 <FaDownload className="text-purple-500 text-xl" />
              </div>
              <div>
                <div className="font-bold text-white">Kuda Bank</div>
                <div className="text-xs text-slate-400">Install + Open</div>
              </div>
            </div>
            <Link href="/success" className="bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Start
            </Link>
          </div>
        </div>

        {/* Footer Trust */}
        <div className="text-center space-y-2 pt-8">
           <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
             <FaClock /> Verifying installs automatically in 30s
           </div>
           <p className="text-[10px] text-slate-600">
             Advertiser ID: 882-190-221 • System Version 2.4.1
           </p>
        </div>

        {/* Fake "Checking" Overlay */}
        {verifying && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
             <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center shadow-2xl">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-white font-bold">Verifying Task...</h3>
                <p className="text-slate-400 text-xs mt-2">Please keep the app open.</p>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
