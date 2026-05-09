import { describe, expect, it } from "vitest";
import { detectProductTraits, recommendStack } from "../index.js";

describe("stack advisor", () => {
  it("detects AI and subscription traits", () => {
    expect(detectProductTraits("subscription AI journaling app with voice notes")).toContain("ai_app");
    expect(detectProductTraits("subscription AI journaling app with voice notes")).toContain("subscription");
  });

  it("recommends Stripe Checkout for subscriptions", () => {
    const recommendation = recommendStack({
      idea: "I want to build a subscription AI journaling app",
      now: new Date("2026-05-09T12:00:00.000Z")
    });

    expect(recommendation.payments.tool).toBe("Stripe Checkout");
    expect(recommendation.database.tool).toBe("Supabase Postgres");
    expect(recommendation.learningPathLessonIds).toContain("lesson-default-mvp-stack");
  });

  it("warns mobile-first apps to validate web first", () => {
    const recommendation = recommendStack({
      idea: "A mobile habit app for college students",
      now: new Date("2026-05-09T12:00:00.000Z")
    });

    expect(recommendation.frontend.tool).toContain("web MVP first");
    expect(recommendation.avoidForNow).toContain("Native mobile app before proving the web loop");
  });

  it("mentions marketplace payouts complexity", () => {
    const recommendation = recommendStack({
      idea: "A marketplace for local fitness coaches",
      now: new Date("2026-05-09T12:00:00.000Z")
    });

    expect(recommendation.payments.tool).toContain("Stripe Connect later");
    expect(recommendation.avoidForNow).toContain("Full marketplace payouts before validating demand");
  });
});
