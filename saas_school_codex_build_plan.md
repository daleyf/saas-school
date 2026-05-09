# SaaS School — Codex Build Plan

## One-line product definition

**SaaS School is a Duolingo/Quizlet-style learning app that teaches first-time builders the exact SaaS tools, decisions, and workflows they need to ship a real paid product online.**

The product should feel like:

- **Duolingo** for progression, streaks, daily lessons, encouraging UI, and short learning loops.
- **Quizlet** for flashcards, multiple-choice quizzes, and review sessions.
- **YC Startup School** for founder seriousness, source credibility, and practical startup education.
- **A stack advisor** for immediate value: the user describes what they are building and the app recommends a stack, explains why, then creates a custom learning path.

This is not a generic course platform. The product exists to help someone go from:

> “I want to build a SaaS but I do not know what Vercel, Stripe, Supabase, databases, auth, analytics, deployment, or pricing decisions actually mean.”

To:

> “I understand the stack, I know what to use, I know why, and I can ship a paid product.”

---

## Core thesis

Most new builders are stuck in tutorial hell because they do not know which tools matter, when to use each one, or what order to learn them in.

SaaS School solves this with:

1. **Personalized stack recommendations** based on the user’s product idea.
2. **Short, practical lessons** tied to real SaaS shipping decisions.
3. **Multiple-choice quizzes** after every lesson.
4. **Spaced repetition** for missed questions.
5. **Persistent memory of covered topics**, mastery scores, streaks, and weak areas.
6. **Source-backed learning** with links to YC, a16z, Sequoia, Stripe, Vercel, Supabase, PostHog, and other credible resources.

---

## MVP positioning

### Working name

**SaaS School**

Alternative names:

- Founder Stack
- Ship School
- SaaS Dojo
- BuildPath
- StackSensei
- Founder Flashcards

For the MVP, use **SaaS School**.

### Tagline options

- “Learn the stack. Ship the product.”
- “Duolingo for building SaaS.”
- “The fastest way to learn what you need to ship a paid product.”
- “Tell us what you are building. We will teach you the stack.”

Recommended MVP tagline:

> **Learn the stack. Ship the product.**

### Target user

Primary:

- CS students who want to launch products.
- Indie hackers building their first paid SaaS.
- Nontechnical founders trying to understand the technical stack.
- Junior developers who know how to code but do not understand production SaaS infrastructure.

Secondary:

- Bootcamp grads.
- Startup interns/new grads.
- Product-minded engineers.
- People preparing to join startups.

---

## Killer features

### 1. Stack Advisor

This is the main “wow” moment.

User enters a product idea:

> “I want to build an AI journaling app with subscriptions, user accounts, and saved memories.”

The app returns:

- Recommended frontend.
- Recommended backend.
- Recommended database.
- Recommended auth provider.
- Recommended payments setup.
- Recommended hosting/deployment path.
- Recommended analytics.
- What not to use yet.
- Why each tool fits the user’s current stage.
- A generated learning path.
- A 10-question diagnostic quiz.

Example output:

```md
Recommended MVP stack:

Frontend: Next.js on Vercel
Reason: Fast deployment, easy routing, server components/API routes, strong SaaS template ecosystem.

Database: Supabase Postgres
Reason: Relational data is ideal for users, subscriptions, lessons, attempts, and progress. Supabase also gives auth/storage options.

Payments: Stripe Checkout first, not custom billing UI
Reason: Checkout gets paid subscriptions live quickly. Custom billing portals can come later.

Auth: Supabase Auth or Clerk
Reason: Both reduce auth complexity. Use Clerk if you want the cleanest auth UX. Use Supabase Auth if you want fewer vendors.

Do not use yet:
- Kubernetes
- Microservices
- Custom billing engine
- Custom auth
- Complex event streaming
```

The user should immediately feel:

> “Oh, this is exactly what I needed.”

### 2. Personalized learning path

After the stack recommendation, create a path:

1. What is a SaaS stack?
2. Frontend and deployment with Vercel.
3. Databases and why Postgres is usually the default.
4. Auth basics.
5. Stripe Checkout vs Stripe Billing.
6. Analytics and event tracking.
7. Landing pages and conversion.
8. MVP launch checklist.
9. Pricing basics.
10. Customer feedback loop.

Each lesson has:

- 3-8 minute reading length.
- Key terms.
- Practical examples.
- “When to use it.”
- “When not to use it.”
- Source links.
- Multiple-choice quiz.
- Missed questions added to review.

### 3. Spaced repetition quiz loop

Use a simple spaced repetition system.

Every question has a review state:

- `new`
- `learning`
- `review`
- `mastered`

Each attempt updates:

- correctness
- number of attempts
- confidence score
- next review date
- mastery score

Missed questions return soon. Correct questions appear less often.

### 4. Builder readiness score

Show a score from 0 to 100.

Breakdown:

- Stack literacy
- Payments literacy
- Database literacy
- Deployment literacy
- Auth literacy
- Analytics literacy
- Startup fundamentals
- Launch readiness

This gives the user a game-like reason to keep coming back.

### 5. Source-backed learning cards

Every lesson should include links like:

- YC Startup School
- YC Startup Library
- a16z articles/resources
- Sequoia Arc/company-building content
- Stripe docs
- Vercel docs
- Supabase docs
- PostHog docs
- Clerk docs
- PostgreSQL docs
- Indie Hackers examples

