import React from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

export default function CPA() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto border-x border-gray-200 p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-900">Complete 1 Task</h1>
      <p className="text-gray-600 text-sm mb-6">Install one free app to unlock your US number immediately.</p>

      <div className="space-y-4">
        {/* Mock Offer 1 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full"><Download size={20} className="text-orange-600"/></div>
            <div>
              <div className="font-bold text-gray-900">Binance Crypto</div>
              <div className="text-xs text-green-600">Payout: $2.40</div>
            </div>
          </div>
          <Link 
            href="/success"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
          >
            Install
          </Link>
        </div>

        {/* Mock Offer 2 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full"><Download size={20} className="text-purple-600"/></div>
            <div>
              <div className="font-bold text-gray-900">Kuda Bank</div>
              <div className="text-xs text-green-600">Payout: $1.80</div>
            </div>
          </div>
          <Link 
             href="/success"
             className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
          >
            Install
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        Checking completion status...
      </div>
    </div>
  );
}
