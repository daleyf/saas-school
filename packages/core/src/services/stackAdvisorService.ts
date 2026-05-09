import { detectProductTraits } from "../algorithms/stackScoring.js";
import type { AppDb } from "../db/client.js";
import { saveStackRecommendation } from "../db/repository.js";
import type { StackChoice, StackRecommendation } from "../types.js";

export function recommendStack(params: { idea: string; now?: Date }): StackRecommendation {
  const idea = params.idea.trim();
  if (!idea) {
    throw new Error("Idea is required.");
  }

  const traits = detectProductTraits(idea);
  const isMarketplace = traits.includes("marketplace");
  const isMobile = traits.includes("mobile_first");
  const isRealtime = traits.includes("realtime");
  const isAi = traits.includes("ai_app");
  const isB2b = traits.includes("b2b");
  const isDashboard = traits.includes("dashboard");
  const generatedAt = (params.now ?? new Date()).toISOString();

  const recommendation: StackRecommendation = {
    id: `rec-${slugify(idea).slice(0, 40)}-${Date.parse(generatedAt)}`,
    idea,
    frontend: choice(
      isMobile ? "Next.js web MVP first, then React Native if native behavior matters" : "Next.js",
      isMobile
        ? "A web MVP is usually faster for validating demand. Move native once phone-specific behavior is proven."
        : "Great default for landing pages, dashboards, server-rendered routes, and API routes.",
      "Use it for a web SaaS MVP with pages, forms, and account flows.",
      "Skip it only when native mobile, hard real-time, or a non-web interface is the core product.",
      ["vercel-docs"]
    ),
    backend: choice(
      isRealtime ? "Next.js API routes plus a realtime service when needed" : "Next.js server routes",
      isRealtime
        ? "Start with simple server routes, then add realtime infrastructure only around the live feature."
        : "Keeps the MVP in one deployable app while still supporting trusted server-side logic.",
      "Use it for checkout creation, protected writes, and server-side integrations.",
      "Do not split into microservices until one app becomes a real bottleneck.",
      ["vercel-docs"]
    ),
    database: choice(
      "Supabase Postgres",
      isAi
        ? "Postgres handles users, subscriptions, and app data. Supabase can also support vector search later with pgvector."
        : "Relational data is a strong fit for users, subscriptions, progress, teams, and attempts.",
      "Use it when your app has structured data and relationships.",
      "Do not add a second database until your data shape clearly requires it.",
      ["supabase-docs", "postgres-docs"]
    ),
    auth: choice(
      isB2b ? "Clerk" : "Clerk or Supabase Auth",
      isB2b
        ? "Clerk is a clean fit for polished auth UX, organizations, and account management."
        : "Both avoid custom auth. Clerk is smoother for UX; Supabase Auth keeps more in one platform.",
      "Use hosted auth for normal accounts, sessions, password reset, and social login.",
      "Do not build custom auth for a first MVP.",
      ["clerk-docs", "supabase-docs"]
    ),
    payments: choice(
      isMarketplace ? "Stripe Checkout first; Stripe Connect later" : "Stripe Checkout",
      isMarketplace
        ? "Checkout can validate demand, but marketplaces eventually need Connect for payouts and compliance."
        : "Hosted checkout gets simple subscriptions live without custom payment UI.",
      "Use Checkout for first paid plans and simple subscriptions.",
      "Do not build a custom billing engine at MVP stage.",
      ["stripe-checkout"]
    ),
    deployment: choice(
      "Vercel",
      "Fast path to deploy a Next.js app with preview deployments and environment variables.",
      "Use it for a Next.js web app that needs quick iteration.",
      "Consider another host if you need long-running servers or unusual networking.",
      ["vercel-docs"]
    ),
    analytics: choice(
      "PostHog",
      isDashboard
        ? "Track activation, dashboard usage, report views, and retention by account."
        : "Track activation, lesson completion, quiz attempts, retention, and feature usage.",
      "Use it to understand product behavior without asking users to remember every detail.",
      "Do not track sensitive content or secrets as analytics properties.",
      ["posthog-docs"]
    ),
    email: choice(
      "Resend",
      "Simple fit for transactional product emails like sign-in, receipts, nudges, and weekly summaries.",
      "Use it after the product needs reliable transactional email.",
      "Do not spend early cycles on complex lifecycle marketing automation.",
      []
    ),
    avoidForNow: [
      "Custom auth",
      "Kubernetes",
      "Microservices",
      "Custom billing engine",
      ...(isMarketplace ? ["Full marketplace payouts before validating demand"] : []),
      ...(isMobile ? ["Native mobile app before proving the web loop"] : []),
      ...(isRealtime ? ["Realtime infrastructure for features that do not need live updates"] : [])
    ],
    learningPathLessonIds: [
      "lesson-saas-stack-overview",
      "lesson-frontend-backend-database",
      "lesson-auth-payments-analytics",
      "lesson-default-mvp-stack",
      "lesson-avoid-overengineering"
    ],
    generatedAt
  };

  return recommendation;
}

export function recommendAndSaveStack(db: AppDb, params: { idea: string; now?: Date }): StackRecommendation {
  const recommendation = recommendStack(params);
  saveStackRecommendation(db, recommendation.id, recommendation.idea, JSON.stringify(recommendation), recommendation.generatedAt);
  db.save();
  return recommendation;
}

function choice(tool: string, reason: string, whenToUse: string, whenNotToUse: string, sourceIds: string[]): StackChoice {
  return { tool, reason, whenToUse, whenNotToUse, sourceIds };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