Important: Do **not** copy source content verbatim. Create original summaries and link to sources for deeper reading.

### 6. Visual credibility strip

The UI should include a “Learn from the best startup resources” strip with source badges/cards.

Use text badges in the MVP:

- YC
- a16z
- Sequoia
- Stripe
- Vercel
- Supabase
- PostHog

Do **not** imply affiliation, partnership, endorsement, or certification.

Do **not** use official VC/company logos unless usage rights and brand guidelines allow it. For MVP, use text badges or simple neutral cards. Example:

```tsx
<SourceBadge label="YC" description="Startup School + Startup Library" />
<SourceBadge label="a16z" description="Founder essays + market thinking" />
<SourceBadge label="Sequoia" description="PMF frameworks + company building" />
```

Footer disclaimer:

```txt
SaaS School is an independent learning product. It is not affiliated with, endorsed by, or sponsored by Y Combinator, Andreessen Horowitz, Sequoia Capital, Stripe, Vercel, Supabase, or any referenced company. Source links are provided for educational reference.
```

---

## Product scope

### MVP scope

Build a local-first app that proves the core loop:

1. User enters product idea.
2. Backend generates or selects a stack recommendation.
3. App creates a learning path.
4. User completes lessons.
5. User answers multiple-choice quizzes.
6. Missed questions get scheduled for review.
7. Dashboard shows progress, streak, weak areas, and builder readiness score.

### Not in MVP

Do not build these yet:

- Social features.
- Course marketplace.
- User-generated courses.
- AI-generated live curriculum with unverified sources.
- Browser extension.
- Mobile app.
- Team accounts.
- Real payments.
- Real auth.
- Complex CMS.
- Admin dashboard.

### Full product later

After the MVP feels good locally:

- Add auth.
- Add real Postgres/Supabase.
- Add Stripe subscriptions.
- Add AI-generated custom learning paths.
- Add source crawling/curation pipeline.
- Add public landing page.
- Add shareable progress cards.
- Add cohort/challenge mode.
- Add “ship your product in 30 days” mode.

---

## Technical strategy

Build backend/core/CLI first, then UI.

Recommended stack:

- Language: **TypeScript**
- Monorepo/package manager: **pnpm workspaces**
- Core package: pure TypeScript business logic
- CLI: Node.js CLI using Commander.js
- Local DB: SQLite with Drizzle ORM
- Frontend: Next.js + React + Tailwind CSS
- Later production DB: Supabase Postgres
- Later auth: Clerk or Supabase Auth
- Later payments: Stripe Checkout + Customer Portal
- Tests: Vitest

Why TypeScript:

- Same language across core, CLI, frontend, and backend.
- Easy to share types.
- Next.js/Vercel deployment becomes simpler.
- Codex can reason across the full codebase.

---

## Repository structure

```txt
saas-school/
  README.md
  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
  .env.example
  .gitignore

  apps/
    cli/
      package.json
      src/
        index.ts
        commands/
          seed.ts
          list-courses.ts
          start-lesson.ts
          answer.ts
          due.ts
          recommend-stack.ts
          progress.ts
          reset.ts

    web/
      package.json
      next.config.ts
      tailwind.config.ts
      src/
        app/
          page.tsx
          dashboard/page.tsx
          advisor/page.tsx
          courses/page.tsx
          courses/[courseId]/page.tsx
          lesson/[lessonId]/page.tsx
          quiz/[lessonId]/page.tsx
          review/page.tsx
          layout.tsx
        components/
          AppShell.tsx
          SourceBadge.tsx
          ProgressRing.tsx
          LessonCard.tsx
          QuizCard.tsx
          StackRecommendationCard.tsx
          MasteryBar.tsx
          DailyReviewPanel.tsx
          BuilderReadinessScore.tsx
        lib/
          api.ts
          mockUser.ts

  packages/
    core/
      package.json
      src/
        index.ts
        types.ts
        seed/
          courses.ts
          sources.ts
          stackTemplates.ts
        db/
          schema.ts
          client.ts
          migrations/
        services/
          courseService.ts
          quizService.ts
          spacedRepetitionService.ts
          stackAdvisorService.ts
          progressService.ts
          sourceService.ts
        algorithms/
          mastery.ts
          spacedRepetition.ts
          stackScoring.ts
        tests/
          quizService.test.ts
          spacedRepetition.test.ts
          stackAdvisor.test.ts
          progress.test.ts
```

---

## Development phases

## Phase 0 — Create project skeleton

### Goal

Create the monorepo, install dependencies, configure TypeScript, and create basic test setup.

### Tasks

1. Create pnpm workspace.
2. Add apps:
   - `apps/cli`
   - `apps/web`
3. Add package:
   - `packages/core`
4. Add Vitest.
5. Add Drizzle + SQLite dependencies.
6. Add Commander.js for CLI.
7. Add Next.js/Tailwind for web.
8. Add root scripts.

### Root scripts

```json
{
  "scripts": {
    "dev": "pnpm --filter web dev",
    "cli": "pnpm --filter cli start",
    "test": "pnpm -r test",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint",
    "seed": "pnpm --filter cli start seed",
    "reset": "pnpm --filter cli start reset"
  }
}
```

---

## Phase 1 — Define core domain models

### Goal

Create the data types and pure logic before any UI.

### Core entities

