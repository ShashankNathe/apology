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
      setAppStatus({
        isLocked: data.isLocked,
        readAt: data.readAt,
        hasCustomPin: data.hasCustomPin,
      });

      if (data.isLocked) {
        setStage("locked");
      }
    } catch (err) {
      console.error("Error communicating with servers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleOpenEnvelope = () => {
    setStage("story");
    setShowNotification("Box unlocked! Slide gently through our story book 📖");
    setTimeout(() => setShowNotification(""), 3500);
  };

  const handleNextPage = () => {
    if (currentStepIdx + 1 < STORY_STEPS.length) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      setStage("quiz");
    }
  };

  const handlePrevPage = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleQuizComplete = () => {
    setStage("lock-screen");
  };

  const handleLockSuccess = () => {
    setStage("locked");
    setAppStatus({ isLocked: true });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 text-purple-950 font-sans">
        <div className="text-center animate-bounce">
          <Heart className="w-12 h-12 text-purple-400 fill-purple-300 animate-heart-pulse mx-auto mb-4" />
          <p className="text-sm font-semibold tracking-wider font-mono">
            Unfolding Anjali's Letter... 🌸
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Opening Mailbox", active: stage === "welcome" },
    { label: stage === "story" ? `Story: Ch. ${currentStepIdx + 1} of ${STORY_STEPS.length}` : "Our Story & Apology", active: stage === "story" },
    { label: "Memory Challenge", active: stage === "quiz" },
    { label: "Phone Safe-Locker", active: stage === "lock-screen" },
    { label: "Deleted & Locked", active: stage === "locked" }
  ];

  return (
    <div className="min-h-screen bg-[#FDF4FF] flex flex-col justify-between py-4 lg:py-6 relative overflow-x-hidden font-sans">

      {/* Floating alert bar */}
      {showNotification && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-purple-950 text-white font-sans font-medium text-xs py-2.5 px-5 rounded-full shadow-xl border border-purple-800 flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-pulse" />
          <span>{showNotification}</span>
        </div>
      )}

      {/* Header */}
      <header className="max-w-5xl w-full mx-auto px-4 flex justify-between items-center mb-4 relative z-20">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500 fill-purple-300 stroke-purple-600 animate-heart-pulse" />
          <span className="font-semibold text-purple-950 text-base font-sans tracking-tight">
            Anjali's Safe Locker 💜
          </span>
        </div>
      </header>

      {/* Main card */}
      <div className="w-full max-w-5xl mx-auto px-4 py-2 flex-grow flex items-center justify-center relative z-10">
        <div className="w-full lg:h-[660px] bg-white/80 backdrop-blur-md rounded-[32px] md:rounded-[40px] shadow-2xl border-4 md:border-8 border-purple-100 flex flex-col lg:flex-row overflow-hidden relative">

          {/* Left Column */}
          <aside className="w-full lg:w-1/3 bg-purple-50 p-6 lg:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-purple-100/50 flex flex-col items-center shrink-0">
            <div className="w-24 h-24 lg:w-28 lg:h-28 mb-4 lg:mb-5 relative">
              <div className="w-full h-full bg-purple-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-purple-300 shadow-sm">
                <div className="w-12 h-14 lg:w-14 lg:h-16 bg-white rounded-t-full relative">
                  <div className="absolute top-4 left-2 w-1.5 h-1.5 bg-purple-950 rounded-full"></div>
                  <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-purple-950 rounded-full"></div>
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-pink-300 rounded-full opacity-60"></div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md text-sm lg:text-base animate-float-gentle">
                🌸
              </div>
            </div>

            <h1 className="text-xl lg:text-2xl font-bold text-purple-950 mb-0.5 font-sans tracking-tight">
              Anjali 💜
            </h1>

            <nav className="w-full space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className={`p-2.5 rounded-2xl flex items-center gap-3 border transition-all duration-300 ${item.active
                    ? "bg-purple-100/90 border-purple-200 text-purple-900 shadow-xs scale-[1.02]"
                    : "bg-transparent border-transparent hover:bg-purple-100/30 text-purple-400"
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full transition-all ${item.active ? "bg-purple-500 scale-125 animate-ping" : "bg-purple-300"}`} />
                  <span className={`text-xs font-semibold font-sans ${item.active ? "text-purple-950 font-bold" : "text-purple-400/80"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </nav>

            <div className="mt-6 lg:mt-auto text-center">
              <div className="text-[10px] uppercase tracking-widest text-purple-300 mb-1.5 font-semibold">
                Best Friends Since 2025
              </div>
              <div className="flex gap-2 justify-center text-sm">
                <span className="animate-heart-pulse inline-block">❤️</span>
                <span className="animate-float-gentle inline-block">✨</span>
                <span>☁️</span>
              </div>
            </div>
          </aside>

          {/* Right Column */}
          <main className="flex-1 flex flex-col p-6 lg:p-8 bg-white relative overflow-y-auto z-10">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
              <div className="absolute top-10 left-10 w-24 h-24 bg-purple-300 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-indigo-200 rounded-full blur-3xl"></div>
            </div>

            <div className="mb-6 flex justify-between items-start border-b border-purple-50/50 pb-4 relative z-10">
              <div>
                <h2 className="text-xl lg:text-2xl font-serif italic text-purple-900 mb-1">
                  {stage === "welcome" && "Pori's Mailbox ✉️"}
                  {stage === "story" && `Our Path of Truth: Ch. ${currentStepIdx + 1}`}
                  {stage === "quiz" && "Our Little Bonding Challenge ⚔️"}
                  {stage === "lock-screen" && "🔒 Personal Locking verification"}
                  {stage === "locked" && "Safely Sealed Forever! 🤝"}
                </h2>
                <p className="text-xs text-gray-500 font-sans font-medium">
                  {stage === "welcome" && "A safe corner built with respect and warmth."}
                  {stage === "story" && "A stroll down memory lane, with honest words."}
                  {stage === "quiz" && "A funny, cute quiz about details you shared."}
                  {stage === "lock-screen" && "Confirm your birthdate passcode to safeguard our story."}
                  {stage === "locked" && "You locked it, so nobody can snoop on us!"}
                </p>
              </div>
              <div className="text-4xl opacity-30 select-none animate-float-gentle text-purple-400">
                {stage === "welcome" && "✉️"}
                {stage === "story" && "🧸"}
                {stage === "quiz" && "🌟"}
                {stage === "lock-screen" && "🔑"}
                {stage === "locked" && "🔒"}
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-center relative z-10">
              {stage === "welcome" && (
                <WelcomeEnvelope
                  onOpen={handleOpenEnvelope}
                  welcomeChibiUrl={illustrationUrls.welcome}
                />
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

              {stage === "quiz" && (
                <MemoryQuiz
                  questions={QUIZ_QUESTIONS}
                  onComplete={handleQuizComplete}
                />
              )}

              {stage === "lock-screen" && (
                <PhoneLockScreen
                  onSuccess={handleLockSuccess}
                />
              )}

              {stage === "locked" && (
                <SelfDestructedView />
              )}
            </div>
          </main>

        </div>
      </div>

      <footer className="max-w-5xl w-full mx-auto px-4 text-center mt-4 relative z-10 select-none pointer-events-none">
        <p className="text-[10px] sm:text-[11px] font-semibold font-sans text-purple-400 leading-tight">
          With pure care and sincere gratitude.
          <br />
          For Anjali's smile and peace 🌸
        </p>
      </footer>
    </div>
  );
}
