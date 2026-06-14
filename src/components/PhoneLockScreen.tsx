import React, { useState, useEffect } from "react";
import { Lock, Delete, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface PhoneLockScreenProps {
  onSuccess: () => void;
}

export default function PhoneLockScreen({ onSuccess }: PhoneLockScreenProps) {
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [currentTime, setCurrentTime] = useState("11:11");

  // Keep a cute simulated smartphone clock
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (num: string) => {
    if (loading) return;
    setErrorMsg("");
    if (pin.length < 8) {
      setPin((prev) => prev + num);
    }
  };

  const handleBackspace = () => {
    if (loading) return;
    setErrorMsg("");
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (loading) return;
    setErrorMsg("");
    setPin("");
  };

  const handleSubmit = async () => {
    if (pin.length < 4) {
      setErrorMsg("Passcode must be at least 4 digits! (e.g. DDMM)");
      triggerShake();
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/verify-and-lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onSuccess();
      } else {
        setErrorMsg(data.error || "Incorrect passcode. Hint: It's your birthdate!");
        triggerShake();
        setAttempts((prev) => prev + 1);
      }
    } catch (e) {
      setErrorMsg("Connection issue. Please try again!");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6" id="lockscreen-section">
      {/* Visual smartphone container */}
      <div className={`relative bg-purple-950 text-white rounded-[40px] shadow-2xl border-[10px] border-slate-800 overflow-hidden aspect-[9/19] flex flex-col justify-between p-6 transition-all duration-300 ${isShaking ? "animate-bounce" : ""
        }`}>
        {/* Dynamic camera notch */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-full flex items-center justify-around px-4 select-none">
          <div className="w-2.5 h-2.5 bg-black rounded-full border border-slate-700" />
          <div className="w-12 h-1 bg-slate-700 rounded-full" />
        </div>

        {/* Status indicator row */}
        <div className="flex justify-between items-center text-[11px] font-mono font-semibold tracking-wider text-purple-200 mt-2">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div className="w-5 h-2.5 border border-purple-200 rounded-sm flex p-0.5 items-center">
              <div className="w-full h-full bg-emerald-400 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Lock header */}
        <div className="flex flex-col items-center mt-6 text-center">
          <div className="p-3 bg-purple-900/60 rounded-full border border-purple-500/30 animate-pulse mb-3">
            <Lock className="w-6 h-6 text-purple-300" />
          </div>
          <h2 className="text-lg font-bold font-sans tracking-tight text-purple-100">
            Lock Our Trust Safely 💜
          </h2>
          <p className="text-xs text-purple-300 max-w-[240px] mt-1 leading-relaxed font-medium">
            If you can find it in your heart to forgive me, please type the password used on my phone screen to seal our promise.
          </p>
        </div>

        {/* Input indicators representing custom PIN length */}
        <div className="flex flex-col items-center my-4">
          <div className="flex gap-4 justify-center py-2 min-h-[30px] items-center">
            {pin.length === 0 ? (
              <span className="text-xs text-purple-400 font-mono tracking-widest uppercase font-semibold">
                Waiting for passcode...
              </span>
            ) : (
              Array.from({ length: Math.max(4, pin.length) }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${i < pin.length
                    ? "bg-purple-300 scale-110 shadow-md shadow-purple-800"
                    : "border border-purple-500"
                    }`}
                />
              ))
            )}
          </div>

          {errorMsg ? (
            <p className="text-rose-300 text-xs text-center font-semibold mt-2 max-w-[240px] leading-snug">
              {errorMsg}
            </p>
          ) : attempts > 0 ? (
            <p className="text-purple-300 text-[10px] text-center font-medium mt-2">
              Attempt {attempts} • Hint: It is your birthdate 🎂
            </p>
          ) : null}
        </div>

        {/* PIN Keyboard Pad */}
        <div className="grid grid-cols-3 gap-y-3.5 gap-x-5 justify-items-center mb-4 mt-auto">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="w-14 h-14 bg-purple-900/40 hover:bg-purple-800/60 active:scale-90 rounded-full text-lg font-bold font-sans transition-all duration-150 border border-purple-800/30 font-semibold"
            >
              {num}
            </button>
          ))}

          {/* Special bottom key functions: Clear, 0, Backspace */}
          <button
            onClick={handleClear}
            className="w-14 h-14 flex items-center justify-center bg-purple-950 hover:bg-purple-900/40 active:scale-90 text-[11px] uppercase font-bold tracking-wider rounded-full text-purple-300 font-semibold border-purple-900/20"
          >
            Clear
          </button>

          <button
            onClick={() => handleKeyPress("0")}
            className="w-14 h-14 bg-purple-900/40 hover:bg-purple-800/60 active:scale-90 rounded-full text-lg font-bold font-sans transition-all duration-150 border border-purple-800/30 font-semibold"
          >
            0
          </button>

          <button
            onClick={handleBackspace}
            className="w-14 h-14 flex items-center justify-center bg-purple-900/40 hover:bg-purple-800/60 active:scale-90 rounded-full text-purple-300"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Phone screen footer action indicator */}
        <div className="flex flex-col items-center gap-2 mt-auto">
          <button
            disabled={loading || pin.length < 4}
            onClick={handleSubmit}
            className={`w-full flex items-center justify-center gap-1.5 py-3.5 rounded-2xl font-bold font-sans tracking-wide text-xs transition-all ${pin.length >= 4
              ? "bg-purple-400 hover:bg-purple-300 text-purple-950 active:scale-[0.98] shadow-md shadow-purple-950/40"
              : "bg-purple-900/30 text-purple-500/70 cursor-not-allowed"
              }`}
          >
            <span>{loading ? "Verifying..." : "Seal Our Trust Securely 🔒"}</span>
            <ShieldCheck className="w-4 h-4 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Safety message context to avoid confusion */}
      <div className="mt-4 p-4 text-center bg-purple-50 rounded-2xl border border-purple-100 max-w-sm mx-auto">
        <p className="text-xs text-purple-950 font-sans leading-relaxed font-semibold">
          👀 Why ask for my phone password?
        </p>
        <p className="text-[11px] text-purple-600 font-sans mt-1 leading-snug">
          I know you didn't quite like that I set your birthday as my phone password, but once you enter it here it will be sealed securely for us!
        </p>
      </div>
    </div>
  );
}