```ts
export type Course = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  moduleIds: string[];
};

export type Module = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
};

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  bodyMarkdown: string;
  keyTerms: KeyTerm[];
  sourceIds: string[];
  quizQuestionIds: string[];
  estimatedMinutes: number;
  order: number;
};

export type SourceLink = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  sourceType: "startup" | "technical_docs" | "vc" | "essay" | "video" | "docs";
  credibilityNote: string;
};

export type QuizQuestion = {
  id: string;
  lessonId: string;
  prompt: string;
  choices: QuizChoice[];
  correctChoiceId: string;
  explanation: string;
  sourceIds: string[];
  difficulty: "easy" | "medium" | "hard";
  topicTags: string[];
};

export type QuizChoice = {
  id: string;
  text: string;
};

export type UserProgress = {
  userId: string;
  lessonId: string;
  status: "not_started" | "started" | "completed";
  completedAt?: string;
};

export type ReviewState = {
  userId: string;
  questionId: string;
  status: "new" | "learning" | "review" | "mastered";
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  easeFactor: number;
  intervalDays: number;
  dueAt: string;
  lastAttemptAt?: string;
};

export type StackRecommendation = {
  id: string;
  idea: string;
  frontend: StackChoice;
  backend: StackChoice;
  database: StackChoice;
  auth: StackChoice;
  payments: StackChoice;
  deployment: StackChoice;
  analytics: StackChoice;
  email: StackChoice;
  avoidForNow: string[];
  learningPathLessonIds: string[];
  generatedAt: string;
};

export type StackChoice = {
  tool: string;
  reason: string;
  whenToUse: string;
  whenNotToUse: string;
  sourceIds: string[];
};
```

---

## Phase 2 — Seed curriculum content

### Goal

Create enough high-quality seed content for local testing.

Codex should generate original lesson content and quiz questions. Every lesson should include credible links for further reading.

### MVP courses

Build these 5 courses first:

1. **SaaS Stack Foundations**
2. **Deployment and Hosting**
3. **Databases for SaaS**
4. **Payments and Subscriptions**
5. **Startup Launch Basics**

### Course 1: SaaS Stack Foundations

Modules:

1. What is a SaaS?
2. Frontend vs backend.
3. Database basics.
4. Auth basics.
5. Payments basics.
6. Analytics basics.
7. MVP vs overengineering.

Example lessons:

- What makes software “SaaS”?
- Why most MVPs need auth, database, payments, and deployment.
- The difference between frontend, backend, database, and infrastructure.
- Why beginners overbuild.
- The default MVP stack: Next.js, Vercel, Supabase/Postgres, Stripe, PostHog.

### Course 2: Deployment and Hosting

Modules:

1. What deployment means.
2. Vercel vs Render vs Railway vs Fly.io.
3. Serverless basics.
4. Environment variables.
5. Domains and DNS.
6. Production checklist.

Example lessons:

- What happens when you deploy a web app?
- Why Vercel is common for Next.js apps.
- When Render/Railway/Fly may be better.
- What environment variables are and how to avoid leaking secrets.
- How to connect a custom domain.

### Course 3: Databases for SaaS

Modules:

1. Why apps need databases.
2. SQL vs NoSQL.
3. Postgres basics.
4. Supabase basics.
5. Schema design.
6. Migrations.
7. Row-level security basics.

Example lessons:

- Why Postgres is a strong default.
- Users, subscriptions, lessons, progress: modeling relational data.
- Supabase vs Firebase.
- SQLite for local MVPs.
- What migrations do.

### Course 4: Payments and Subscriptions

Modules:

1. Why payments are hard.
2. Stripe Checkout.
3. Stripe Billing.
4. Customer Portal.
5. Webhooks.
6. Pricing tiers.
7. Taxes and global payments basics.

Example lessons:

- Why Stripe Checkout is the MVP default.
- Checkout vs Billing vs Customer Portal.
- Why webhooks matter.
- Subscription status and access control.
- What not to build yourself.

### Course 5: Startup Launch Basics

Modules:

1. Getting startup ideas.
2. MVP planning.
3. Talking to users.
4. Landing pages.
5. Pricing.
6. Distribution.
7. Measuring retention.
8. Iterating after launch.

Example lessons:

- How to plan an MVP.
- How to know if people want it.
- Why distribution matters as much as code.
- How to launch on X, Reddit, YouTube, and friends.
- How to interpret early users.

---

## Phase 3 — Source library

### Goal

Create a static source library used by lessons, quiz explanations, and UI source cards.

Each source should have:

- Title
- Publisher
- URL
- Category
- Credibility note
- Used in lesson IDs

### Seed sources

Add these first:

