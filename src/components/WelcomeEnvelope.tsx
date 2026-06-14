import React, { useState } from "react";
import { MailOpen, Heart, ArrowRight } from "lucide-react";

interface WelcomeEnvelopeProps {
  onOpen: () => void;
  welcomeChibiUrl?: string;
}

export default function WelcomeEnvelope({ onOpen, welcomeChibiUrl }: WelcomeEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleOpenClick = () => {
    const normalized = typedName.trim().toLowerCase();
    if (normalized.includes("anjali") || normalized.includes("mastarin") || normalized.includes("pori") || normalized === "test" || normalized === "") {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 1500);
    } else {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 text-center relative w-full" id="welcome-container">
      {/* Soft sparkling backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-200/50 blur-[2px] animate-float-gentle text-purple-400 opacity-60"
            style={{
              width: `${Math.random() * 20 + 8}px`,
              height: `${Math.random() * 20 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${Math.random() * 5 + 4}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      <div className={`w-full max-w-sm p-6 bg-white/95 backdrop-blur-md rounded-3xl border border-purple-100 transition-all duration-700 transform ${isOpen ? "scale-95 opacity-0 translate-y-[-20px]" : "scale-100 opacity-100"}`}>
        <div className="flex justify-center mb-4">
          <div className="relative animate-float-gentle">
            <div className="absolute -inset-1 rounded-full bg-purple-300 blur opacity-40 animate-pulse"></div>
            <div className="relative bg-purple-100 p-4 rounded-full border border-purple-200">
              <MailOpen className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-purple-950 font-sans tracking-tight mb-2">
          Anjali 💜
        </h1>
        <p className="text-purple-600/80 font-sans font-medium mb-6 text-sm">
          (A special digital box, built only for Mastarinbai)
        </p>

        {welcomeChibiUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={welcomeChibiUrl}
              alt="Cute Welcome Chibi"
              className="h-44 object-contain rounded-2xl shadow-md border-2 border-purple-200 bg-purple-50"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            I built this tiny story space to tell you simple truths and apologize from the very deep bottom of my heart.
            <br />
            <span className="font-semibold text-purple-700">Please enter your sweet name to open the secret box:</span>
          </p>

          <input
            type="text"
            placeholder="Type here..."
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleOpenClick()}
            className={`w-full px-4 py-3 rounded-2xl border-2 text-center text-purple-900 bg-purple-50/50 font-medium font-sans focus:outline-none transition-all duration-300 ${hasError
              ? "border-rose-400 bg-rose-50 animate-shake"
              : "border-purple-200 focus:border-purple-400 focus:bg-white"
              }`}
          />
          {hasError && (
            <p className="text-rose-500 text-xs mt-2 font-semibold font-sans">
              Aww, is that you? Type 'Anjali' to unlock your letter! 🥺
            </p>
          )}
        </div>

        <button
          onClick={handleOpenClick}
          className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 active:scale-[0.98] text-white font-semibold py-3 px-6 rounded-2xl shadow-lg shadow-purple-200 transition-all font-sans"
        >
          <span>Open My Apology Box</span>
          <ArrowRight className="w-4 w-4 animate-pulse" />
        </button>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-purple-400">
          <Heart className="w-3.5 h-3.5 fill-purple-300 stroke-purple-400 animate-heart-pulse" />
          <span>With heaps of care, respect and hope</span>
        </div>
      </div>
    </div>
  );
}
