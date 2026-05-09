#!/usr/bin/env node
import { Command } from "commander";
import {
  DEFAULT_USER_ID,
  getBuilderReadinessScore,
  getCourseDetail,
  getDailyReview,
  getLessonDetail,
  getLessonQuizScore,
  getQuizForLesson,
  getRecommendedNextLesson,
  listCourses,
  openAppDb,
  recommendAndSaveStack,
  resetDbFile,
  seedDatabase,
  submitAnswer
} from "@saas-school/core";
import type { AppDb, QuizQuestion, StackRecommendation } from "@saas-school/core";

const program = new Command();

program.name("saas-school").description("SaaS School local-first CLI").version("0.1.0");

program
  .command("seed")
  .description("Seed local SQLite data")
  .action(async () => {
    await withDb((db) => {
      seedDatabase(db);
      console.log(`Seeded SaaS School data at ${db.path}`);
    });
  });

program
  .command("reset")
  .description("Reset local SQLite data")
  .action(async () => {
    resetDbFile();
    const db = await openAppDb();
    seedDatabase(db);
    db.close();
    console.log("Reset and seeded local data.");
  });

program
  .command("list-courses")
  .description("List seeded courses")
  .action(async () => {
    await withSeededDb((db) => {
      const courses = listCourses(db);
      if (courses.length === 0) {
        console.log("No courses found. Run pnpm seed.");
        return;
      }
      for (const course of courses) {
        console.log(`${course.slug}`);
        console.log(`  ${course.title}`);
        console.log(`  ${course.description}`);
        console.log(`  ${course.estimatedMinutes} min | ${course.level}`);
      }
    });
  });

program
  .command("show-course")
  .argument("<slug>", "Course slug")
  .description("Show a course and its lessons")
  .action(async (slug: string) => {
    await withSeededDb((db) => {
      const detail = getCourseDetail(db, slug);
      if (!detail) {
        throw new Error(`Course not found: ${slug}`);
      }
      console.log(`${detail.course.title}`);
      console.log(detail.course.description);
      console.log("");
      for (const module of detail.modules) {
        console.log(`${module.order}. ${module.title}`);
        for (const lesson of detail.lessons.filter((item) => item.moduleId === module.id)) {
          console.log(`  - ${lesson.id}: ${lesson.title} (${lesson.estimatedMinutes} min)`);
        }
      }
    });
  });

program
  .command("start-lesson")
  .argument("<lessonId>", "Lesson ID")
  .description("Print lesson content")
  .action(async (lessonId: string) => {
    await withSeededDb((db) => {
      const detail = getLessonDetail(db, lessonId);
      if (!detail) {
        throw new Error(`Lesson not found: ${lessonId}`);
      }
      console.log(detail.lesson.bodyMarkdown);
      console.log("");
      console.log("Key terms:");
      for (const keyTerm of detail.lesson.keyTerms) {
        console.log(`- ${keyTerm.term}: ${keyTerm.definition}`);
      }
      console.log("");
      console.log("Sources:");
      for (const source of detail.sources) {
        console.log(`- ${source.title} (${source.publisher}): ${source.url}`);
      }
      console.log("");
      console.log(`Next: pnpm cli quiz ${lessonId}`);
    });
  });

program
  .command("quiz")
  .argument("<lessonId>", "Lesson ID")
  .description("Show quiz questions for a lesson")
  .action(async (lessonId: string) => {
    await withSeededDb((db) => {
      const questions = getQuizForLesson(db, lessonId);
      if (questions.length === 0) {
        throw new Error(`No quiz found for lesson: ${lessonId}`);
      }
      printQuestions(questions);
    });
  });

program
  .command("answer")
  .argument("<questionId>", "Question ID")
  .argument("<choiceId>", "Choice ID")
  .description("Submit an answer")
  .action(async (questionId: string, choiceId: string) => {
    await withSeededDb((db) => {
      const result = submitAnswer(db, {
        userId: DEFAULT_USER_ID,
        questionId,
        choiceId: choiceId.toLowerCase()
      });
      console.log(result.isCorrect ? "Correct." : "Not quite. This one will come back in review.");
      console.log("");
      console.log("Explanation:");
      console.log(result.explanation);
      console.log("");
      console.log(`Next review: ${formatDate(result.updatedReviewState.dueAt)}`);
      console.log(`Status: ${result.updatedReviewState.status}`);
      console.log("");
      console.log("Sources:");
      for (const source of result.sourceLinks) {
        console.log(`- ${source.title}: ${source.url}`);
      }
    });
  });