```ts
export const sourceLinks: SourceLink[] = [
  {
    id: "yc-startup-school",
    title: "Startup School",
    publisher: "Y Combinator",
    url: "https://www.startupschool.org/",
    sourceType: "startup",
    credibilityNote: "Free founder course from Y Combinator covering startup fundamentals."
  },
  {
    id: "yc-startup-library",
    title: "YC Startup Library",
    publisher: "Y Combinator",
    url: "https://www.ycombinator.com/library",
    sourceType: "startup",
    credibilityNote: "YC essays and videos on starting, launching, and scaling companies."
  },
  {
    id: "yc-curriculum",
    title: "YC Startup School Curriculum",
    publisher: "Y Combinator",
    url: "https://www.startupschool.org/curriculum",
    sourceType: "startup",
    credibilityNote: "YC's Startup School curriculum page."
  },
  {
    id: "sequoia-arc",
    title: "Sequoia Arc",
    publisher: "Sequoia Capital",
    url: "https://www.sequoiacap.com/arc/",
    sourceType: "vc",
    credibilityNote: "Sequoia's early-stage company-building program and resources."
  },
  {
    id: "sequoia-pmf-framework",
    title: "The Arc Product-Market Fit Framework",
    publisher: "Sequoia Capital",
    url: "https://www.sequoiacap.com/article/pmf-framework/",
    sourceType: "vc",
    credibilityNote: "Framework for thinking about product-market fit."
  },
  {
    id: "a16z-home",
    title: "a16z News & Content",
    publisher: "Andreessen Horowitz",
    url: "https://a16z.com/",
    sourceType: "vc",
    credibilityNote: "VC essays, market analysis, and startup operating content."
  },
  {
    id: "stripe-docs",
    title: "Stripe Documentation",
    publisher: "Stripe",
    url: "https://docs.stripe.com/",
    sourceType: "technical_docs",
    credibilityNote: "Official Stripe technical documentation for payments and subscriptions."
  },
  {
    id: "stripe-checkout",
    title: "Stripe Checkout",
    publisher: "Stripe",
    url: "https://docs.stripe.com/payments/checkout",
    sourceType: "technical_docs",
    credibilityNote: "Official docs for hosted Stripe Checkout."
  },
  {
    id: "vercel-docs",
    title: "Vercel Documentation",
    publisher: "Vercel",
    url: "https://vercel.com/docs",
    sourceType: "technical_docs",
    credibilityNote: "Official Vercel docs for deployment and frontend hosting."
  },
  {
    id: "supabase-docs",
    title: "Supabase Documentation",
    publisher: "Supabase",
    url: "https://supabase.com/docs",
    sourceType: "technical_docs",
    credibilityNote: "Official Supabase docs for Postgres, auth, storage, and edge functions."
  },
  {
    id: "postgres-docs",
    title: "PostgreSQL Documentation",
    publisher: "PostgreSQL",
    url: "https://www.postgresql.org/docs/",
    sourceType: "technical_docs",
    credibilityNote: "Official PostgreSQL documentation."
  },
  {
    id: "posthog-docs",
    title: "PostHog Documentation",
    publisher: "PostHog",
    url: "https://posthog.com/docs",
    sourceType: "technical_docs",
    credibilityNote: "Official PostHog docs for product analytics and event tracking."
  },
  {
    id: "clerk-docs",
    title: "Clerk Documentation",
    publisher: "Clerk",
    url: "https://clerk.com/docs",
    sourceType: "technical_docs",
    credibilityNote: "Official Clerk docs for authentication."
  }
];
```

Codex should verify source URLs when possible, but the MVP can store these links statically.

---

## Phase 4 — Quiz engine

### Goal

Make quiz answering work perfectly in CLI before building UI.

### Required functions

```ts
getQuizForLesson(lessonId: string): QuizQuestion[]
submitAnswer(userId: string, questionId: string, choiceId: string): AnswerResult
getDueReviewQuestions(userId: string, now: Date): QuizQuestion[]
getLessonQuizScore(userId: string, lessonId: string): QuizScore
getWeakTopics(userId: string): TopicWeakness[]
```

### Answer result

```ts
export type AnswerResult = {
  questionId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
  explanation: string;
  updatedReviewState: ReviewState;
  sourceLinks: SourceLink[];
};
```

### Quiz behavior

When a user answers:

- Show whether correct.
- Show explanation.
- Show linked sources.
- Update review schedule.
- Update topic mastery.
- If wrong, mark as due soon.

### Multiple-choice question format

Each question should have 4 choices.

Example:

```ts
{
  id: "q-stripe-checkout-001",
  lessonId: "lesson-stripe-checkout-vs-billing",
  prompt: "For a first SaaS MVP with simple monthly subscriptions, what is usually the fastest Stripe product to start with?",
  choices: [
    { id: "a", text: "Build a custom billing system from scratch" },
    { id: "b", text: "Stripe Checkout" },
    { id: "c", text: "A manually emailed invoice workflow" },
    { id: "d", text: "Cryptocurrency payments only" }
  ],
  correctChoiceId: "b",
  explanation: "Stripe Checkout is a hosted payment page that lets a small team accept payments quickly without building custom payment UI first.",
  sourceIds: ["stripe-checkout"],
  difficulty: "easy",
  topicTags: ["payments", "stripe", "mvp"]
}
```

---

## Phase 5 — Spaced repetition algorithm

### Goal

Build a simple but reliable review scheduler.

Use an SM-2-inspired algorithm, simplified for MVP.

### Initial state

When a user first sees a question:

```ts
{
  status: "new",
  attempts: 0,
  correctAttempts: 0,
  incorrectAttempts: 0,
  easeFactor: 2.5,
  intervalDays: 0,
  dueAt: now
}
```

### On correct answer

Rules:

- Increase correct attempts.
- Increase ease factor slightly.
- Increase interval.
- If repeated correct answers, move toward `mastered`.

Simple interval progression:

- First correct: due in 1 day.
- Second correct: due in 3 days.
- Third correct: due in 7 days.
- Fourth correct: due in 14 days.
- Fifth correct: mark as `mastered`, due in 30 days.

### On incorrect answer

Rules:

- Increase incorrect attempts.
- Decrease ease factor.
- Set status to `learning`.
- Due again in 10 minutes or next session.

