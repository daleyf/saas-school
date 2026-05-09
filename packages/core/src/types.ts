export type Level = "beginner" | "intermediate" | "advanced";
export type SourceType = "startup" | "technical_docs" | "vc" | "essay" | "video" | "docs";
export type Difficulty = "easy" | "medium" | "hard";
export type ProgressStatus = "not_started" | "started" | "completed";
export type ReviewStatus = "new" | "learning" | "review" | "mastered";

export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: Level;
  estimatedMinutes: number;
  moduleIds: string[];
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
};

export type KeyTerm = {
  term: string;
  definition: string;
};

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  bodyMarkdown: string;
  keyTerms: KeyTerm[];
  sourceIds: string[];
  quizQuestionIds: string[];
  estimatedMinutes: number;
  order: number;
};

export type SourceLink = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  sourceType: SourceType;
  credibilityNote: string;
};

export type QuizChoice = {
  id: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  lessonId: string;
  prompt: string;
  choices: QuizChoice[];
  correctChoiceId: string;
  explanation: string;
  sourceIds: string[];
  difficulty: Difficulty;
  topicTags: string[];
};

export type UserProgress = {
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  completedAt?: string;
};

export type ReviewState = {
  userId: string;
  questionId: string;
  status: ReviewStatus;
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  easeFactor: number;
  intervalDays: number;
  dueAt: string;
  lastAttemptAt?: string;
};

export type StackChoice = {
  tool: string;
  reason: string;
  whenToUse: string;
  whenNotToUse: string;
  sourceIds: string[];
};

export type StackRecommendation = {
  id: string;
  idea: string;
  frontend: StackChoice;
  backend: StackChoice;
  database: StackChoice;
  auth: StackChoice;
  payments: StackChoice;
  deployment: StackChoice;
  analytics: StackChoice;
  email: StackChoice;
  avoidForNow: string[];
  learningPathLessonIds: string[];
  generatedAt: string;
};

export type AnswerResult = {
  questionId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
  explanation: string;
  updatedReviewState: ReviewState;
  sourceLinks: SourceLink[];
};

export type QuizScore = {
  lessonId: string;
  answered: number;
  correct: number;
  accuracy: number;
};

export type TopicWeakness = {
  topic: string;
  incorrectAttempts: number;
  correctAttempts: number;
  masteryScore: number;
  suggestedLessonIds: string[];
};

export type CourseProgress = {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
};

export type BuilderReadinessScore = {
  score: number;
  level: "Curious beginner" | "Learning the basics" | "MVP ready soon" | "Ready to ship" | "Dangerous builder";
  lessonCompletionScore: number;
  quizAccuracyScore: number;
  reviewMasteryScore: number;
  breadthScore: number;
};

export type DailyReview = {
  dueQuestions: QuizQuestion[];
  weakTopics: TopicWeakness[];
};
