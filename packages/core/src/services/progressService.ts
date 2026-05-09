import { classifyBuilderReadiness } from "../algorithms/mastery.js";
import type { AppDb } from "../db/client.js";
import {
  completeLessonProgress,
  getAllReviewStates,
  getAnswerStats,
  getCompletedLessonIds,
  getCourseById,
  getCourseBySlug,
  getLesson,
  getLessonsForCourse,
  getQuestion,
  getQuestionsForLesson,
  listCourses
} from "../db/repository.js";
import { getDueReviewQuestions } from "./quizService.js";
import type { BuilderReadinessScore, CourseProgress, DailyReview, Lesson, TopicWeakness, UserProgress } from "../types.js";

export function completeLesson(db: AppDb, userId: string, lessonId: string, now = new Date()): UserProgress {
  if (!getLesson(db, lessonId)) {
    throw new Error(`Lesson not found: ${lessonId}`);
  }
  completeLessonProgress(db, userId, lessonId, now.toISOString());
  db.save();
  return {
    userId,
    lessonId,
    status: "completed",
    completedAt: now.toISOString()
  };
}

export function getCourseProgress(db: AppDb, userId: string, courseSlugOrId: string): CourseProgress {
  const course = getCourseBySlug(db, courseSlugOrId) ?? getCourseById(db, courseSlugOrId);
  if (!course) {
    throw new Error(`Course not found: ${courseSlugOrId}`);
  }
  const lessons = getLessonsForCourse(db, course.id);
  const completed = new Set(getCompletedLessonIds(db, userId));
  const completedLessons = lessons.filter((lesson) => completed.has(lesson.id)).length;
  return {
    courseId: course.id,
    completedLessons,
    totalLessons: lessons.length,
    percentComplete: lessons.length === 0 ? 0 : Math.round((completedLessons / lessons.length) * 100)
  };
}

export function getBuilderReadinessScore(db: AppDb, userId: string): BuilderReadinessScore {
  const allCourses = listCourses(db);
  const totalLessons = allCourses.flatMap((course) => getLessonsForCourse(db, course.id)).length;
  const completedLessons = getCompletedLessonIds(db, userId).length;
  const lessonCompletionScore = totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

  const answerStats = getAnswerStats(db, userId);
  const answered = Number(answerStats.answered) || 0;
  const correct = Number(answerStats.correct) || 0;
  const quizAccuracyScore = answered === 0 ? 0 : (correct / answered) * 100;

  const reviewStates = getAllReviewStates(db, userId);
  const reviewMasteryScore =
    reviewStates.length === 0
      ? 0
      : (reviewStates.filter((state) => state.status === "mastered" || state.correctAttempts >= 3).length / reviewStates.length) * 100;

  const completedLessonsList = new Set(getCompletedLessonIds(db, userId));
  const completedTags = new Set<string>();
  for (const course of allCourses) {
    for (const lesson of getLessonsForCourse(db, course.id)) {
      if (completedLessonsList.has(lesson.id)) {
        for (const question of getQuestionsForLesson(db, lesson.id)) {
          question.topicTags.forEach((tag) => completedTags.add(tag));
        }
      }
    }
  }
  const breadthScore = Math.min(100, completedTags.size * 12.5);
  const score = Math.round(
    lessonCompletionScore * 0.4 + quizAccuracyScore * 0.3 + reviewMasteryScore * 0.2 + breadthScore * 0.1
  );

  return {
    score,
    level: classifyBuilderReadiness(score),
    lessonCompletionScore: Math.round(lessonCompletionScore),
    quizAccuracyScore: Math.round(quizAccuracyScore),
    reviewMasteryScore: Math.round(reviewMasteryScore),
    breadthScore: Math.round(breadthScore)
  };
}

export function getWeakTopics(db: AppDb, userId: string): TopicWeakness[] {
  const reviewStates = getAllReviewStates(db, userId);
  const byTopic = new Map<string, { correct: number; incorrect: number; lessonIds: Set<string> }>();

  for (const state of reviewStates) {
    const question = getQuestion(db, state.questionId);
    if (!question) continue;
    for (const tag of question.topicTags) {
      const current = byTopic.get(tag) ?? { correct: 0, incorrect: 0, lessonIds: new Set<string>() };
      current.correct += state.correctAttempts;
      current.incorrect += state.incorrectAttempts;
      current.lessonIds.add(question.lessonId);
      byTopic.set(tag, current);
    }
  }

  return [...byTopic.entries()]
    .map(([topic, stats]) => {
      const total = stats.correct + stats.incorrect;
      return {
        topic,
        incorrectAttempts: stats.incorrect,
        correctAttempts: stats.correct,
        masteryScore: total === 0 ? 0 : round(stats.correct / total),
        suggestedLessonIds: [...stats.lessonIds]
      };
    })
    .filter((topic) => topic.incorrectAttempts > 0)
    .sort((a, b) => b.incorrectAttempts - a.incorrectAttempts || a.masteryScore - b.masteryScore);
}

export function getDailyReview(db: AppDb, userId: string, now = new Date()): DailyReview {
  return {
    dueQuestions: getDueReviewQuestions(db, userId, now),
    weakTopics: getWeakTopics(db, userId)
  };
}

export function getRecommendedNextLesson(db: AppDb, userId: string): Lesson | null {
  const completed = new Set(getCompletedLessonIds(db, userId));
  for (const course of listCourses(db)) {
    for (const lesson of getLessonsForCourse(db, course.id)) {
      if (!completed.has(lesson.id)) {
        return lesson;
      }
    }
  }
  return null;
}

export function listCompletedLessonIds(db: AppDb, userId: string): string[] {
  return getCompletedLessonIds(db, userId);
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}
