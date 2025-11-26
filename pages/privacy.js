import React from "react";
import Link from "next/link";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-300 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-slate-700 pb-6">
          <Link href="/" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition">
            <FaArrowLeft className="text-emerald-400" />
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaShieldAlt className="text-emerald-500" />
            Privacy & Terms
          </h1>
        </div>
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Service Usage</h2>
            <p>NovaNumber provides temporary virtual numbers supported by advertising. By using this service, you agree to view advertisements in exchange for free usage.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Network Acceleration (Bright SDK)</h2>
            <p>You may opt-in to the Bright SDK network. This allows Bright Data to use your device bandwidth to download public web data.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
