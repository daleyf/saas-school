import { updateReviewState } from "../algorithms/spacedRepetition.js";
import type { AppDb } from "../db/client.js";
import {
  completeLessonProgress,
  getDueQuestionIds,
  getLesson,
  getLessonAnswerStats,
  getQuestion,
  getQuestionsForLesson,
  getReviewState,
  getSources,
  recordAnswerAttempt,
  upsertReviewState
} from "../db/repository.js";
import type { AnswerResult, QuizQuestion, QuizScore } from "../types.js";

export function getQuizForLesson(db: AppDb, lessonId: string): QuizQuestion[] {
  return getQuestionsForLesson(db, lessonId);
}

export function submitAnswer(db: AppDb, params: {
  userId: string;
  questionId: string;
  choiceId: string;
  now?: Date;
}): AnswerResult {
  const now = params.now ?? new Date();
  const question = getQuestion(db, params.questionId);
  if (!question) {
    throw new Error(`Question not found: ${params.questionId}`);
  }
  if (!question.choices.some((choice) => choice.id === params.choiceId)) {
    throw new Error(`Choice ${params.choiceId} is not valid for question ${params.questionId}`);
  }

  const isCorrect = params.choiceId === question.correctChoiceId;
  const updatedReviewState = updateReviewState({
    previous: getReviewState(db, params.userId, params.questionId),
    userId: params.userId,
    questionId: params.questionId,
    isCorrect,
    now
  });

  upsertReviewState(db, updatedReviewState);
  recordAnswerAttempt(db, {
    userId: params.userId,
    questionId: params.questionId,
    lessonId: question.lessonId,
    selectedChoiceId: params.choiceId,
    correctChoiceId: question.correctChoiceId,
    isCorrect,
    answeredAt: now.toISOString()
  });

  const lessonQuestions = getQuestionsForLesson(db, question.lessonId);
  const answeredQuestionIds = new Set(
    lessonQuestions
      .map((lessonQuestion) => getReviewState(db, params.userId, lessonQuestion.id))
      .filter(Boolean)
      .map((state) => state?.questionId)
  );
  if (lessonQuestions.every((lessonQuestion) => answeredQuestionIds.has(lessonQuestion.id))) {
    completeLessonProgress(db, params.userId, question.lessonId, now.toISOString());
  }

  db.save();

  return {
    questionId: question.id,
    selectedChoiceId: params.choiceId,
    correctChoiceId: question.correctChoiceId,
    isCorrect,
    explanation: question.explanation,
    updatedReviewState,
    sourceLinks: getSources(db, question.sourceIds)
  };
}

export function getDueReviewQuestions(db: AppDb, userId: string, now = new Date()): QuizQuestion[] {
  return getDueQuestionIds(db, userId, now.toISOString())
    .map((questionId) => getQuestion(db, questionId))
    .filter((question): question is QuizQuestion => Boolean(question));
}

export function getLessonQuizScore(db: AppDb, userId: string, lessonId: string): QuizScore {
  if (!getLesson(db, lessonId)) {
    throw new Error(`Lesson not found: ${lessonId}`);
  }
  const stats = getLessonAnswerStats(db, userId, lessonId);
  const answered = Number(stats.answered) || 0;
  const correct = Number(stats.correct) || 0;
  return {
    lessonId,
    answered,
    correct,
    accuracy: answered === 0 ? 0 : correct / answered
  };
}
