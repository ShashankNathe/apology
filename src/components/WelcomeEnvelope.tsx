import React, { useState } from "react";
import { Heart, ArrowRight } from "lucide-react";

interface WelcomeEnvelopeProps {
  onOpen: () => void;
  welcomeChibiUrl?: string;
}

export default function WelcomeEnvelope({ onOpen, welcomeChibiUrl }: WelcomeEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
    setTimeout(() => onOpen(), 800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center relative w-full">
      <div className={`w-full max-w-sm transition-all duration-700 transform ${isOpen ? "scale-95 opacity-0 -translate-y-4" : "scale-100 opacity-100"}`}>

        {/* Image */}
        {welcomeChibiUrl && (
          <div className="flex justify-center mb-5">
            <img
              src={welcomeChibiUrl}
              alt="For Anjali"
              className="h-52 sm:h-64 object-contain rounded-3xl"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold text-purple-950 font-sans tracking-tight mb-1">
          Hey, Anjali 💜
        </h1>
        <p className="text-purple-400 font-sans text-sm mb-5">
          (Mastarinbai, this one's just for you)
        </p>

        <div className="mb-6 text-left space-y-3 bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
          <p className="text-gray-700 text-sm leading-relaxed">
            You are one of the genuinely good ones — the kind of person who lights up a room without even trying.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            I built this little space because you deserve more than a text. You deserve honesty, warmth, and a proper sorry. 🌸
          </p>
        </div>

        <button
          onClick={handleOpenClick}
          className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 active:scale-[0.98] text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-purple-200 transition-all font-sans"
        >
          <span>Open My Apology Letter</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-purple-400">
          <Heart className="w-3.5 h-3.5 fill-purple-300 stroke-purple-400 animate-heart-pulse" />
          <span>With care, honesty and hope</span>
        </div>
      </div>
    </div>
  );
}
