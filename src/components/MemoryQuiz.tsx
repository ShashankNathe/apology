import React, { useState } from "react";
import { QuizQuestion } from "../types";
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw, Trophy, ArrowRight } from "lucide-react";

interface MemoryQuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function MemoryQuiz({ questions, onComplete }: MemoryQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="w-full transition-all duration-300" id="quiz-container">
      {!quizFinished ? (
        <div className="space-y-4">
          {/* Header info */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-purple-600 bg-purple-50 px-2 rounded-md border border-purple-100">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs font-sans font-semibold text-purple-800">
              Current Score: {score} 🤍
            </span>
          </div>

          {/* Quiz question box */}
          <div className="mb-2">
            <h4 className="text-lg font-bold font-sans text-purple-950 tracking-tight leading-snug">
              {currentQuestion.question}
            </h4>
          </div>

          {/* Radio options mapping */}
          <div className="grid gap-2.5">
            {currentQuestion.options.map((option, index) => {
              let buttonStyle = "border-purple-100 hover:border-purple-200 bg-purple-50/20 text-purple-950";
              if (hasAnswered) {
                if (index === currentQuestion.correctAnswerIndex) {
                  buttonStyle = "border-emerald-300 bg-emerald-50 text-emerald-950";
                } else if (index === selectedAnswer) {
                  buttonStyle = "border-rose-300 bg-rose-50 text-rose-950";
                } else {
                  buttonStyle = "opacity-50 border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={hasAnswered}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border-2 text-left font-sans text-xs font-semibold transition-all duration-300 ${
                    !hasAnswered ? "active:scale-[0.99] hover:bg-purple-50/50" : ""
                  } ${buttonStyle}`}
                >
                  <span>{option}</span>
                  {hasAnswered && index === currentQuestion.correctAnswerIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                  {hasAnswered && index === selectedAnswer && index !== currentQuestion.correctAnswerIndex && (
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Cute Feedback Reaction */}
          {hasAnswered && (
            <div className={`p-3.5 rounded-xl border-2 animate-fade-in ${
              selectedAnswer === currentQuestion.correctAnswerIndex
                ? "bg-emerald-50 border-emerald-100 text-emerald-900"
                : "bg-purple-50 border-purple-100 text-purple-900"
            }`}>
              <p className="text-xs font-semibold flex items-start gap-2">
                <span className="text-sm">
                  {selectedAnswer === currentQuestion.correctAnswerIndex ? "✨" : "🧸"}
                </span>
                <span className="font-sans leading-relaxed">
                  {selectedAnswer === currentQuestion.correctAnswerIndex
                    ? currentQuestion.cuteReaction
                    : currentQuestion.wrongAnswerReaction}
                </span>
              </p>
            </div>
          )}

          {/* Progress feedback CTA */}
          {hasAnswered && (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-purple-100 text-xs"
            >
              <span>
                {currentIndex + 1 === questions.length ? "Finish Quiz & See Result 🏁" : "Next Question 🌱"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        /* Quiz Completed Outcome Card */
        <div className="text-center py-4 space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-purple-50 rounded-full border border-purple-100 text-purple-600 animate-float-gentle">
              <Trophy className="w-10 h-10" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold font-sans text-purple-950 mb-1">
              Quiz Complete, Boss! 💜
            </h3>
            <p className="text-gray-500 text-xs font-sans font-medium max-w-sm mx-auto leading-relaxed">
              You scored <span className="font-bold text-purple-600">{score} out of {questions.length}</span>! 
              Thank you for playing, Anjali. It shows how much you pay attention to the little things of us.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={resetQuiz}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 font-semibold font-sans py-2 px-4 rounded-xl border-2 border-purple-100 hover:border-purple-200 text-purple-700 bg-white hover:bg-purple-50/50 active:scale-95 transition-all text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>

            <button
              onClick={onComplete}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold py-2 px-5 rounded-xl shadow-md transition-all text-xs"
            >
              <span>Open Safe-Lock Code 🔑</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
