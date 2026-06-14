import React from "react";
import { ShieldCheck, Heart, Lock, HelpCircle } from "lucide-react";

export default function SelfDestructedView() {
  return (
    <div className="flex flex-col items-center justify-center p-2 text-center relative w-full" id="self-destructed-view">
      {/* Gentle visual floating bubble background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-100/40 blur-[1px] animate-float-gentle text-purple-300 font-bold"
            style={{
              fontSize: "12px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${Math.random() * 6 + 4}s`,
            }}
          >
            ✧
          </div>
        ))}
      </div>

      <div className="w-full max-w-sm p-5 bg-white/95 rounded-3xl border border-purple-100 relative overflow-hidden">
        <div className="flex justify-center mb-4">
          <div className="relative animate-float-gentle">
            <div className="absolute -inset-2 rounded-full bg-emerald-200/60 blur opacity-60 animate-pulse"></div>
            <div className="relative bg-emerald-50 p-3 rounded-full border-2 border-emerald-200">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold font-sans text-purple-950 tracking-tight mb-1">
          Lock Activated! 🔒
        </h3>
        
        <p className="text-emerald-700 text-[10px] font-bold tracking-wide uppercase bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-4 border border-emerald-100">
          Letter Safely Re-Locked & Privacy Ensured
        </p>

        <div className="bg-purple-50/50 rounded-2xl p-4 text-left space-y-3 mb-4 border border-purple-50">
          <p className="text-gray-700 text-xs leading-relaxed font-sans font-medium">
            Dear <span className="font-bold text-purple-900">Anjali (Mastarinbai)</span>, 
            the password you used in my phone was input correctly. The website database lock is active.
          </p>
          <p className="text-gray-600 text-[11px] leading-relaxed font-sans font-medium">
            This means that even if someone else gets a hold of this website address at our workplace, they will see absolutely <span className="font-bold text-purple-900">nothing</span>. Our heartfelt story, apologies, promises, and sweet memories are forever sealed.
          </p>
          <p className="text-gray-700 text-xs leading-relaxed font-sans font-medium italic border-l-4 border-purple-300 pl-2">
            "We don't need a public stage. A quiet, honest space between best friends is where we thrive. Thank you for your guidance, and for being the easiest person to talk to. 💜"
          </p>
        </div>

        {/* Decorative footer elements */}
        <div className="flex justify-center items-center gap-1 text-purple-400 font-bold mb-3 text-[10px] font-sans">
          <Lock className="w-3.5 h-3.5 text-purple-400 mr-1" />
          <span>Server Database Key:</span>
          <span className="font-mono text-purple-600 font-bold tracking-wider bg-purple-100 px-1.5 py-0.5 rounded-md">
            LOCKED_BY_ANJALI
          </span>
        </div>

        <div className="flex items-center justify-center gap-1 text-[10px] font-sans font-semibold text-purple-500 bg-purple-100/50 p-2.5 rounded-xl border border-dashed border-purple-200">
          <Heart className="w-3 h-3 fill-purple-400 stroke-purple-500 animate-heart-pulse shrink-0" />
          <span>Rest assured Anjali, our trust is always safe.</span>
        </div>
      </div>
    </div>
  );
}
