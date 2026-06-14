import React, { useState, useEffect } from "react";
import { AppStatus, StoryStep } from "./types";
import { STORY_STEPS, QUIZ_QUESTIONS } from "./data";
import WelcomeEnvelope from "./components/WelcomeEnvelope";
import StoryPage from "./components/StoryPage";
import MemoryQuiz from "./components/MemoryQuiz";
import PhoneLockScreen from "./components/PhoneLockScreen";
import SelfDestructedView from "./components/SelfDestructedView";
import { Heart, Sparkles } from "lucide-react";

const CHATGPT_IMAGE = "https://raw.githubusercontent.com/ShashankNathe/apology/main/src/assets/images/img1.png";

export default function App() {
  const [appStatus, setAppStatus] = useState<AppStatus>({ isLocked: false });
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState<"welcome" | "story" | "quiz" | "lock-screen" | "locked">("welcome");
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [showNotification, setShowNotification] = useState("");

  const illustrationUrls = {
    welcome: CHATGPT_IMAGE,
    sorry: CHATGPT_IMAGE,
    friends: CHATGPT_IMAGE,
    couple: CHATGPT_IMAGE,
  };

  const checkStatus = async () => {
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      setAppStatus({ isLocked: data.isLocked, readAt: data.readAt, hasCustomPin: data.hasCustomPin });
      if (data.isLocked) setStage("locked");
    } catch (err) {
      console.error("Error communicating with servers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { checkStatus(); }, []);

  const handleOpenEnvelope = () => {
    setStage("story");
    setShowNotification("Box unlocked! Slide gently through our story book 📖");
    setTimeout(() => setShowNotification(""), 3500);
  };

  const handleNextPage = () => {
    if (currentStepIdx + 1 < STORY_STEPS.length) setCurrentStepIdx((p) => p + 1);
    else setStage("quiz");
  };

  const handlePrevPage = () => {
    if (currentStepIdx > 0) setCurrentStepIdx((p) => p - 1);
  };

  const handleQuizComplete = () => setStage("lock-screen");

  const handleLockSuccess = () => {
    setStage("locked");
    setAppStatus({ isLocked: true });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 text-purple-950 font-sans">
        <div className="text-center animate-bounce">
          <Heart className="w-12 h-12 text-purple-400 fill-purple-300 mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider font-mono">Unfolding Anjali's Letter... 🌸</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Opening Mailbox", active: stage === "welcome" },
    { label: stage === "story" ? `Story: Ch. ${currentStepIdx + 1} of ${STORY_STEPS.length}` : "Our Story & Apology", active: stage === "story" },
    { label: "Memory Challenge", active: stage === "quiz" },
    { label: "Your Answer 🌸", active: stage === "lock-screen" },
    { label: "With Love, Always 💜", active: stage === "locked" },
  ];

  const stageTitle = {
    "welcome": "Pori's Mailbox ✉️",
    "story": `Our Path of Truth: Ch. ${currentStepIdx + 1}`,
    "quiz": "Our Little Bonding Challenge ⚔️",
    "lock-screen": "Do you accept my apology? 🌸",
    "locked": "With love, always 💜",
  }[stage];

  const stageSubtitle = {
    "welcome": "A safe corner built with respect and warmth.",
    "story": "A stroll down memory lane, with honest words.",
    "quiz": "A funny, cute quiz about details you shared.",
    "lock-screen": "Type the number I use on my phone — you know the one.",
    "locked": "This was only ever meant for you.",
  }[stage];

  const stageEmoji = {
    "welcome": "✉️", "story": "🧸", "quiz": "🌟", "lock-screen": "🌸", "locked": "🤍",
  }[stage];

  return (
    <div className="min-h-screen bg-[#FDF4FF] flex flex-col font-sans">

      {/* Notification toast */}
      {showNotification && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-purple-950 text-white text-xs font-medium py-2.5 px-5 rounded-full shadow-xl border border-purple-800 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
          <span>{showNotification}</span>
        </div>
      )}

      {/* Top header - visible on all sizes */}
      <header className="w-full px-4 py-3 flex items-center justify-between bg-[#FDF4FF] sticky top-0 z-30 border-b border-purple-100/60">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-purple-500 fill-purple-300 stroke-purple-600" />
          <span className="font-semibold text-purple-950 text-sm tracking-tight">Anjali's Letter 💜</span>
        </div>
        {/* Mobile step dots */}
        <div className="flex items-center gap-1 lg:hidden">
          {navItems.map((item, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${item.active ? "w-4 bg-purple-500" : "w-1.5 bg-purple-200"}`}
            />
          ))}
        </div>
      </header>

      {/* Page body */}
      <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-center lg:p-6">

        {/* Sidebar - desktop only */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 xl:w-72 lg:self-stretch bg-purple-50 border-r border-purple-100/60 p-8 shrink-0 rounded-l-[40px]">
          <div className="w-24 h-24 mb-5 relative mx-auto">
            <div className="w-full h-full bg-purple-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-purple-300 shadow-sm">
              <div className="w-12 h-14 bg-white rounded-t-full relative">
                <div className="absolute top-4 left-2 w-1.5 h-1.5 bg-purple-950 rounded-full" />
                <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-purple-950 rounded-full" />
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-pink-300 rounded-full opacity-60" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md text-base animate-float-gentle">🌸</div>
          </div>

          <h1 className="text-2xl font-bold text-purple-950 mb-4 font-sans tracking-tight text-center">Anjali 💜</h1>

          <nav className="w-full space-y-2">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`p-2.5 rounded-2xl flex items-center gap-3 border transition-all duration-300 ${
                  item.active
                    ? "bg-purple-100/90 border-purple-200 shadow-xs scale-[1.02]"
                    : "bg-transparent border-transparent text-purple-400"
                }`}
              >
                <span className={`w-2 h-2 rounded-full transition-all shrink-0 ${item.active ? "bg-purple-500 scale-125 animate-ping" : "bg-purple-300"}`} />
                <span className={`text-xs font-semibold font-sans ${item.active ? "text-purple-950 font-bold" : "text-purple-400/80"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </nav>

          <div className="mt-auto text-center pt-6">
            <div className="text-[10px] uppercase tracking-widest text-purple-300 mb-1.5 font-semibold">Best Friends Since 2025</div>
            <div className="flex gap-2 justify-center text-sm">
              <span className="animate-heart-pulse inline-block">❤️</span>
              <span className="animate-float-gentle inline-block">✨</span>
              <span>☁️</span>
            </div>
          </div>
        </aside>

        {/* Main content card */}
        <main className="flex-1 flex flex-col bg-white lg:rounded-r-[40px] lg:shadow-2xl lg:border lg:border-purple-100 lg:self-stretch lg:overflow-y-auto">

          {/* Stage header */}
          <div className="px-4 sm:px-6 pt-5 pb-4 border-b border-purple-50 flex justify-between items-start shrink-0">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-serif italic text-purple-900 mb-0.5 leading-snug">
                {stageTitle}
              </h2>
              <p className="text-xs text-gray-400 font-medium">{stageSubtitle}</p>
            </div>
            <span className="text-3xl opacity-25 select-none animate-float-gentle ml-3 shrink-0">{stageEmoji}</span>
          </div>

          {/* Stage content */}
          <div className="flex-1 flex flex-col px-4 sm:px-6 py-5 overflow-y-auto">
            {stage === "welcome" && (
              <WelcomeEnvelope onOpen={handleOpenEnvelope} welcomeChibiUrl={illustrationUrls.welcome} />
            )}
            {stage === "story" && (
              <StoryPage
                step={STORY_STEPS[currentStepIdx]}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
                isFirst={currentStepIdx === 0}
                isLast={currentStepIdx === STORY_STEPS.length - 1}
                totalSteps={STORY_STEPS.length}
                currentStepIndex={currentStepIdx}
                illustrationUrls={illustrationUrls}
              />
            )}
            {stage === "quiz" && <MemoryQuiz questions={QUIZ_QUESTIONS} onComplete={handleQuizComplete} />}
            {stage === "lock-screen" && <PhoneLockScreen onSuccess={handleLockSuccess} />}
            {stage === "locked" && <SelfDestructedView />}
          </div>
        </main>
      </div>

      <footer className="text-center py-3 select-none pointer-events-none">
        <p className="text-[10px] font-semibold text-purple-300">
          With pure care and sincere gratitude · For Anjali's smile 🌸
        </p>
      </footer>
    </div>
  );
}
