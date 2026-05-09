import type { BuilderReadinessScore } from "../types.js";

export function classifyBuilderReadiness(score: number): BuilderReadinessScore["level"] {
  if (score <= 20) return "Curious beginner";
  if (score <= 40) return "Learning the basics";
  if (score <= 60) return "MVP ready soon";
  if (score <= 80) return "Ready to ship";
  return "Dangerous builder";
}
