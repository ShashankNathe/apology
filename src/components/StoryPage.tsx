import React, { useState, useEffect } from "react";
import { StoryStep } from "../types";
import { ArrowLeft, ArrowRight, Sparkles, Heart } from "lucide-react";

interface StoryPageProps {
  step: StoryStep;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  totalSteps: number;
  currentStepIndex: number;
  illustrationUrls: {
    welcome?: string;
    sorry?: string;
    friends?: string;
    couple?: string;
  };
}

export default function StoryPage({
  step,
  onNext,
  onPrev,
  isFirst,
  isLast,
  totalSteps,
  currentStepIndex,
  illustrationUrls,
}: StoryPageProps) {
  const [animatedText, setAnimatedText] = useState("");
  const [showContent, setShowContent] = useState(false);

  // Trigger smooth content fade-in when step changes
  useEffect(() => {
    setShowContent(false);
    const delay = setTimeout(() => {
      setShowContent(true);
    }, 150);
    return () => clearTimeout(delay);
  }, [step.id]);

  // Map doll state to cute ASCII Chibi art / descriptive labels
  const getCuteEmoji = (state?: string) => {
    switch (state) {
      case "blushing":
        return { face: "(*^-^*)", text: "Getting to know you better", bg: "bg-pink-50 text-pink-500 border-pink-200" };
      case "sad":
        return { face: "(｡•́︿•̀｡)", text: "Feeling lonely and silent", bg: "bg-purple-100 text-purple-600 border-purple-200" };
      case "crying":
        return { face: "(╥﹏╥)", text: "Anjali crying because of me", bg: "bg-rose-100 text-rose-500 border-rose-200" };
      case "comforting":
        return { face: "(つ✧ω✧)つ", text: "Sending virtual cozy hugs", bg: "bg-purple-50 text-purple-600 border-purple-100" };
      case "pleading":
        return { face: "🥺👉👈", text: "Looking up, asking for sorry", bg: "bg-lavender-50 text-purple-600 border-purple-200" };
      case "excited":
        return { face: "(≧◡≦) ♡", text: "Best friend bond levels rising!", bg: "bg-purple-100 text-purple-600 border-purple-200" };
      default:
        return { face: "🤍", text: "With warm cozy care", bg: "bg-gray-50 text-gray-400" };
    }
  };

  const cuteDoll = getCuteEmoji(step.cuteDollState);

  // Get current illustration URL based on id
  const getIllustrationUrl = () => {
    if (step.illustrationId === "welcome") return illustrationUrls.welcome;
    if (step.illustrationId === "sorry") return illustrationUrls.sorry;
    if (step.illustrationId === "friends") return illustrationUrls.friends;
    if (step.illustrationId === "couple") return illustrationUrls.couple;
    return undefined;
  };

  const currentImg = getIllustrationUrl();

  return (
    <div className={`w-full transition-all duration-500 transform ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {/* Mini details bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-widest font-mono font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
          Chapter {step.id} of {totalSteps}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStepIndex ? "w-5 bg-purple-500" : "w-1.5 bg-purple-200"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Styled Inner Container */}
      <div className="space-y-3 sm:space-y-4">
        {/* Title */}
        <div>
          <span className="text-purple-500 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
            {step.tagline}
          </span>
          <h3 className="text-xl md:text-2xl font-bold font-sans text-purple-950 tracking-tight mt-0.5">
            {step.title}
          </h3>
        </div>


        {/* Sincere description content */}
        <div className="bg-purple-50/40 p-4 rounded-2xl border border-purple-100/60 text-gray-700 text-sm font-medium leading-relaxed font-sans whitespace-pre-line text-left max-w-none">
          {step.description}
        </div>

        {/* Chibi status / mood indicator */}
        <div className="flex items-center gap-3 p-3 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-50 transition-colors">
          <div className={`px-3 py-1.5 rounded-xl text-base font-mono font-bold border shadow-xs animate-float-gentle select-none ${cuteDoll.bg}`}>
            {cuteDoll.face}
          </div>
          <div>
            <p className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest font-mono">
              Current Bestfriend Mood Status
            </p>
            <p className="text-xs font-medium text-purple-900 leading-tight">
              {cuteDoll.text}
            </p>
          </div>
        </div>

        {/* Extra notes / bullet journal sticky ideas */}
        {step.extraNotes && step.extraNotes.length > 0 && (
          <div className="text-left bg-pink-50/20 p-3 rounded-2xl border border-dashed border-pink-100">
            <h4 className="text-[11px] uppercase font-mono tracking-widest text-pink-500 mb-2 font-bold pl-1">
              ✧ Dear Anjali, did you remember?
            </h4>
            <ul className="space-y-1.5">
              {step.extraNotes.map((note, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <span className="text-purple-400 shrink-0">🎁</span>
                  <span className="font-sans font-medium">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-purple-100/50">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`w-full sm:w-auto flex items-center justify-center gap-1.5 font-semibold font-sans py-2 px-4 rounded-xl border transition-all text-xs ${isFirst
                ? "opacity-30 border-purple-100 text-purple-300 cursor-not-allowed"
                : "border-purple-200 hover:border-purple-300 text-purple-700 bg-white hover:bg-purple-50/30 active:scale-95"
              }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={onNext}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-semibold font-sans py-2 px-5 rounded-xl shadow-md shadow-purple-100 transition-all text-xs"
          >
            <span>{isLast ? "Proceed to Quiz 🌿" : "Next Memory 🌿"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
