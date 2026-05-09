import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { openAppDb, resetDbFile } from "../db/client.js";
import type { AppDb } from "../db/client.js";
import { getBuilderReadinessScore, getCourseProgress } from "../services/progressService.js";
import { DEFAULT_USER_ID, seedDatabase } from "../services/seedService.js";
import { submitAnswer } from "../services/quizService.js";

const dbPath = "/private/tmp/saas-school-progress-test.sqlite";
let db: AppDb;

describe("progress service", () => {
  beforeEach(async () => {
    resetDbFile(dbPath);
    db = await openAppDb(dbPath);
    seedDatabase(db);
  });

  afterEach(() => {
    db.close();
    resetDbFile(dbPath);
  });

  it("starts with zero course progress", () => {
    const progress = getCourseProgress(db, DEFAULT_USER_ID, "saas-stack-foundations");
    expect(progress.totalLessons).toBe(5);
    expect(progress.percentComplete).toBe(0);
  });

  it("updates readiness after answering a full lesson quiz", () => {
    submitAnswer(db, { userId: DEFAULT_USER_ID, questionId: "q-saas-stack-001", choiceId: "b" });
    submitAnswer(db, { userId: DEFAULT_USER_ID, questionId: "q-saas-stack-002", choiceId: "b" });
    submitAnswer(db, { userId: DEFAULT_USER_ID, questionId: "q-saas-stack-003", choiceId: "a" });

    const progress = getCourseProgress(db, DEFAULT_USER_ID, "saas-stack-foundations");
    const readiness = getBuilderReadinessScore(db, DEFAULT_USER_ID);

    expect(progress.completedLessons).toBe(1);
    expect(readiness.score).toBeGreaterThan(0);
  });
});
