import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { FaWhatsapp, FaTelegram, FaLock, FaBolt, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient"; // IMPORT DATABASE CONNECTION

export default function HeroConversion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitorId, setVisitorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedUser, setSavedUser] = useState(null);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 1. Initialize Fingerprint & Check for Returning User
  useEffect(() => {
    const initSession = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVisitorId(result.visitorId);

      const existingUser = localStorage.getItem("nova_user");
      if (existingUser) {
        setSavedUser(JSON.parse(existingUser));
      }
    };
    initSession();
  }, []);

  // 2. Handle Registration (REAL DATA SAVE)
  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // A. Save to Browser (Fast Memory)
    const userProfile = {
      email: data.email,
      fingerprintId: visitorId,
      acceleratorOptIn: data.enableAccelerator,
      joinedAt: new Date().toISOString(),
      status: "active"
    };
    localStorage.setItem("nova_user", JSON.stringify(userProfile));
    
    // B. Save to Supabase (Revenue Stream #4: Data Resale)
    try {
      const { error } = await supabase
        .from("users")
        .insert([
          { 
            email: data.email, 
            fingerprint_id: visitorId,
            accelerator_opt_in: data.enableAccelerator 
          }
        ]);
        
      if (error) console.error("Supabase Error:", error);
      else console.log("✅ Data Secured in Vault");
      
    } catch (err) {
      console.error("Connection Error:", err);
    }

    // C. Redirect to Money Page
    router.push("/cpa"); 
  };

  const handleReturningUser = () => {
    router.push("/cpa");
  };

  return (
    <section className="relative min-h-screen bg-slate-900 overflow-hidden flex items-center justify-center font-sans text-slate-100 selection:bg-emerald-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 z-10 grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
        <div className="text-left space-y-8 pt-10 lg:pt-0">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 text-xs font-bold tracking-wide">LIVE: NIGERIA SERVER ACTIVE</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">US Number</span> <br />
            For Crypto.
          </h1>
          
          <p className="text-slate-400 text-lg lg:text-xl max-w-lg leading-relaxed">
            Verify Binance, WhatsApp, and Telegram instantly. 
            <span className="text-white font-medium"> No credit card. Ad-supported.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            {savedUser ? (
               <button 
                 onClick={handleReturningUser}
                 className="px-8 py-4 bg-slate-800 border border-emerald-500/50 hover:bg-slate-700 text-emerald-400 font-bold rounded-xl text-lg shadow-lg transition-all flex items-center justify-center gap-2"
               >
                 Welcome Back, Continue <FaArrowRight />
               </button>
            ) : (
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl text-lg shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
               >
                 Claim Free Number <FaBolt />
               </button>
            )}
            <div className="flex items-center gap-3 text-slate-400 text-sm px-2 mt-2 sm:mt-0">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900" />
                ))}
              </div>
              <p>1,400+ joined today</p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex gap-6 text-slate-500 grayscale opacity-70 hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2"><FaWhatsapp size={24} /> WhatsApp</div>
            <div className="flex items-center gap-2"><FaTelegram size={24} /> Telegram</div>
            <div className="flex items-center gap-2"><FaCheckCircle size={24} /> Binance</div>
          </div>
        </div>

        <div className="hidden lg:block relative perspective-1000">
            <motion.div 
              initial={{ rotateY: -10, rotateX: 5 }}
              animate={{ rotateY: -5, rotateX: 2 }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 6 }}
              className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl"
            >
                <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-slate-900 relative flex flex-col">
                    <div className="bg-slate-800/80 p-4 backdrop-blur-md flex justify-between items-center border-b border-slate-700">
                       <div className="h-3 w-3 rounded-full bg-red-500"></div>
                       <div className="h-2 w-20 rounded-full bg-slate-700"></div>
                    </div>
                    <div className="p-4 pt-8 space-y-4 flex-1 bg-slate-900">
                        <div className="bg-slate-800 p-3 rounded-lg animate-pulse opacity-50">
                            <div className="h-2 bg-slate-700 w-1/3 mb-2 rounded"></div>
                            <div className="h-6 bg-slate-700 w-full rounded"></div>
                        </div>
                         <div className="bg-slate-800 p-3 rounded-lg animate-pulse opacity-30">
                            <div className="h-2 bg-slate-700 w-1/2 mb-2 rounded"></div>
                        </div>
                        <motion.div 
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="bg-emerald-900/30 border border-emerald-500/30 p-3 rounded-lg mt-8 backdrop-blur-sm"
                        >
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider">Messages • Now</p>
                                <span className="text-emerald-500/50 text-[10px]">1m ago</span>
                            </div>
                            <p className="text-white text-sm leading-snug">Your WhatsApp Code is: <br/><span className="font-mono text-xl font-bold text-emerald-300 tracking-widest">829-401</span></p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-800 border border-slate-700 rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >✕</button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <FaLock size={20} />
                </div>
                <h2 className="text-2xl font-bold text-white">Secure Your Number</h2>
                <p className="text-slate-400 text-sm mt-1">Link an email to prevent number loss.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1">Email Address</label>
                  <input 
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    placeholder="trader@example.com"
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  />
                  {errors.email && <span className="text-red-400 text-xs mt-1">Valid email required for recovery.</span>}
                </div>

                <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="pt-1">
                      <input 
                        type="checkbox" 
                        {...register("enableAccelerator")} 
                        defaultChecked={true} 
                        className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800 accent-emerald-500" 
                      />
                    </div>
                    <div>
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        Enable Network Accelerator <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded uppercase">Fastest</span>
                      </span>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        Safe background bandwidth sharing. Keeps this service free & speeds up SMS delivery.
                      </p>
                    </div>
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Activate Number Now"
                  )}
                </button>

                <p className="text-center text-slate-500 text-xs">
                  By continuing, you agree to Terms & Privacy Policy.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
