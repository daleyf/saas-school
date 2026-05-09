import type { Course, Lesson, Module, QuizQuestion } from "../types.js";

export const courses: Course[] = [
  {
    id: "course-saas-stack-foundations",
    slug: "saas-stack-foundations",
    title: "SaaS Stack Foundations",
    description: "Learn the default tools and decisions behind a practical SaaS MVP.",
    level: "beginner",
    estimatedMinutes: 45,
    moduleIds: ["module-saas-basics", "module-saas-mvp-stack"]
  }
];

export const modules: Module[] = [
  {
    id: "module-saas-basics",
    courseId: "course-saas-stack-foundations",
    title: "The SaaS basics",
    description: "Understand what a SaaS product needs before you choose tools.",
    order: 1,
    lessonIds: [
      "lesson-saas-stack-overview",
      "lesson-frontend-backend-database",
      "lesson-auth-payments-analytics"
    ]
  },
  {
    id: "module-saas-mvp-stack",
    courseId: "course-saas-stack-foundations",
    title: "The default MVP stack",
    description: "Use boring, proven tools so you can ship faster.",
    order: 2,
    lessonIds: ["lesson-default-mvp-stack", "lesson-avoid-overengineering"]
  }
];

export const lessons: Lesson[] = [
  {
    id: "lesson-saas-stack-overview",
    moduleId: "module-saas-basics",
    title: "What makes software SaaS?",
    summary: "A SaaS product is software users can access online, usually with accounts, saved data, and recurring value.",
    estimatedMinutes: 8,
    order: 1,
    keyTerms: [
      { term: "SaaS", definition: "Software delivered online instead of installed manually by each customer." },
      { term: "MVP", definition: "The smallest useful version that can test whether people want the product." }
    ],
    sourceIds: ["yc-startup-school", "yc-startup-library"],
    quizQuestionIds: ["q-saas-stack-001", "q-saas-stack-002", "q-saas-stack-003"],
    bodyMarkdown: `# What makes software SaaS?

## The point

SaaS means the product runs online and keeps providing value after the first visit. A real SaaS usually needs accounts, saved data, a way to charge, and a way to improve based on usage.

## Why builders care

This matters because the stack follows the business model. If users need to log in, save progress, subscribe, and return later, you need more than a landing page.

## Example

An AI journaling app becomes SaaS when users can create accounts, save entries, return to their history, and pay for premium features.

## When to use this

- You want users to keep coming back.
- You need saved customer data, billing, and ongoing product updates.

## When not to use this

- A static brochure site may not need SaaS infrastructure.
- A one-off script for yourself does not need auth, billing, or analytics.

## Common mistake

Beginners often start with the fanciest infrastructure instead of asking what the product must do for a first paying user.`
  },
  {
    id: "lesson-frontend-backend-database",
    moduleId: "module-saas-basics",
    title: "Frontend, backend, and database",
    summary: "The frontend is what users touch, the backend runs trusted logic, and the database remembers important state.",
    estimatedMinutes: 9,
    order: 2,
    keyTerms: [
      { term: "Frontend", definition: "The user-facing part of an app, usually pages and interactions in the browser." },
      { term: "Backend", definition: "Server-side code that handles trusted logic and connects systems." },
      { term: "Database", definition: "Persistent storage for product data." }
    ],
    sourceIds: ["vercel-docs", "postgres-docs", "supabase-docs"],
    quizQuestionIds: ["q-frontend-backend-001", "q-frontend-backend-002", "q-frontend-backend-003"],
    bodyMarkdown: `# Frontend, backend, and database

## The point

A SaaS app has different jobs. The frontend shows the experience, the backend performs trusted work, and the database stores what must survive a refresh.

## Why builders care

Clear boundaries prevent messy apps. Payment secrets do not belong in the browser. User progress does not belong only in memory.

## Example

In SaaS School, the frontend shows lessons, the backend records quiz answers, and the database stores review schedules.

## When to use this

- Put visual interaction in the frontend.
- Put secrets, billing, and protected writes in backend code.
- Put user state and business data in the database.

## When not to use this

- Do not create a separate backend service if your framework can handle simple server routes.
- Do not add multiple databases before you have real scale or data-model pressure.

## Common mistake

New builders sometimes treat the database as optional. If the app needs memory across sessions, persistence is part of the product.`
  },
  {
    id: "lesson-auth-payments-analytics",
    moduleId: "module-saas-basics",
    title: "Auth, payments, and analytics",
    summary: "Auth identifies users, payments capture value, and analytics show whether the product is working.",
    estimatedMinutes: 9,
    order: 3,
    keyTerms: [
      { term: "Auth", definition: "The system that signs users in and controls who can access what." },
      { term: "Checkout", definition: "A hosted payment flow that lets you collect payments without custom payment UI." },
      { term: "Product analytics", definition: "Events that show how people actually use your app." }
    ],
    sourceIds: ["clerk-docs", "stripe-checkout", "posthog-docs"],
    quizQuestionIds: ["q-auth-payments-001", "q-auth-payments-002", "q-auth-payments-003"],
    bodyMarkdown: `# Auth, payments, and analytics

## The point

Auth answers who the user is. Payments answer whether the business can charge. Analytics answer whether people are getting value.

## Why builders care

These three systems turn a demo into a product. They let you protect accounts, sell subscriptions, and see where users get stuck.

## Example

A lesson app can use Clerk for login, Stripe Checkout for subscriptions, and PostHog to track lesson completion.

## When to use this

- Use auth when users need private saved data.
- Use Stripe Checkout when you want paid plans without custom billing UI.
- Use analytics when you need to improve activation and retention.

## When not to use this

- Do not build custom auth for a normal MVP.
- Do not build custom billing screens before you validate payment demand.
- Do not track sensitive personal content as analytics events.

## Common mistake

Many builders add payments late because charging feels scary. For a SaaS, the ability to charge is part of the product test.`
  },
  {
    id: "lesson-default-mvp-stack",
    moduleId: "module-saas-mvp-stack",
    title: "The default MVP stack",
    summary: "Next.js, Vercel, Supabase Postgres, Stripe Checkout, and PostHog are a strong default for many first SaaS MVPs.",
    estimatedMinutes: 10,
    order: 4,
    keyTerms: [
      { term: "Default stack", definition: "A reliable starting set of tools that fits many common apps." },
      { term: "Hosted service", definition: "A product that runs infrastructure for you so you can focus on your app." }
    ],
    sourceIds: ["vercel-docs", "supabase-docs", "stripe-checkout", "posthog-docs"],
    quizQuestionIds: ["q-default-stack-001", "q-default-stack-002", "q-default-stack-003"],
    bodyMarkdown: `# The default MVP stack

## The point

For many first SaaS products, the best stack is boring: Next.js, Vercel, Supabase Postgres, Clerk or Supabase Auth, Stripe Checkout, PostHog, and Resend.

## Why builders care

This stack covers the normal MVP needs without forcing you to run servers, invent auth, or build payment infrastructure.

## Example

A B2B dashboard can use Next.js for pages, Supabase Postgres for customer data, Stripe Checkout for billing, and PostHog for activation metrics.

## When to use this

- You are building a web app with accounts, dashboards, payments, and saved data.
- You want to launch quickly and replace pieces later only when there is a real reason.

## When not to use this

- A native-first mobile app may need a mobile framework.
- A hard real-time game or video product may need a different backend path.

## Common mistake

Beginners sometimes choose tools because they are impressive. MVP tools should reduce decisions and help you talk to users faster.`
  },
  {
    id: "lesson-avoid-overengineering",
    moduleId: "module-saas-mvp-stack",
    title: "Why beginners overbuild",
    summary: "Overengineering feels productive, but it delays the only proof that matters: users getting value.",
    estimatedMinutes: 9,
    order: 5,
    keyTerms: [
      { term: "Overengineering", definition: "Adding complexity before the product has earned it." },
      { term: "Microservices", definition: "A system split into many independently deployed services, usually unnecessary for a small MVP." }
    ],
    sourceIds: ["yc-startup-school", "yc-startup-library"],
    quizQuestionIds: ["q-overengineering-001", "q-overengineering-002", "q-overengineering-003"],
    bodyMarkdown: `# Why beginners overbuild

## The point

Overengineering is when you solve scale, team, or architecture problems before you have customer problems.

## Why builders care

Every extra system creates more setup, debugging, and deployment work. The first goal is to learn whether users care.

## Example

You do not need Kubernetes, event streaming, a custom auth system, and five services to test a paid habit-tracking dashboard.

## When to use this

- Choose simple hosted tools when you are still validating demand.
- Add complexity when a real constraint appears.

## When not to use this

- Do not ignore security, backups, or payment correctness.
- Do not use simplicity as an excuse for fragile code.

## Common mistake

Architecture can become a way to avoid launch risk. A finished simple product teaches more than an unfinished perfect system.`
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q-saas-stack-001",
    lessonId: "lesson-saas-stack-overview",
    prompt: "What usually makes a product SaaS instead of just a static website?",
    choices: [
      { id: "a", text: "It uses a trendy JavaScript framework" },
      { id: "b", text: "Users can access it online, return to saved data, and get ongoing value" },
      { id: "c", text: "It has a colorful landing page" },
      { id: "d", text: "It avoids databases completely" }
    ],
    correctChoiceId: "b",
    explanation: "SaaS is about online delivery and ongoing product value. Accounts, saved data, and billing are common because users return over time.",
    sourceIds: ["yc-startup-school"],
    difficulty: "easy",
    topicTags: ["saas", "mvp", "startup"]
  },
  {
    id: "q-saas-stack-002",
    lessonId: "lesson-saas-stack-overview",
    prompt: "Why does the business model affect the technical stack?",
    choices: [
      { id: "a", text: "Because every SaaS must use microservices" },
      { id: "b", text: "Because user accounts, billing, saved data, and retention need supporting systems" },
      { id: "c", text: "Because backend code is always optional" },
      { id: "d", text: "Because startup products should avoid analytics" }
    ],
    correctChoiceId: "b",
    explanation: "A recurring software business needs systems that support identity, persistence, payment, and product improvement.",
    sourceIds: ["yc-startup-library"],
    difficulty: "easy",
    topicTags: ["saas", "stack", "startup"]
  },
  {
    id: "q-saas-stack-003",
    lessonId: "lesson-saas-stack-overview",
    prompt: "What is the best first question before choosing infrastructure?",
    choices: [
      { id: "a", text: "What must the product do for the first useful customer experience?" },
      { id: "b", text: "Which database is most popular on social media?" },
      { id: "c", text: "How can we prepare for millions of users before launching?" },
      { id: "d", text: "How many services can we split the app into?" }
    ],
    correctChoiceId: "a",
    explanation: "Tool decisions should serve the first useful product loop, not imagined scale.",
    sourceIds: ["yc-startup-school"],
    difficulty: "medium",
    topicTags: ["mvp", "stack", "overengineering"]
  },
  {
    id: "q-frontend-backend-001",
    lessonId: "lesson-frontend-backend-database",
    prompt: "Which part of a SaaS app should store user progress so it survives a refresh?",
    choices: [
      { id: "a", text: "Only browser memory" },
      { id: "b", text: "A database" },
      { id: "c", text: "A CSS file" },
      { id: "d", text: "The landing page headline" }
    ],
    correctChoiceId: "b",
    explanation: "Persistent user state belongs in a database or durable storage layer.",
    sourceIds: ["postgres-docs", "supabase-docs"],
    difficulty: "easy",
    topicTags: ["database", "persistence"]
  },
  {
    id: "q-frontend-backend-002",
    lessonId: "lesson-frontend-backend-database",
    prompt: "Where should payment secrets and protected billing logic run?",
    choices: [
      { id: "a", text: "In trusted backend/server-side code" },
      { id: "b", text: "In public browser JavaScript" },
      { id: "c", text: "Inside a README" },
      { id: "d", text: "Inside analytics event names" }
    ],
    correctChoiceId: "a",
    explanation: "Secrets and trusted writes must run server-side, where users cannot inspect or modify them.",
    sourceIds: ["stripe-checkout"],
    difficulty: "easy",
    topicTags: ["backend", "payments", "security"]
  },
  {
    id: "q-frontend-backend-003",
    lessonId: "lesson-frontend-backend-database",
    prompt: "What is a practical role for the frontend?",
    choices: [
      { id: "a", text: "Holding Stripe secret keys" },
      { id: "b", text: "Showing pages, forms, navigation, and interactions to the user" },
      { id: "c", text: "Replacing all persistent storage" },
      { id: "d", text: "Running private database migrations in every browser" }
    ],
    correctChoiceId: "b",
    explanation: "The frontend is the user-facing layer. It should call trusted backend paths for private or durable work.",
    sourceIds: ["vercel-docs"],
    difficulty: "easy",
    topicTags: ["frontend", "backend"]
  },
  {
    id: "q-auth-payments-001",
    lessonId: "lesson-auth-payments-analytics",
    prompt: "For a first SaaS MVP with simple monthly subscriptions, what is usually the fastest Stripe product to start with?",
    choices: [
      { id: "a", text: "Build a custom billing system from scratch" },
      { id: "b", text: "Stripe Checkout" },
      { id: "c", text: "A manually emailed invoice workflow only" },
      { id: "d", text: "Cryptocurrency payments only" }
    ],
    correctChoiceId: "b",
    explanation: "Stripe Checkout provides hosted payment UI, which reduces payment complexity for an MVP.",
    sourceIds: ["stripe-checkout"],
    difficulty: "easy",
    topicTags: ["payments", "stripe", "mvp"]
  },
  {
    id: "q-auth-payments-002",
    lessonId: "lesson-auth-payments-analytics",
    prompt: "When do you usually need authentication?",
    choices: [
      { id: "a", text: "When users need private saved data or account-specific access" },
      { id: "b", text: "Only after raising venture funding" },
      { id: "c", text: "Only for static marketing pages" },
      { id: "d", text: "Never, because cookies solve everything automatically" }
    ],
    correctChoiceId: "a",
    explanation: "Auth is needed when the app must know who a user is and protect their data or access.",
    sourceIds: ["clerk-docs", "supabase-docs"],
    difficulty: "easy",
    topicTags: ["auth", "security"]
  },
  {
    id: "q-auth-payments-003",
    lessonId: "lesson-auth-payments-analytics",
    prompt: "What is a good product analytics event for SaaS School?",
    choices: [
      { id: "a", text: "The user's full private journal entry" },
      { id: "b", text: "lesson_completed" },
      { id: "c", text: "A database password" },
      { id: "d", text: "The entire browser session recording by default" }
    ],
    correctChoiceId: "b",
    explanation: "A clean event like lesson_completed helps measure activation without storing sensitive user content.",
    sourceIds: ["posthog-docs"],
    difficulty: "medium",
    topicTags: ["analytics", "privacy"]
  },
  {
    id: "q-default-stack-001",
    lessonId: "lesson-default-mvp-stack",
    prompt: "Which stack is a strong default for many first web SaaS MVPs?",
    choices: [
      { id: "a", text: "Next.js, Vercel, Supabase Postgres, Stripe Checkout, PostHog" },
      { id: "b", text: "Kubernetes, five microservices, and custom auth on day one" },
      { id: "c", text: "A static HTML file with no persistence or billing" },
      { id: "d", text: "A custom database engine and custom payment processor" }
    ],
    correctChoiceId: "a",
    explanation: "This stack covers common MVP needs with hosted tools and a clear path to production.",
    sourceIds: ["vercel-docs", "supabase-docs", "stripe-checkout", "posthog-docs"],
    difficulty: "easy",
    topicTags: ["stack", "mvp", "deployment"]
  },
  {
    id: "q-default-stack-002",
    lessonId: "lesson-default-mvp-stack",
    prompt: "Why is Postgres often a good default database for SaaS?",
    choices: [
      { id: "a", text: "It is only useful for toy apps" },
      { id: "b", text: "It handles relational data like users, subscriptions, progress, and attempts well" },
      { id: "c", text: "It removes the need for schema design" },
      { id: "d", text: "It makes auth unnecessary" }
    ],
    correctChoiceId: "b",
    explanation: "Most SaaS products have relational data, and Postgres is a mature default for that shape.",
    sourceIds: ["postgres-docs", "supabase-docs"],
    difficulty: "easy",
    topicTags: ["database", "postgres", "stack"]
  },
  {
    id: "q-default-stack-003",
    lessonId: "lesson-default-mvp-stack",
    prompt: "When might the default web SaaS stack not be enough?",
    choices: [
      { id: "a", text: "When the product needs hard real-time video, native-only features, or unusual infrastructure requirements" },
      { id: "b", text: "Whenever the app has a login page" },
      { id: "c", text: "Whenever the founder wants to move fast" },
      { id: "d", text: "Whenever the app has a database" }
    ],
    correctChoiceId: "a",
    explanation: "The default stack is a starting point. Some products have special constraints that justify different choices.",
    sourceIds: ["vercel-docs"],
    difficulty: "medium",
    topicTags: ["stack", "tradeoffs"]
  },
  {
    id: "q-overengineering-001",
    lessonId: "lesson-avoid-overengineering",
    prompt: "What is overengineering in a first SaaS MVP?",
    choices: [
      { id: "a", text: "Adding complexity before the product has earned it" },
      { id: "b", text: "Writing tests for important business logic" },
      { id: "c", text: "Using hosted payment tools" },
      { id: "d", text: "Keeping the first version focused" }
    ],
    correctChoiceId: "a",
    explanation: "Overengineering solves future architecture problems before current customer problems are understood.",
    sourceIds: ["yc-startup-school"],
    difficulty: "easy",
    topicTags: ["overengineering", "mvp"]
  },
  {
    id: "q-overengineering-002",
    lessonId: "lesson-avoid-overengineering",
    prompt: "Which choice should most first-time SaaS builders avoid at the start?",
    choices: [
      { id: "a", text: "A single deployable app with hosted services" },
      { id: "b", text: "Kubernetes and multiple microservices before launch" },
      { id: "c", text: "A simple database schema" },
      { id: "d", text: "A hosted checkout flow" }
    ],
    correctChoiceId: "b",
    explanation: "Microservices and Kubernetes add operational weight that most MVPs do not need.",
    sourceIds: ["yc-startup-library"],
    difficulty: "easy",
    topicTags: ["overengineering", "deployment", "mvp"]
  },
  {
    id: "q-overengineering-003",
    lessonId: "lesson-avoid-overengineering",
    prompt: "What is the main risk of overbuilding the stack?",
    choices: [
      { id: "a", text: "It helps users too quickly" },
      { id: "b", text: "It delays learning whether users actually want the product" },
      { id: "c", text: "It makes the product impossible to deploy with any tool" },
      { id: "d", text: "It prevents you from writing any code" }
    ],
    correctChoiceId: "b",
    explanation: "The biggest early risk is not scale. It is building something people do not use or pay for.",
    sourceIds: ["yc-startup-school"],
    difficulty: "medium",
    topicTags: ["startup", "mvp", "overengineering"]
  }
];