For local MVP, due in 10 minutes can be represented as `now + 10 minutes`.

### Function signature

```ts
updateReviewState(params: {
  previous: ReviewState | null;
  isCorrect: boolean;
  now: Date;
}): ReviewState
```

### Tests

Write tests for:

- New question answered correctly.
- New question answered incorrectly.
- Repeated correct answers increase interval.
- Incorrect answer resets/shortens interval.
- Mastered state after enough correct answers.
- Due questions are returned only when `dueAt <= now`.

---

## Phase 6 — Stack Advisor engine

### Goal

Create deterministic, testable stack recommendations before using any live AI.

### MVP approach

Use rule-based scoring. Do not call an LLM yet.

Analyze the idea string for keywords and product traits:

- `ai`, `llm`, `chatbot`, `memory`, `embedding`
- `marketplace`
- `subscription`
- `mobile`
- `consumer`
- `b2b`
- `dashboard`
- `real-time`
- `video`
- `payments`
- `team`, `workspace`, `roles`
- `analytics`
- `file upload`

Return stack recommendations based on detected traits.

### Example traits

```ts
export type ProductTrait =
  | "ai_app"
  | "subscription"
  | "consumer"
  | "b2b"
  | "marketplace"
  | "dashboard"
  | "realtime"
  | "mobile_first"
  | "content_heavy"
  | "file_uploads"
  | "team_accounts";
```

### Default recommendation

For most first SaaS MVPs:

- Frontend: Next.js
- Deployment: Vercel
- Database: Supabase Postgres
- Auth: Clerk or Supabase Auth
- Payments: Stripe Checkout
- Analytics: PostHog
- Email: Resend
- Error monitoring: Sentry

### Recommendation output

```ts
recommendStack({ idea: string }): StackRecommendation
```

### Example CLI command

```bash
pnpm cli recommend-stack "AI study app that quizzes me on SaaS topics and remembers weak areas"
```

Expected output:

```txt
Recommended stack for: AI study app that quizzes me on SaaS topics and remembers weak areas

Frontend: Next.js
Why: Great default for a web-based learning SaaS with server-rendered pages and API routes.

Deployment: Vercel
Why: Fast path to deploy a Next.js app.

Database: Supabase Postgres
Why: Strong fit for users, lessons, quizzes, attempts, progress, and subscriptions.

Auth: Clerk or Supabase Auth
Why: Avoid custom auth for MVP.

Payments: Stripe Checkout
Why: Fastest path to paid subscriptions.

Analytics: PostHog
Why: Track activation, lesson completion, quiz attempts, retention, and feature usage.

Avoid for now:
- Custom auth
- Kubernetes
- Microservices
- Complex course marketplace
- Native mobile app

Suggested learning path:
1. SaaS Stack Foundations
2. Databases for SaaS
3. Payments and Subscriptions
4. Deployment and Hosting
5. Startup Launch Basics
```

### Tests

Write tests for:

- Subscription app recommends Stripe.
- AI app includes OpenAI/RAG lesson path.
- Mobile-first app warns web MVP first unless native features required.
- Marketplace app mentions payouts and higher complexity.
- Dashboard app recommends analytics.

---

## Phase 7 — Progress engine

### Goal

Track what the user has covered, missed, mastered, and should study next.

### Required functions

```ts
completeLesson(userId: string, lessonId: string): UserProgress
getCourseProgress(userId: string, courseId: string): CourseProgress
getBuilderReadinessScore(userId: string): BuilderReadinessScore
getDailyReview(userId: string, now: Date): DailyReview
getRecommendedNextLesson(userId: string): Lesson | null
```

### Builder readiness score

Compute from:

- completed lessons
- quiz accuracy
- number of mastered questions
- weak topic count
- stack advisor diagnostic completion

Example weights:

- 40% lesson completion
- 30% quiz accuracy
- 20% spaced repetition mastery
- 10% breadth across categories

Score categories:

- 0-20: Curious beginner
- 21-40: Learning the basics
- 41-60: MVP ready soon
- 61-80: Ready to ship
- 81-100: Dangerous builder

### Weak topic example

```ts
{
  topic: "payments",
  incorrectAttempts: 7,
  correctAttempts: 3,
  masteryScore: 0.3,
  suggestedLessonIds: ["lesson-stripe-checkout-vs-billing"]
}
```

---

## Phase 8 — CLI app

### Goal

Create a CLI that proves all core behavior before frontend.

### Commands

```bash
pnpm cli seed
pnpm cli reset
pnpm cli list-courses
pnpm cli show-course saas-stack-foundations
pnpm cli start-lesson lesson-saas-stack-overview
pnpm cli quiz lesson-saas-stack-overview
pnpm cli answer q-stripe-checkout-001 b
pnpm cli due
pnpm cli progress
pnpm cli recommend-stack "I want to build a subscription AI journaling app"
```

### CLI output should be readable

Use clear formatting.

Example:

```txt
Question 1/5
For a first SaaS MVP with simple monthly subscriptions, what is usually the fastest Stripe product to start with?

A. Build a custom billing system from scratch
B. Stripe Checkout
C. A manually emailed invoice workflow
D. Cryptocurrency payments only

Your answer: B

Correct.

Explanation:
Stripe Checkout is usually the fastest MVP path because it provides hosted payment UI and reduces PCI/payment complexity.

Sources:
- Stripe Checkout: https://docs.stripe.com/payments/checkout
```

### CLI local user

