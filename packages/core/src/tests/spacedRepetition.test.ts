import { describe, expect, it } from "vitest";
import { updateReviewState } from "../algorithms/spacedRepetition.js";

const now = new Date("2026-05-09T12:00:00.000Z");

describe("updateReviewState", () => {
  it("schedules a new correct answer for tomorrow", () => {
    const state = updateReviewState({
      previous: null,
      userId: "user-1",
      questionId: "q-1",
      isCorrect: true,
      now
    });

    expect(state.status).toBe("learning");
    expect(state.correctAttempts).toBe(1);
    expect(state.intervalDays).toBe(1);
    expect(state.dueAt).toBe("2026-05-10T12:00:00.000Z");
  });

  it("schedules an incorrect answer in ten minutes", () => {
    const state = updateReviewState({
      previous: null,
      userId: "user-1",
      questionId: "q-1",
      isCorrect: false,
      now
    });

    expect(state.status).toBe("learning");
    expect(state.incorrectAttempts).toBe(1);
    expect(state.intervalDays).toBe(0);
    expect(state.dueAt).toBe("2026-05-09T12:10:00.000Z");
  });

  it("moves to mastered after five correct answers", () => {
    let state = null;
    for (let index = 0; index < 5; index += 1) {
      state = updateReviewState({
        previous: state,
        userId: "user-1",
        questionId: "q-1",
        isCorrect: true,
        now
      });
    }

    expect(state?.status).toBe("mastered");
    expect(state?.intervalDays).toBe(30);
  });
});
