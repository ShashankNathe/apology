import React, { useState } from "react";
import { MailOpen, Heart, ArrowRight } from "lucide-react";

interface WelcomeEnvelopeProps {
  onOpen: () => void;
  welcomeChibiUrl?: string;
}

export default function WelcomeEnvelope({ onOpen }: WelcomeEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
    setTimeout(() => onOpen(), 800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center relative w-full">
      <div className={`w-full max-w-sm p-6 bg-white/95 backdrop-blur-md rounded-3xl border border-purple-100 transition-all duration-700 transform ${isOpen ? "scale-95 opacity-0 -translate-y-4" : "scale-100 opacity-100"}`}>

        <div className="flex justify-center mb-5">
          <div className="relative animate-float-gentle">
            <div className="absolute -inset-1 rounded-full bg-purple-300 blur opacity-40 animate-pulse" />
            <div className="relative bg-purple-100 p-4 rounded-full border border-purple-200">
              <MailOpen className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-purple-950 font-sans tracking-tight mb-1">
          Anjali 💜
        </h1>
        <p className="text-purple-500/80 font-sans font-medium mb-5 text-sm">
          (only for Mastarinbai)
        </p>

        <div className="mb-6 text-left space-y-3">
          <p className="text-gray-700 text-sm leading-relaxed">
            I know life has been a lot lately — and I'm truly sorry that I added to it instead of making it lighter.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            You didn't deserve the silence. You deserved honesty, and I failed at that. This little space is my way of saying everything I should have said out loud.
          </p>
          <p className="text-purple-700 text-sm font-semibold leading-relaxed">
            Take your time. This was built only for you. 🌸
          </p>
        </div>

        <button
          onClick={handleOpenClick}
          className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-purple-200 transition-all font-sans"
        >
          <span>Open My Apology Letter</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </button>

        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-purple-400">
          <Heart className="w-3.5 h-3.5 fill-purple-300 stroke-purple-400 animate-heart-pulse" />
          <span>With care, honesty and hope</span>
        </div>
      </div>
    </div>
  );
}