For MVP, use a default local user:

```ts
const DEFAULT_USER_ID = "local-user";
```

Do not build auth for CLI.

---

## Phase 9 — Local DB

### Goal

Use SQLite locally so progress persists between CLI sessions and frontend sessions.

### Tables

Create Drizzle schema for:

- users
- courses
- modules
- lessons
- sources
- lesson_sources
- quiz_questions
- quiz_choices
- question_sources
- review_states
- answer_attempts
- lesson_progress
- stack_recommendations
- stack_recommendation_choices

### Important

Seed content can live in TypeScript arrays first. The `seed` command writes it into SQLite.

This allows easy development and easy later migration to Supabase/Postgres.

---

## Phase 10 — Frontend UI design

### Goal

Build a beautiful learning app after CLI/core works.

### Design principles

The app should feel:

- Bright
- Addictive
- Playful
- Clean
- Founder-coded
- More serious than a children’s app, but still gamified
- Fast and phone-friendly

### Visual inspiration

Duolingo:

- Big cards
- Streaks
- XP/progress
- Friendly completion states
- Clear path map
- Encouraging quiz feedback

Quizlet:

- Flashcards
- Quiz/review mode
- Simple answer choices
- Repetition loop

YC/VC/startup aesthetic:

- Orange accent inspired by YC, but do not copy exact brand identity too closely.
- Clean white background.
- Black text.
- Founder/operator language.
- Source credibility strip.

### Suggested color palette

Use this custom palette, not official YC branding:

```txt
Background: #FFFDF8
Text: #111827
Muted text: #6B7280
Primary orange: #FF7A1A
Primary orange dark: #E85D04
Success green: #22C55E
Warning yellow: #FACC15
Error red: #EF4444
Card border: #E5E7EB
Card background: #FFFFFF
Soft orange background: #FFF3E8
```

### Typography

Use:

- Inter
- Geist
- or system font stack

Do not overcomplicate fonts.

### Layout

#### App shell

Desktop:

- Left sidebar navigation.
- Main content area.
- Right review/progress panel.

Mobile:

- Top header.
- Bottom tab navigation.
- Cards stacked vertically.

#### Main nav

- Home
- Stack Advisor
- Courses
- Review
- Progress
- Sources

---

## Key frontend pages

## 1. Landing page

### Purpose

Instantly explain the product and get the user into the Stack Advisor.

### Hero

```txt
Learn the stack. Ship the product.

SaaS School teaches you Vercel, Stripe, databases, auth, analytics, and startup fundamentals through short lessons, quizzes, and spaced repetition.
```

Primary CTA:

```txt
Get my SaaS learning path
```

Secondary CTA:

```txt
Browse courses
```

### Hero visual

Show a mock recommendation card:

```txt
Your idea: AI journaling app

Recommended MVP stack:
Next.js + Vercel
Supabase Postgres
Stripe Checkout
PostHog
Resend

Next lesson: Why Stripe Checkout beats custom billing for MVPs
```

### Credibility strip

Text badges/cards:

```txt
Source-backed by founder resources from:
[YC] [a16z] [Sequoia] [Stripe] [Vercel] [Supabase]
```

Again: source-backed means linked educational references, not affiliation.

---

## 2. Stack Advisor page

### Purpose

The product’s most important page.

### UX

Input box:

```txt
What are you building?
```

Placeholder examples:

```txt
A subscription AI journaling app that remembers my voice notes
A B2B dashboard for tracking sales calls
A marketplace for local fitness coaches
A habit app for college students
```

Button:

```txt
Build my learning path
```

### Result layout

Show:

- Recommended stack card.
- “Avoid for now” card.
- Learning path card.
- Diagnostic quiz CTA.

Example cards:

```txt
Frontend
Next.js
Best for fast SaaS MVPs with landing pages, dashboards, and API routes.

Database
Supabase Postgres
Best for relational app data like users, lessons, progress, subscriptions, and attempts.

Payments
Stripe Checkout
Best for getting paid quickly before building a custom billing experience.
```

### CTA after recommendation

```txt
Start your first lesson
```

---

## 3. Dashboard page

### Purpose

Daily home base.

Show:

- Builder readiness score.
- Current streak.
- Daily review count.
- Recommended next lesson.
- Weak topics.
- Current learning path.
- Recent quiz mistakes.

### Example dashboard

```txt
Builder Readiness: 42/100
Level: MVP ready soon

Today:
- 8 review questions due
- Next lesson: Stripe Checkout vs Billing
- Weak topic: Databases

Current path:
1. SaaS Stack Foundations — 80%
2. Payments and Subscriptions — 20%
3. Deployment and Hosting — 0%
```

---

## 4. Courses page

### Purpose

Browse all learning tracks.

Cards:

- SaaS Stack Foundations
- Deployment and Hosting
- Databases for SaaS
- Payments and Subscriptions
- Startup Launch Basics

Each card shows:

- Description
- Estimated time
- Progress
- Number of lessons
- Difficulty
- “Start” or “Continue” button

---

## 5. Course detail page

### Purpose

Show path map like Duolingo.

Visual path:

- Modules as sections.
- Lessons as circular nodes/cards.
- Completed lessons green/check.
- Current lesson orange/highlighted.
- Locked future lessons greyed lightly, but do not enforce too aggressively.

---

## 6. Lesson page

### Purpose

Teach one concept quickly.

Structure:

