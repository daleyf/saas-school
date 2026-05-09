import type { ReviewState } from "../types.js";

const TEN_MINUTES_MS = 10 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function createInitialReviewState(userId: string, questionId: string, now: Date): ReviewState {
  return {
    userId,
    questionId,
    status: "new",
    attempts: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    easeFactor: 2.5,
    intervalDays: 0,
    dueAt: now.toISOString()
  };
}

export function updateReviewState(params: {
  previous: ReviewState | null;
  userId: string;
  questionId: string;
  isCorrect: boolean;
  now: Date;
}): ReviewState {
  const previous = params.previous ?? createInitialReviewState(params.userId, params.questionId, params.now);
  const attempts = previous.attempts + 1;
  const correctAttempts = previous.correctAttempts + (params.isCorrect ? 1 : 0);
  const incorrectAttempts = previous.incorrectAttempts + (params.isCorrect ? 0 : 1);

  if (!params.isCorrect) {
    return {
      ...previous,
      attempts,
      correctAttempts,
      incorrectAttempts,
      status: "learning",
      easeFactor: Math.max(1.3, round(previous.easeFactor - 0.2)),
      intervalDays: 0,
      dueAt: new Date(params.now.getTime() + TEN_MINUTES_MS).toISOString(),
      lastAttemptAt: params.now.toISOString()
    };
  }

  const intervalDays = getCorrectIntervalDays(correctAttempts);
  return {
    ...previous,
    attempts,
    correctAttempts,
    incorrectAttempts,
    status: correctAttempts >= 5 ? "mastered" : correctAttempts === 1 ? "learning" : "review",
    easeFactor: Math.min(3.0, round(previous.easeFactor + 0.08)),
    intervalDays,
    dueAt: new Date(params.now.getTime() + intervalDays * DAY_MS).toISOString(),
    lastAttemptAt: params.now.toISOString()
  };
}

function getCorrectIntervalDays(correctAttempts: number) {
  if (correctAttempts <= 1) return 1;
  if (correctAttempts === 2) return 3;
  if (correctAttempts === 3) return 7;
  if (correctAttempts === 4) return 14;
  return 30;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}