program
  .command("due")
  .description("Show due review questions")
  .action(async () => {
    await withSeededDb((db) => {
      const review = getDailyReview(db, DEFAULT_USER_ID);
      if (review.dueQuestions.length === 0) {
        console.log("No review questions due right now.");
        return;
      }
      console.log(`${review.dueQuestions.length} review question(s) due.`);
      console.log("");
      printQuestions(review.dueQuestions);
      if (review.weakTopics.length > 0) {
        console.log("Weak topics:");
        for (const topic of review.weakTopics.slice(0, 5)) {
          console.log(`- ${topic.topic}: ${topic.incorrectAttempts} missed, mastery ${Math.round(topic.masteryScore * 100)}%`);
        }
      }
    });
  });

program
  .command("progress")
  .description("Show local user progress")
  .action(async () => {
    await withSeededDb((db) => {
      const readiness = getBuilderReadinessScore(db, DEFAULT_USER_ID);
      const nextLesson = getRecommendedNextLesson(db, DEFAULT_USER_ID);
      const review = getDailyReview(db, DEFAULT_USER_ID);
      console.log(`Builder Readiness: ${readiness.score}/100`);
      console.log(`Level: ${readiness.level}`);
      console.log("");
      console.log(`Lesson completion: ${readiness.lessonCompletionScore}%`);
      console.log(`Quiz accuracy: ${readiness.quizAccuracyScore}%`);
      console.log(`Review mastery: ${readiness.reviewMasteryScore}%`);
      console.log(`Breadth: ${readiness.breadthScore}%`);
      console.log("");
      console.log(`Review due: ${review.dueQuestions.length}`);
      console.log(`Next lesson: ${nextLesson ? `${nextLesson.title} (${nextLesson.id})` : "All lessons completed"}`);

      if (review.weakTopics.length > 0) {
        console.log("");
        console.log("Weak topics:");
        for (const topic of review.weakTopics.slice(0, 5)) {
          console.log(`- ${topic.topic}: ${topic.incorrectAttempts} missed`);
        }
      }
    });
  });

program
  .command("score")
  .argument("<lessonId>", "Lesson ID")
  .description("Show quiz score for a lesson")
  .action(async (lessonId: string) => {
    await withSeededDb((db) => {
      const score = getLessonQuizScore(db, DEFAULT_USER_ID, lessonId);
      console.log(`${lessonId}`);
      console.log(`Answered: ${score.answered}`);
      console.log(`Correct: ${score.correct}`);
      console.log(`Accuracy: ${Math.round(score.accuracy * 100)}%`);
    });
  });

program
  .command("recommend-stack")
  .argument("<idea...>", "Product idea")
  .description("Recommend a practical MVP stack")
  .action(async (ideaParts: string[]) => {
    await withSeededDb((db) => {
      const recommendation = recommendAndSaveStack(db, { idea: ideaParts.join(" ") });
      printRecommendation(recommendation);
    });
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

async function withDb(callback: (db: AppDb) => void | Promise<void>) {
  const db = await openAppDb();
  try {
    await callback(db);
  } finally {
    db.close();
  }
}

async function withSeededDb(callback: (db: AppDb) => void | Promise<void>) {
  await withDb(async (db) => {
    if (listCourses(db).length === 0) {
      seedDatabase(db);
    }
    await callback(db);
  });
}

function printQuestions(questions: QuizQuestion[]) {
  questions.forEach((question, index) => {
    console.log(`Question ${index + 1}/${questions.length}`);
    console.log(question.prompt);
    console.log("");
    for (const choice of question.choices) {
      console.log(`${choice.id.toUpperCase()}. ${choice.text}`);
    }
    console.log("");
    console.log(`Answer with: pnpm cli answer ${question.id} <choice>`);
    console.log("");
  });
}

function printRecommendation(recommendation: StackRecommendation) {
  console.log(`Recommended stack for: ${recommendation.idea}`);
  console.log("");
  printStackChoice("Frontend", recommendation.frontend);
  printStackChoice("Backend", recommendation.backend);
  printStackChoice("Database", recommendation.database);
  printStackChoice("Auth", recommendation.auth);
  printStackChoice("Payments", recommendation.payments);
  printStackChoice("Deployment", recommendation.deployment);
  printStackChoice("Analytics", recommendation.analytics);
  printStackChoice("Email", recommendation.email);
  console.log("Avoid for now:");
  for (const item of recommendation.avoidForNow) {
    console.log(`- ${item}`);
  }
  console.log("");
  console.log("Suggested learning path:");
  recommendation.learningPathLessonIds.forEach((lessonId, index) => {
    console.log(`${index + 1}. ${lessonId}`);
  });
}

function printStackChoice(label: string, choice: { tool: string; reason: string; whenToUse: string; whenNotToUse: string }) {
  console.log(`${label}: ${choice.tool}`);
  console.log(`Why: ${choice.reason}`);
  console.log(`Use when: ${choice.whenToUse}`);
  console.log(`Avoid when: ${choice.whenNotToUse}`);
  console.log("");
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}