1. Lesson title.
2. 1-sentence summary.
3. Key idea.
4. Practical example.
5. When to use it.
6. When not to use it.
7. Common mistake.
8. Source links.
9. Start quiz button.

### Lesson style

Make lessons direct and practical.

Bad:

```txt
Payment processing refers to the complex mechanism by which businesses receive money...
```

Good:

```txt
For your first SaaS, do not build payment UI yourself. Use Stripe Checkout so you can start charging users today and worry about custom billing later.
```

---

## 7. Quiz page

### Purpose

Test immediately after lesson.

UI:

- One question at a time.
- 4 big answer buttons.
- Progress bar.
- Submit answer.
- Show feedback immediately.
- Explanation after answer.
- Source links below explanation.

Correct feedback:

```txt
Correct. You are thinking like a builder.
```

Wrong feedback:

```txt
Not quite. This one will come back in review.
```

Avoid shame. Keep it encouraging.

---

## 8. Review page

### Purpose

Spaced repetition loop.

Show:

```txt
8 questions due today
Mostly from: Payments, Databases, Deployment
```

Then quiz user one at a time.

After review:

```txt
Review complete.
You improved Payments mastery from 42% to 57%.
```

---

## 9. Sources page

### Purpose

Show credibility and help users go deeper.

Sections:

- Startup fundamentals
- VC/company-building frameworks
- Technical docs
- Payments
- Databases
- Deployment
- Analytics

Each source card:

- Publisher
- Title
- Why it matters
- Open link
- Lessons using this source

---

## Phase 11 — Frontend implementation plan

### Step 1

Build static pages with seed data from `packages/core`.

Pages:

- `/`
- `/advisor`
- `/dashboard`
- `/courses`
- `/courses/[courseId]`
- `/lesson/[lessonId]`
- `/quiz/[lessonId]`
- `/review`

### Step 2

Connect frontend to local API functions.

For MVP, use Next.js server actions or API routes that call core services.

Suggested API routes:

```txt
GET /api/courses
GET /api/courses/:courseId
GET /api/lessons/:lessonId
GET /api/quiz/:lessonId
POST /api/quiz/answer
GET /api/review/due
GET /api/progress
POST /api/advisor/recommend
```

### Step 3

Add local persistence.

Frontend and CLI should both use the same SQLite database while local.

### Step 4

Polish interactions.

- Loading states.
- Correct/wrong answer animations.
- Progress bars.
- Streak counter.
- Confetti on course completion.
- Source badges.

Use lightweight CSS transitions.

---

## Phase 12 — MVP acceptance criteria

The MVP is successful when the following works locally:

### CLI acceptance

- `pnpm install` works.
- `pnpm seed` creates local DB.
- `pnpm cli list-courses` lists seed courses.
- `pnpm cli recommend-stack "..."` returns a useful stack recommendation.
- `pnpm cli quiz <lessonId>` shows questions.
- `pnpm cli answer <questionId> <choiceId>` updates review state.
- `pnpm cli due` shows due review questions.
- `pnpm cli progress` shows builder readiness score.
- All tests pass.

### Frontend acceptance

- Landing page explains product clearly.
- Stack Advisor creates useful recommendation.
- Dashboard shows readiness score and next lesson.
- Courses page shows courses and progress.
- Lesson page displays lesson and source links.
- Quiz page accepts answers and shows feedback.
- Review page shows missed questions.
- Progress persists after page refresh.
- Mobile layout is usable.

### Product acceptance

Daley should be able to use it for 20 minutes and feel:

- “This is teaching me what I actually need.”
- “The stack recommendation is useful.”
- “The quiz loop makes me remember things.”
- “This could help other first-time SaaS builders.”

---

## Phase 13 — Deployment plan

Do this only after local MVP feels good.

### Production stack

- Frontend/backend: Next.js on Vercel
- Database: Supabase Postgres
- Auth: Clerk or Supabase Auth
- Payments: Stripe Checkout
- Analytics: PostHog
- Email: Resend
- Error tracking: Sentry

### Deployment steps

1. Create Supabase project.
2. Convert Drizzle SQLite schema to Postgres-compatible schema.
3. Run migrations against Supabase.
4. Create Vercel project.
5. Add environment variables to Vercel.
6. Add auth provider.
7. Add user accounts.
8. Add Stripe Checkout.
9. Add Stripe webhook endpoint.
10. Add subscription-gated premium features.
11. Add PostHog analytics.
12. Add Sentry.
13. Add production seed script for curriculum.
14. Add landing page SEO metadata.
15. Add privacy policy and terms pages.

### Environment variables

```txt
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
SENTRY_DSN=
RESEND_API_KEY=
```

---

## Phase 14 — Monetization plan

### Free tier

- 3 stack advisor recommendations.
- First course free.
- Limited daily review.
- Source library visible.

### Pro tier

Price: $12/month or $99/year.

Includes:

- Unlimited stack recommendations.
- Full course library.
- Spaced repetition.
- Builder readiness score.
- Personalized learning path.
- Review history.
- Launch checklist.

### Founder tier

Price: $29/month.

Includes:

- Everything in Pro.
- Project-specific launch roadmap.
- Custom stack plan.
- Weekly “what to learn next” report.
- Advanced startup modules.
- Investor/YC application prep modules later.

For MVP, do not implement payment gating until the learning loop is fun.

---

## Phase 15 — Analytics plan

Track these events:

