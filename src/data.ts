import { StoryStep, QuizQuestion } from "./types";

export const CUSTOM_MESSAGES = {
  welcomeGreeting: "Hello Anjali (Mastarinbai) 🌸",
  welcomeSubtitle: "I built this space especially for you. Please click to open the letter...",
  apologySincere: "I was completely wrong, and I'm deeply sorry. I want to earn your trust back, one honest conversation at a time. 💜",
};

export const STORY_STEPS: StoryStep[] = [
  {
    id: 1,
    title: "Our Story: The Beginning",
    tagline: "The internship that changed everything... 🌸",
    description: "You walked in as a new intern and somehow walked straight into being one of the most important people in my life. I was too shy to even start a conversation — and you made it the easiest thing in the world.\n\nYou gave me something rare — a space where I, the most introverted person in the room, could actually speak my heart out. That's not small. That's everything.",
    visualType: "story-met",
    illustrationId: "couple",
    cuteDollState: "blushing",
    extraNotes: [
      "I was literally too nervous to start a conversation.",
      "But you shattered my walls with just a friendly smile!",
      "April 1st became my favorite day because of you."
    ]
  },
  {
    id: 2,
    title: "What Makes You, YOU",
    tagline: "Our sweet, caring, sensitive overthinker... 💜",
    description: "You carry so much — your own worries, your own storms — and still you show up, still you ask how I'm doing, still you make time. That's not something everyone does. That's something only really good people do.\n\nYou like being happy on your own terms. You don't need much from people. But you give so much anyway — and I didn't protect that the way I should have.",
    visualType: "story-close",
    illustrationId: "friends",
    cuteDollState: "excited",
    extraNotes: [
      "You take care of everyone around you.",
      "You think deeply, sometimes a little too much, because you care so much.",
      "I should have protected your peace better. I am so sorry."
    ]
  },
  {
    id: 3,
    title: "What I Did Wrong",
    tagline: "My deepest apologies & realization...",
    description: "You were honest with me. That's what people who trust you do — they tell you things. And instead of talking to you like you always asked me to, I went silent. I let my hurt turn into distance. And distance, to someone as sensitive as you, felt like abandonment. I'm so sorry.\n\nYou told me — more than once — 'if something bothers you, just tell me.' I knew that. I still chose silence over honesty. That was my mistake, not yours. Never yours.\n\nYou cried that night because of me. And the worst part is — you probably spent that whole night wondering what YOU did wrong. You did nothing wrong. I just handled my feelings badly, and you paid for it.",
    visualType: "story-clash",
    illustrationId: "sorry",
    cuteDollState: "sad",
    extraNotes: [
      "Silence is a wall, but to a sensitive person, it feels like abandonment.",
      "You trusted me enough to be honest about how you felt.",
      "I handled my feelings badly, and I deeply regret it."
    ]
  },
  {
    id: 4,
    title: "What You Mean to Me",
    tagline: "In a world of noise, you became my safe spot.",
    description: "There are few people in this world I know you speak freely with. And I was trusted to be one of them. I don't take that lightly anymore.\n\nBefore you, I kept everything inside. You didn't just become my friend — you became the reason I started opening up at all.\n\nTrips, your friends becoming my friends, inside jokes, your sad 2am thoughts — you shared all of it with me. That's a kind of trust that deserves to be handled with so much more care than I showed.",
    visualType: "story-memories",
    illustrationId: "couple",
    cuteDollState: "comforting",
    extraNotes: [
      "Trips and short getaways are our core memories.",
      "Becoming close friends with your group mean the world to me.",
      "Every inside joke and tea talk is something I keep close to heart."
    ]
  },
  {
    id: 5,
    title: "My Promise to You",
    tagline: "Moving forward, together... 🤝",
    description: "I will talk. Even when it's uncomfortable. Even when I'm upset. I will choose words over walls.\n\nNext time something bothers me, you'll hear it from me — not from my silence.\n\nI'm not asking you to trust me at the same level overnight. I'm just asking for the chance to earn it back, one honest conversation at a time.",
    visualType: "story-promises",
    illustrationId: "sorry",
    cuteDollState: "pleading",
    extraNotes: [
      "No more cold shoulders. Communication is our golden rule.",
      "I will hold your sensitive feelings with gentleness and respect.",
      "I am, and will always be, ready to listen."
    ]
  },
  {
    id: 6,
    title: "For You, Anjali",
    tagline: "With all my heart... 🤍",
    description: "I know life has been a lot lately — and I'm truly sorry that I added to it instead of making it lighter.\n\nYou once made the shyest person in the office feel like they belonged. I hope this is a small start to making you feel the same. 🤍",
    visualType: "story-promises",
    illustrationId: "welcome",
    cuteDollState: "blushing",
    extraNotes: [
      "Thank you for being the easiest person to talk to.",
      "Thank you for your guidance and warmth.",
      "I'm always looking out for your beautiful smile."
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When did we first meet in the office?",
    options: ["1st February", "15th August", "1st April", "25th December"],
    correctAnswerIndex: 2,
    cuteReaction: "Exactly! Intern day, April Fools but it was the best day for us! 🎉",
    wrongAnswerReaction: "Oh no! Have you forgotten? It was the 1st of April! 🌸"
  },
  {
    id: 2,
    question: "What was Anjali's status when they met?",
    options: ["Manager", "New Intern", "External Auditor", "Software Lead"],
    correctAnswerIndex: 1,
    cuteReaction: "Yes, you were the sweet, cute new intern! 💜",
    wrongAnswerReaction: "Wait, seriously? You were our shining new intern! 🥺"
  },
  {
    id: 3,
    question: "Who was wrong and fell completely short in communication?",
    options: ["The Boss", "Shy Boy", "Everyone", "Nobody"],
    correctAnswerIndex: 1,
    cuteReaction: "Yes... I went silent and handles feelings badly. Learn to talk now! 🫂",
    wrongAnswerReaction: "No, it was the Shy Boy! Let him explain and apologize! ❤️"
  }
];
