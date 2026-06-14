export interface StoryStep {
  id: number;
  title: string;
  tagline: string;
  description: string;
  visualType: "welcome" | "story-met" | "story-close" | "story-memories" | "story-clash" | "story-apology" | "story-promises" | "quiz" | "lock-screen";
  illustrationId?: "welcome" | "sorry" | "friends" | "couple";
  cuteDollState?: "blushing" | "sad" | "crying" | "comforting" | "pleading" | "excited";
  extraNotes?: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  cuteReaction: string;
  wrongAnswerReaction: string;
}

export interface AppStatus {
  isLocked: boolean;
  readAt?: string;
  hasCustomPin?: boolean;
}