```txt
landing_viewed
advisor_started
advisor_completed
learning_path_created
lesson_started
lesson_completed
quiz_started
quiz_answered
quiz_completed
review_started
review_completed
source_clicked
course_started
course_completed
pricing_viewed
checkout_started
subscription_created
```

Important product metrics:

- Advisor completion rate.
- Lesson start rate after advisor result.
- Quiz completion rate.
- Day 1 return rate.
- Day 7 return rate.
- Average review questions answered per session.
- Source click-through rate.
- % users who complete first course.

---

## Phase 16 — Content generation instructions for Codex

Codex should generate curriculum content with these rules:

1. Write original lesson text.
2. Keep lessons short and practical.
3. Avoid generic textbook explanations.
4. Always include “when to use” and “when not to use.”
5. Add at least 2 source links per lesson when relevant.
6. Add 3-5 quiz questions per lesson.
7. Each quiz question has exactly 4 choices.
8. Wrong choices should be plausible, not silly.
9. Explanations should teach the concept.
10. Do not copy source text verbatim.
11. Do not imply the app is affiliated with YC/a16z/Sequoia/etc.

### Lesson template

```md
# Lesson title

## The point

1-3 sentences explaining the core idea.

## Why builders care

Explain why this matters for shipping a SaaS product.

## Example

Give a concrete SaaS example.

## When to use this

- Practical condition 1
- Practical condition 2

## When not to use this

- Anti-pattern 1
- Anti-pattern 2

## Common mistake

Explain what beginners often get wrong.

## Sources

- Source title — publisher — URL
```

---

## Phase 17 — First exact local testing script

After implementation, run this flow:

```bash
pnpm install
pnpm test
pnpm seed
pnpm cli list-courses
pnpm cli recommend-stack "I want to build a subscription AI journaling app that remembers voice notes and sends daily insights"
pnpm cli show-course saas-stack-foundations
pnpm cli start-lesson lesson-saas-stack-overview
pnpm cli quiz lesson-saas-stack-overview
pnpm cli answer q-saas-stack-001 b
pnpm cli due
pnpm cli progress
pnpm dev
```

Then open:

```txt
http://localhost:3000
```

Manual UI test:

1. Open landing page.
2. Click “Get my SaaS learning path.”
3. Enter the AI journaling app idea.
4. Confirm recommendation looks useful.
5. Start first lesson.
6. Take quiz.
7. Miss one question intentionally.
8. Go to Review.
9. Confirm missed question appears.
10. Refresh browser.
11. Confirm progress persists.

---

## Phase 18 — Future AI features

Only add after deterministic MVP works.

### AI-generated custom lessons

Given a product idea, generate custom lessons:

- “Stripe for your exact app.”
- “Database schema for your exact app.”
- “Launch plan for your exact app.”

### AI tutor mode

A chat sidebar that can answer:

- “Why not Firebase?”
- “What is the difference between Stripe Checkout and Billing?”
- “What should I use for my app?”

Every AI answer should cite app sources.

### AI source curator

Given a topic, suggest source links and create draft lesson content, but require review before publishing.

---

## Phase 19 — Launch plan

### Pre-launch

Build in public:

- Post screenshots of Stack Advisor.
- Post daily “what I learned building SaaS School.”
- Share quiz cards.
- Share “wrong stack choices beginners make.”
- Share “what I would use to build X” threads.

### Launch channels

- X/Twitter
- Reddit: r/SaaS, r/Entrepreneur, r/SideProject, r/indiehackers, r/webdev
- Hacker News: Show HN
- Indie Hackers
- Product Hunt later
- Friends/classmates
- Startup Discords

### Launch hook examples

```txt
I built Duolingo for learning how to ship SaaS products.

Type what you are building and it gives you:
- recommended stack
- what not to use yet
- learning path
- quizzes
- spaced repetition

I made it because I kept seeing first-time builders get stuck choosing between Vercel, Stripe, Supabase, Firebase, Render, Railway, etc.
```

```txt
New builders do not need another 20-hour course.
They need to know what to use, when to use it, and what to avoid.

So I built SaaS School.
```

---

## Phase 20 — Build order for Codex

Follow this exact order:

1. Create monorepo.
2. Build core types.
3. Build seed source library.
4. Build seed courses/lessons/questions.
5. Build SQLite schema.
6. Build seed/reset commands.
7. Build quiz engine.
8. Build spaced repetition engine.
9. Build progress engine.
10. Build stack advisor engine.
11. Build CLI commands.
12. Write tests.
13. Run tests and fix failures.
14. Build Next.js frontend shell.
15. Build landing page.
16. Build Stack Advisor page.
17. Build Dashboard page.
18. Build Courses page.
19. Build Course detail page.
20. Build Lesson page.
21. Build Quiz page.
22. Build Review page.
23. Connect frontend to local backend/core.
24. Polish mobile layout.
25. Add source badges and disclaimer.
26. Run full local testing script.
27. Prepare deployment docs.

Do not skip backend/CLI verification. The product should work through CLI before frontend polish.

---

## Final MVP definition

The first shipped version is successful if a user can:

1. Describe what they are building.
2. Receive a useful SaaS stack recommendation.
3. Get a personalized learning path.
4. Complete a short lesson.
5. Take a quiz.
6. Miss questions and see them return later.
7. Track progress toward becoming ready to ship a paid SaaS.

The emotional goal:

> “This app makes me feel like I am becoming the kind of person who can actually build and launch internet products.”

