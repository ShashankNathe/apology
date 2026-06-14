import React from "react";
import { Heart } from "lucide-react";

export default function SelfDestructedView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
      <div className="mb-6 animate-float-gentle">
        <Heart className="w-12 h-12 text-purple-400 fill-purple-300 mx-auto animate-heart-pulse" />
      </div>

      <h2 className="text-2xl font-serif italic text-purple-900 mb-3">
        This letter has reached its destination. 💜
      </h2>

      <p className="text-sm text-purple-400 font-medium max-w-xs leading-relaxed">
        It was meant only for you, and now it lives safely in your heart.
      </p>
    </div>
  );
}
