import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { openAppDb, resetDbFile } from "../db/client.js";
import type { AppDb } from "../db/client.js";
import { DEFAULT_USER_ID, seedDatabase } from "../services/seedService.js";
import { getDueReviewQuestions, getQuizForLesson, submitAnswer } from "../services/quizService.js";

const dbPath = "/private/tmp/saas-school-core-test.sqlite";
let db: AppDb;

describe("quiz service", () => {
  beforeEach(async () => {
    resetDbFile(dbPath);
    db = await openAppDb(dbPath);
    seedDatabase(db);
  });

  afterEach(() => {
    db.close();
    resetDbFile(dbPath);
  });

  it("returns quiz questions for a lesson", () => {
    const quiz = getQuizForLesson(db, "lesson-saas-stack-overview");
    expect(quiz).toHaveLength(3);
    expect(quiz[0]?.choices).toHaveLength(4);
  });

  it("submits an incorrect answer and returns it when due", () => {
    const now = new Date("2026-05-09T12:00:00.000Z");
    const result = submitAnswer(db, {
      userId: DEFAULT_USER_ID,
      questionId: "q-saas-stack-001",
      choiceId: "a",
      now
    });

    expect(result.isCorrect).toBe(false);
    expect(getDueReviewQuestions(db, DEFAULT_USER_ID, now)).toHaveLength(0);
    expect(getDueReviewQuestions(db, DEFAULT_USER_ID, new Date("2026-05-09T12:10:01.000Z"))).toHaveLength(1);
  });
});
