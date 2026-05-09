import type { Course, Lesson, Module, QuizQuestion } from "../types.js";

export const additionalCourses: Course[] = [
  {
    id: "course-deployment-hosting",
    slug: "deployment-and-hosting",
    title: "Deployment and Hosting",
    description: "Learn what happens when a SaaS app goes live and how to avoid common production mistakes.",
    level: "beginner",
    estimatedMinutes: 32,
    moduleIds: ["module-deployment-basics", "module-production-setup"]
  },
  {
    id: "course-databases-saas",
    slug: "databases-for-saas",
    title: "Databases for SaaS",
    description: "Model users, subscriptions, progress, and app data with a practical relational mindset.",
    level: "beginner",
    estimatedMinutes: 35,
    moduleIds: ["module-database-basics", "module-postgres-supabase"]
  },
  {
    id: "course-payments-subscriptions",
    slug: "payments-and-subscriptions",
    title: "Payments and Subscriptions",
    description: "Use Stripe safely for checkout, billing state, webhooks, and subscription access.",
    level: "beginner",
    estimatedMinutes: 34,
    moduleIds: ["module-payment-basics", "module-subscription-ops"]
  },
  {
    id: "course-startup-launch-basics",
    slug: "startup-launch-basics",
    title: "Startup Launch Basics",
    description: "Plan an MVP, talk to users, price the first version, and learn from early traction.",
    level: "beginner",
    estimatedMinutes: 36,
    moduleIds: ["module-mvp-discovery", "module-launch-learning"]
  }
];

export const additionalModules: Module[] = [
  {
    id: "module-deployment-basics",
    courseId: "course-deployment-hosting",
    title: "Deployment basics",
    description: "Understand deploys, hosts, and environment-specific settings.",
    order: 1,
    lessonIds: ["lesson-what-deployment-means", "lesson-vercel-render-railway"]
  },
  {
    id: "module-production-setup",
    courseId: "course-deployment-hosting",
    title: "Production setup",
    description: "Prepare secrets, domains, and a basic release checklist.",
    order: 2,
    lessonIds: ["lesson-env-vars-secrets", "lesson-domains-production-checklist"]
  },
  {
    id: "module-database-basics",
    courseId: "course-databases-saas",
    title: "Database basics",
    description: "Learn why apps need durable data and why Postgres is a strong SaaS default.",
    order: 1,
    lessonIds: ["lesson-why-apps-need-databases", "lesson-sql-vs-nosql-postgres"]
  },
  {
    id: "module-postgres-supabase",
    courseId: "course-databases-saas",
    title: "Postgres and Supabase",
    description: "Model SaaS data, use migrations, and avoid leaking rows.",
    order: 2,
    lessonIds: ["lesson-modeling-saas-data", "lesson-migrations-rls"]
  },
  {
    id: "module-payment-basics",
    courseId: "course-payments-subscriptions",
    title: "Payment basics",
    description: "Choose the fastest safe payment path for a first paid product.",
    order: 1,
    lessonIds: ["lesson-why-payments-are-hard", "lesson-stripe-checkout-vs-billing"]
  },
  {
    id: "module-subscription-ops",
    courseId: "course-payments-subscriptions",
    title: "Subscription operations",
    description: "Keep app access in sync with billing events.",
    order: 2,
    lessonIds: ["lesson-webhooks-subscription-state", "lesson-pricing-tiers"]
  },
  {
    id: "module-mvp-discovery",
    courseId: "course-startup-launch-basics",
    title: "MVP discovery",
    description: "Find the smallest launchable product and learn from real users.",
    order: 1,
    lessonIds: ["lesson-plan-an-mvp", "lesson-talk-to-users"]
  },
  {
    id: "module-launch-learning",
    courseId: "course-startup-launch-basics",
    title: "Launch learning",
    description: "Price, launch, measure retention, and iterate.",
    order: 2,
    lessonIds: ["lesson-landing-pages-pricing", "lesson-launch-measure-iterate"]
  }
];

export const additionalLessons: Lesson[] = [
  lesson({
    id: "lesson-what-deployment-means",
    moduleId: "module-deployment-basics",
    title: "What deployment means",
    summary: "Deployment turns local code into a URL real users can reach.",
    sourceIds: ["vercel-docs"],
    quizQuestionIds: ["q-deploy-001", "q-deploy-002"],
    minutes: 8,
    order: 1,
    terms: [
      ["Deploy", "The act of publishing an app version to a live environment."],
      ["Production", "The environment real users depend on."]
    ],
    point: "Deployment is the handoff from your laptop to a reliable online environment.",
    why: "A SaaS product cannot teach, charge, or retain users if nobody can reach it.",
    example: "A Next.js app on Vercel becomes usable when the latest commit builds and receives a public URL.",
    use: ["Use a hosted platform for early deployments.", "Deploy small changes often so bugs are easier to isolate."],
    avoid: ["Do not treat a local demo as launched.", "Do not deploy secrets or test-only data to production."],
    mistake: "Beginners often wait too long to deploy, then discover environment bugs right before launch."
  }),
  lesson({
    id: "lesson-vercel-render-railway",
    moduleId: "module-deployment-basics",
    title: "Vercel vs Render vs Railway",
    summary: "Different hosts fit different app shapes; choose the one that reduces your current bottleneck.",
    sourceIds: ["vercel-docs"],
    quizQuestionIds: ["q-hosting-001", "q-hosting-002"],
    minutes: 8,
    order: 2,
    terms: [
      ["Frontend host", "A platform optimized for serving pages and web app assets."],
      ["Long-running service", "A server process that stays alive continuously."]
    ],
    point: "Vercel is a strong default for Next.js apps, while Render/Railway can be useful for long-running services.",
    why: "The wrong host creates deployment work that distracts from product learning.",
    example: "A dashboard can start on Vercel. A background worker that runs all day may fit a different host.",
    use: ["Use Vercel for a Next.js MVP with pages and server routes.", "Consider other hosts for always-on workers or custom servers."],
    avoid: ["Do not pick infrastructure because it sounds advanced.", "Do not split hosting before the app needs it."],
    mistake: "New builders often compare hosts abstractly instead of matching host behavior to product behavior."
  }),
  lesson({
    id: "lesson-env-vars-secrets",
    moduleId: "module-production-setup",
    title: "Environment variables and secrets",
    summary: "Environment variables keep production settings and secrets out of source code.",
    sourceIds: ["vercel-env-vars"],
    quizQuestionIds: ["q-env-001", "q-env-002"],
    minutes: 8,
    order: 3,
    terms: [
      ["Environment variable", "A setting provided by the runtime instead of hardcoded in the app."],
      ["Secret", "A private value such as an API key or webhook signing secret."]
    ],
    point: "Your app should read secrets from the environment, never from committed source files.",
    why: "Leaked secrets can let other people access your database, payment account, or customer data.",
    example: "A Stripe secret key belongs in the deployment platform settings, not inside a React component.",
    use: ["Use env vars for database URLs, API keys, and webhook secrets.", "Separate local, preview, and production values."],
    avoid: ["Do not prefix private secrets with public client-side names.", "Do not paste real keys into screenshots or examples."],
    mistake: "A common mistake is exposing server-only keys to the browser."
  }),
  lesson({
    id: "lesson-domains-production-checklist",
    moduleId: "module-production-setup",
    title: "Domains and production checklist",
    summary: "A launch-ready SaaS needs a domain, working env vars, basic monitoring, and tested critical flows.",
    sourceIds: ["vercel-docs"],
    quizQuestionIds: ["q-domain-001", "q-domain-002"],
    minutes: 8,
    order: 4,
    terms: [
      ["DNS", "The system that points a domain name to the right service."],
      ["Smoke test", "A quick check that critical flows work after deployment."]
    ],
    point: "Production readiness is a short checklist, not a vague feeling.",
    why: "Users do not care that the code works locally if login, checkout, or the domain breaks live.",
    example: "Before launch, sign up, complete checkout in test mode, load the dashboard, and verify events are tracked.",
    use: ["Use a custom domain when sharing with real users.", "Smoke test every deploy that touches auth, payments, or data."],
    avoid: ["Do not launch without testing the exact production URL.", "Do not change DNS right before an important demo without time to verify."],
    mistake: "Many first launches fail on small setup details rather than product code."
  }),
  lesson({
    id: "lesson-why-apps-need-databases",
    moduleId: "module-database-basics",
    title: "Why apps need databases",
    summary: "A database is the app's memory for users, subscriptions, attempts, settings, and product state.",
    sourceIds: ["postgres-docs", "supabase-docs"],
    quizQuestionIds: ["q-db-need-001", "q-db-need-002"],
    minutes: 8,
    order: 1,
    terms: [
      ["Persistence", "Data surviving page refreshes, restarts, and future sessions."],
      ["Record", "One stored item, such as a user or quiz attempt."]
    ],
    point: "If the product needs to remember something, that data needs durable storage.",
    why: "SaaS products are usually valuable because they remember user-specific state over time.",
    example: "SaaS School stores lesson progress and review schedules so the user can return tomorrow.",
    use: ["Use a database for user-owned data and business records.", "Start simple and model the data you actually need."],
    avoid: ["Do not store important state only in browser memory.", "Do not add a database for content that could be static at first."],
    mistake: "Beginners often postpone persistence and then rebuild core flows later."
  }),
  lesson({
    id: "lesson-sql-vs-nosql-postgres",
    moduleId: "module-database-basics",
    title: "SQL, NoSQL, and why Postgres is common",
    summary: "Postgres is a strong default because SaaS data usually has relationships and consistency needs.",
    sourceIds: ["postgres-docs"],
    quizQuestionIds: ["q-postgres-001", "q-postgres-002"],
    minutes: 9,
    order: 2,
    terms: [
      ["SQL", "A language and model for relational data."],
      ["Relation", "A connection between records, such as users and subscriptions."]
    ],
    point: "Most SaaS data is relational before it is massive.",
    why: "Users, teams, subscriptions, projects, and attempts all connect to each other.",
    example: "A user has many lesson attempts, and each attempt belongs to one question.",
    use: ["Use Postgres when records relate to each other.", "Use SQL when correctness and querying matter."],
    avoid: ["Do not choose NoSQL just because it feels simpler.", "Do not over-normalize before you understand the workflow."],
    mistake: "The common mistake is optimizing for theoretical scale before modeling real product actions."
  }),
  lesson({
    id: "lesson-modeling-saas-data",
    moduleId: "module-postgres-supabase",
    title: "Modeling SaaS data",
    summary: "Good schema design starts with product nouns and the actions users take with them.",
    sourceIds: ["postgres-docs", "supabase-docs"],
    quizQuestionIds: ["q-modeling-001", "q-modeling-002"],
    minutes: 9,
    order: 3,
    terms: [
      ["Schema", "The structure of database tables, columns, and relationships."],
      ["Foreign key", "A column that links one table to another table's record."]
    ],
    point: "Model the product workflow, not an abstract perfect database.",
    why: "A clear schema makes features easier to ship and bugs easier to reason about.",
    example: "A learning app can use users, lessons, questions, attempts, and review_states.",
    use: ["Create tables around stable product concepts.", "Use IDs to connect related records."],
    avoid: ["Do not put unrelated data into one giant JSON blob.", "Do not create tables for features you have not started."],
    mistake: "Beginners often skip relationships, then struggle to answer simple product questions later."
  }),
  lesson({
    id: "lesson-migrations-rls",
    moduleId: "module-postgres-supabase",
    title: "Migrations and row-level security",
    summary: "Migrations change schema safely, while RLS helps protect user rows in hosted Postgres.",
    sourceIds: ["supabase-docs", "supabase-rls"],
    quizQuestionIds: ["q-migrations-001", "q-rls-001"],
    minutes: 9,
    order: 4,
    terms: [
      ["Migration", "A versioned database schema change."],
      ["RLS", "Row-level security policies that decide which rows a user can access."]
    ],
    point: "Production data needs deliberate schema changes and access rules.",
    why: "A broken migration or missing policy can take down the app or expose customer data.",
    example: "When adding teams, write a migration and policies so members only see their team rows.",
    use: ["Use migrations for schema changes after launch.", "Use RLS when browser clients can query Supabase directly."],
    avoid: ["Do not edit production tables manually without a plan.", "Do not assume app UI alone protects data."],
    mistake: "A frequent mistake is testing only happy-path UI while database permissions are too open."
  }),
  lesson({
    id: "lesson-why-payments-are-hard",
    moduleId: "module-payment-basics",
    title: "Why payments are hard",
    summary: "Payments involve money, failures, fraud, taxes, refunds, and state changes outside your app.",
    sourceIds: ["stripe-checkout", "stripe-billing"],
    quizQuestionIds: ["q-payments-hard-001", "q-payments-hard-002"],
    minutes: 8,
    order: 1,
    terms: [
      ["Payment processor", "A service that handles payment collection and payment-method complexity."],
      ["Billing state", "The subscription or payment status your app uses to grant access."]
    ],
    point: "Payments are not just a button. They are an operational system.",
    why: "Incorrect payment handling can block users, lose revenue, or grant access after cancellation.",
    example: "A failed renewal should change access only after Stripe sends the relevant billing event.",
    use: ["Use Stripe-hosted flows first.", "Store the minimum billing state your app needs for access decisions."],
    avoid: ["Do not build card forms or billing engines yourself for an MVP.", "Do not trust only the client redirect after checkout."],
    mistake: "Beginners often think successful checkout is the whole payment system."
  }),
  lesson({
    id: "lesson-stripe-checkout-vs-billing",
    moduleId: "module-payment-basics",
    title: "Stripe Checkout vs Billing",
    summary: "Checkout is the hosted payment page; Billing manages subscription lifecycle behind the scenes.",
    sourceIds: ["stripe-checkout", "stripe-billing"],
    quizQuestionIds: ["q-checkout-billing-001", "q-checkout-billing-002"],
    minutes: 8,
    order: 2,
    terms: [
      ["Checkout", "Stripe's hosted page for collecting payment details."],
      ["Billing", "Stripe's subscription, invoice, and recurring payment system."]
    ],
    point: "Use Checkout to get users through payment quickly, and Billing to manage recurring subscription state.",
    why: "This split lets you charge users without building custom payment UI.",
    example: "A Pro plan button creates a Checkout session for a recurring price.",
    use: ["Use Checkout for the first paid subscription flow.", "Use Billing data to understand renewals and cancellations."],
    avoid: ["Do not start with a custom billing portal.", "Do not assume a pricing page alone creates subscriptions."],
    mistake: "The mistake is treating Checkout, Billing, and app access as one undifferentiated feature."
  }),
  lesson({
    id: "lesson-webhooks-subscription-state",
    moduleId: "module-subscription-ops",
    title: "Webhooks and subscription state",
    summary: "Webhooks tell your app when Stripe state changes after checkout, renewal, failure, or cancellation.",
    sourceIds: ["stripe-webhooks", "stripe-billing"],
    quizQuestionIds: ["q-webhooks-001", "q-webhooks-002"],
    minutes: 9,
    order: 3,
    terms: [
      ["Webhook", "A server endpoint that receives events from another service."],
      ["Idempotency", "Handling repeated events without creating duplicate side effects."]
    ],
    point: "Your app should update billing access from trusted Stripe events, not just browser redirects.",
    why: "Subscription status can change when the user is not in your app.",
    example: "If a renewal fails overnight, a webhook can mark the subscription past_due before the user logs in.",
    use: ["Use webhooks for subscription created, updated, canceled, and payment failed events.", "Verify webhook signatures."],
    avoid: ["Do not rely only on success_url.", "Do not process the same event twice without checks."],
    mistake: "A common mistake is granting lifetime access after one successful checkout redirect."
  }),
  lesson({
    id: "lesson-pricing-tiers",
    moduleId: "module-subscription-ops",
    title: "Pricing tiers for an MVP",
    summary: "Simple pricing makes it easier to test whether users value the product enough to pay.",
    sourceIds: ["yc-startup-library", "stripe-billing"],
    quizQuestionIds: ["q-pricing-001", "q-pricing-002"],
    minutes: 9,
    order: 4,
    terms: [
      ["Tier", "A packaged level of product access at a specific price."],
      ["Willingness to pay", "Evidence that users value the product enough to spend money."]
    ],
    point: "Start with pricing that is easy to understand and easy to implement.",
    why: "Complex pricing can hide the real question: will anyone pay for this product?",
    example: "SaaS School can start with Free and Pro before adding a Founder tier.",
    use: ["Use one paid tier when learning demand.", "Add tiers when distinct customer segments ask for different value."],
    avoid: ["Do not create five plans before your first paying user.", "Do not gate the core value so hard that users cannot evaluate it."],
    mistake: "Beginners often spend more time designing pricing tables than testing a paid offer."
  }),
  lesson({
    id: "lesson-plan-an-mvp",
    moduleId: "module-mvp-discovery",
    title: "How to plan an MVP",
    summary: "An MVP is the smallest product loop that can prove a real user gets value.",
    sourceIds: ["yc-startup-school", "yc-startup-library"],
    quizQuestionIds: ["q-mvp-plan-001", "q-mvp-plan-002"],
    minutes: 9,
    order: 1,
    terms: [
      ["Product loop", "The repeated path where a user discovers, uses, and returns to the product."],
      ["Scope", "The set of features included in a version."]
    ],
    point: "A good MVP is not tiny because you are lazy. It is tiny because you need faster evidence.",
    why: "Shipping smaller lets you learn before your assumptions get expensive.",
    example: "For an AI journaling app, the MVP might be sign up, write entries, get one useful weekly insight, and pay.",
    use: ["Choose the smallest loop that creates value.", "Cut features that do not test the core promise."],
    avoid: ["Do not confuse a landing page with a working product if the value requires use.", "Do not build admin tooling before user value works."],
    mistake: "The mistake is defining MVP as every feature you can imagine, only less polished."
  }),
  lesson({
    id: "lesson-talk-to-users",
    moduleId: "module-mvp-discovery",
    title: "Talking to users",
    summary: "User conversations reveal pain, workflow, language, and buying triggers before analytics exists.",
    sourceIds: ["yc-startup-school", "yc-startup-library"],
    quizQuestionIds: ["q-users-001", "q-users-002"],
    minutes: 9,
    order: 2,
    terms: [
      ["Discovery", "Learning about the user's real problem before or during product building."],
      ["Buying trigger", "The situation that makes a user actively look for a solution."]
    ],
    point: "Talk about their current behavior, not your imagined feature list.",
    why: "People are polite about ideas, but their past behavior shows what matters.",
    example: "Ask how they currently track SaaS learning, where they get stuck, and what they tried last week.",
    use: ["Ask about recent examples.", "Listen for repeated pain and language you can use in the product."],
    avoid: ["Do not ask leading questions that fish for compliments.", "Do not treat one enthusiastic friend as proof of demand."],
    mistake: "Beginners often pitch instead of learning."
  }),
  lesson({
    id: "lesson-landing-pages-pricing",
    moduleId: "module-launch-learning",
    title: "Landing pages and pricing",
    summary: "A landing page should make the offer clear and route the right users into the product.",
    sourceIds: ["yc-startup-library", "a16z-metrics"],
    quizQuestionIds: ["q-landing-001", "q-landing-002"],
    minutes: 9,
    order: 3,
    terms: [
      ["Offer", "The promise a user understands and can act on."],
      ["Conversion", "A user taking the intended next step."]
    ],
    point: "Your landing page is not decoration. It is a test of whether users understand the value.",
    why: "Clear positioning improves signups and shows which users care enough to continue.",
    example: "Learn the stack. Ship the product. is clearer than a vague promise about becoming innovative.",
    use: ["State the user, problem, outcome, and next action.", "Show pricing once the user can judge the value."],
    avoid: ["Do not hide the actual product behind generic startup language.", "Do not add a complex pricing grid before the offer is clear."],
    mistake: "A common mistake is writing for other founders instead of the target user."
  }),
  lesson({
    id: "lesson-launch-measure-iterate",
    moduleId: "module-launch-learning",
    title: "Launch, measure, and iterate",
    summary: "A launch is the start of learning, not the finish line.",
    sourceIds: ["sequoia-pmf-framework", "posthog-docs"],
    quizQuestionIds: ["q-launch-001", "q-launch-002"],
    minutes: 9,
    order: 4,
    terms: [
      ["Retention", "Whether users keep coming back after the first session."],
      ["Iteration", "Improving the product based on evidence from users and usage."]
    ],
    point: "After launch, measure whether users activate, return, and pay.",
    why: "Traffic without retention is a warning that the product is not yet delivering enough value.",
    example: "For SaaS School, useful metrics include advisor completion, lesson start, quiz completion, and day 7 return.",
    use: ["Track a few events tied to the core loop.", "Talk to users who drop off and users who return."],
    avoid: ["Do not chase vanity metrics alone.", "Do not rebuild everything after one bad launch day."],
    mistake: "Beginners often interpret silence as failure instead of asking what the data and users are saying."
  })
];

export const additionalQuizQuestions: QuizQuestion[] = [
  q("q-deploy-001", "lesson-what-deployment-means", "What does deployment do?", "b", ["It rewrites your app in a new language", "It publishes a version of your app to an environment users can reach", "It replaces product validation", "It removes the need for testing"], "Deployment makes an app available outside your local machine.", ["deployment", "hosting"], ["vercel-docs"]),
  q("q-deploy-002", "lesson-what-deployment-means", "Why should MVP builders deploy early?", "a", ["Environment bugs appear sooner and are easier to fix", "It guarantees product-market fit", "It removes the need for a database", "It makes payments free"], "Early deploys expose production differences before launch pressure is high.", ["deployment", "mvp"], ["vercel-docs"]),
  q("q-hosting-001", "lesson-vercel-render-railway", "When is Vercel usually a strong default?", "a", ["A Next.js web app with pages and server routes", "A custom database engine", "A native-only iOS app", "A Kubernetes cluster"], "Vercel is optimized for frontend apps and frameworks like Next.js.", ["deployment", "vercel"], ["vercel-docs"]),
  q("q-hosting-002", "lesson-vercel-render-railway", "What should guide hosting choice?", "c", ["Which host has the coolest dashboard", "Which host sounds most enterprise", "The app's actual runtime needs", "The number of logos on the homepage"], "Choose hosting based on product behavior such as serverless pages, long-running processes, or workers.", ["deployment", "tradeoffs"], ["vercel-docs"]),
  q("q-env-001", "lesson-env-vars-secrets", "Where should a Stripe secret key live?", "b", ["Inside client-side React code", "In server-side environment variables", "In a public screenshot", "In a CSS file"], "Private keys should be provided to trusted server runtime code through environment variables.", ["secrets", "payments"], ["vercel-env-vars"]),
  q("q-env-002", "lesson-env-vars-secrets", "What is a common environment variable mistake?", "d", ["Using different values locally and in production", "Documenting required variables", "Rotating leaked secrets", "Exposing server-only secrets to the browser"], "Server-only secrets must not be bundled into public client code.", ["secrets", "security"], ["vercel-env-vars"]),
  q("q-domain-001", "lesson-domains-production-checklist", "What does DNS help with?", "a", ["Pointing a domain name to the right service", "Writing database migrations", "Charging subscriptions", "Generating quiz choices"], "DNS connects human-friendly domains to hosting infrastructure.", ["deployment", "dns"], ["vercel-docs"]),
  q("q-domain-002", "lesson-domains-production-checklist", "What is a smoke test?", "c", ["A redesign of every screen", "A full legal audit", "A quick check of critical flows after deployment", "A replacement for monitoring"], "Smoke tests quickly verify that important production flows still work.", ["deployment", "production"], ["vercel-docs"]),
  q("q-db-need-001", "lesson-why-apps-need-databases", "Why does a SaaS app usually need a database?", "b", ["To make buttons orange", "To remember durable user and business data", "To avoid writing backend code", "To replace all tests"], "SaaS value often depends on saved state that survives sessions.", ["database", "persistence"], ["postgres-docs"]),
  q("q-db-need-002", "lesson-why-apps-need-databases", "Which data belongs in durable storage?", "a", ["Lesson progress and review schedules", "Only a hover color", "A temporary loading spinner", "A local console log"], "Progress and review schedules must persist so users can return later.", ["database", "progress"], ["supabase-docs"]),
  q("q-postgres-001", "lesson-sql-vs-nosql-postgres", "Why is Postgres a common SaaS default?", "c", ["It makes schemas unnecessary", "It only works for static sites", "It handles relational app data well", "It prevents all bugs"], "Postgres is strong for structured relationships like users, teams, subscriptions, and attempts.", ["database", "postgres"], ["postgres-docs"]),
  q("q-postgres-002", "lesson-sql-vs-nosql-postgres", "What is a relation in SaaS data?", "a", ["A connection such as users having many attempts", "A marketing tagline", "A CSS breakpoint", "A payment receipt PDF"], "Relational data connects records in meaningful product ways.", ["database", "schema"], ["postgres-docs"]),
  q("q-modeling-001", "lesson-modeling-saas-data", "What should schema design start from?", "b", ["The largest possible future company", "Product nouns and user actions", "Random JSON blobs", "The color palette"], "Good schemas reflect the actual product workflow.", ["database", "schema"], ["postgres-docs"]),
  q("q-modeling-002", "lesson-modeling-saas-data", "What does a foreign key do?", "c", ["Stores CSS", "Creates a Stripe price", "Links one table's record to another", "Publishes a domain"], "Foreign keys express relationships between records.", ["database", "schema"], ["postgres-docs"]),
  q("q-migrations-001", "lesson-migrations-rls", "What is a migration?", "a", ["A versioned database schema change", "A marketing launch", "A payment method", "A frontend route"], "Migrations make schema changes repeatable and reviewable.", ["database", "migrations"], ["supabase-docs"]),
  q("q-rls-001", "lesson-migrations-rls", "What does row-level security help protect?", "d", ["Button hover states", "Email subject lines", "Public marketing copy", "Which database rows a user can access"], "RLS policies control row access in the database.", ["database", "security"], ["supabase-rls"]),
  q("q-payments-hard-001", "lesson-why-payments-are-hard", "Why are payments more than a button?", "b", ["Because buttons cannot be orange", "Because money, failures, refunds, and billing state must be handled", "Because every app needs crypto", "Because frontend code should hold card data"], "Payments include operational state and edge cases outside the UI.", ["payments", "billing"], ["stripe-billing"]),
  q("q-payments-hard-002", "lesson-why-payments-are-hard", "What should an MVP avoid?", "c", ["Stripe-hosted checkout", "Minimal billing state", "A custom billing engine", "Server-side payment logic"], "Custom billing adds risk and work before demand is validated.", ["payments", "mvp"], ["stripe-checkout"]),
  q("q-checkout-billing-001", "lesson-stripe-checkout-vs-billing", "What is Stripe Checkout?", "a", ["A hosted payment page", "A database migration tool", "An analytics platform", "A DNS provider"], "Checkout is Stripe's hosted flow for collecting payment details.", ["payments", "stripe"], ["stripe-checkout"]),
  q("q-checkout-billing-002", "lesson-stripe-checkout-vs-billing", "What does Stripe Billing mainly manage?", "d", ["CSS classes", "Lesson markdown", "DNS records", "Subscriptions, invoices, and recurring payment lifecycle"], "Billing handles recurring subscription operations.", ["payments", "billing"], ["stripe-billing"]),
  q("q-webhooks-001", "lesson-webhooks-subscription-state", "Why do SaaS apps use Stripe webhooks?", "b", ["To style checkout buttons", "To receive trusted billing events after state changes", "To replace user interviews", "To host the frontend"], "Webhooks keep your app informed when subscription state changes.", ["payments", "webhooks"], ["stripe-webhooks"]),
  q("q-webhooks-002", "lesson-webhooks-subscription-state", "What is risky about relying only on success_url?", "a", ["It misses later billing changes like cancellations or failed renewals", "It makes the page too fast", "It prevents server code", "It deletes all products"], "Subscription state changes after checkout and must be tracked server-side.", ["payments", "subscriptions"], ["stripe-webhooks"]),
  q("q-pricing-001", "lesson-pricing-tiers", "Why start with simple pricing?", "c", ["To avoid ever charging", "To hide the product", "To test willingness to pay clearly", "To make implementation impossible"], "Simple pricing makes demand easier to interpret.", ["pricing", "startup"], ["yc-startup-library"]),
  q("q-pricing-002", "lesson-pricing-tiers", "When should you add more tiers?", "b", ["Before writing the product", "When distinct customer segments need different value", "When nobody understands the offer", "When checkout is broken"], "Pricing tiers should map to meaningful customer differences.", ["pricing", "subscriptions"], ["stripe-billing"]),
  q("q-mvp-plan-001", "lesson-plan-an-mvp", "What is a good MVP?", "a", ["The smallest product loop that can prove user value", "Every imagined feature with less polish", "A logo and no product", "A production Kubernetes setup"], "A useful MVP tests the core value loop quickly.", ["mvp", "startup"], ["yc-startup-school"]),
  q("q-mvp-plan-002", "lesson-plan-an-mvp", "What should you cut from MVP scope?", "d", ["The core user value", "The ability to test demand", "The main workflow", "Features that do not test the core promise"], "MVP scope should protect the core promise and cut distractions.", ["mvp", "scope"], ["yc-startup-library"]),
  q("q-users-001", "lesson-talk-to-users", "What should user interviews focus on?", "c", ["Fishing for compliments", "A long feature pitch", "Recent behavior and real pain", "Only your preferred solution"], "Past behavior is more useful than polite opinions.", ["users", "discovery"], ["yc-startup-school"]),
  q("q-users-002", "lesson-talk-to-users", "What is a buying trigger?", "a", ["A situation that makes someone actively look for a solution", "A CSS animation", "A database table name", "A random launch date"], "Buying triggers explain why a user cares now.", ["users", "sales"], ["yc-startup-library"]),
  q("q-landing-001", "lesson-landing-pages-pricing", "What should a landing page make clear?", "b", ["Every internal implementation detail", "The user, problem, outcome, and next action", "Only the founder's biography", "The entire database schema"], "A landing page should make the offer understandable and actionable.", ["landing", "conversion"], ["yc-startup-library"]),
  q("q-landing-002", "lesson-landing-pages-pricing", "What is conversion?", "d", ["A backend framework", "A billing webhook", "A database relation", "A user taking the intended next step"], "Conversion measures whether visitors take the action the page is designed for.", ["landing", "metrics"], ["a16z-metrics"]),
  q("q-launch-001", "lesson-launch-measure-iterate", "What does retention measure?", "a", ["Whether users keep coming back", "How many CSS files exist", "Whether DNS propagated", "The number of pricing tiers"], "Retention shows if users continue receiving value after the first session.", ["retention", "startup"], ["posthog-docs"]),
  q("q-launch-002", "lesson-launch-measure-iterate", "What should happen after launch?", "c", ["Stop learning", "Delete analytics", "Measure behavior and iterate based on evidence", "Immediately rebuild the whole stack"], "Launch starts the learning loop; it does not end it.", ["launch", "analytics"], ["sequoia-pmf-framework"])
];

function lesson(params: {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  sourceIds: string[];
  quizQuestionIds: string[];
  minutes: number;
  order: number;
  terms: [string, string][];
  point: string;
  why: string;
  example: string;
  use: string[];
  avoid: string[];
  mistake: string;
}): Lesson {
  return {
    id: params.id,
    moduleId: params.moduleId,
    title: params.title,
    summary: params.summary,
    estimatedMinutes: params.minutes,
    order: params.order,
    keyTerms: params.terms.map(([term, definition]) => ({ term, definition })),
    sourceIds: params.sourceIds,
    quizQuestionIds: params.quizQuestionIds,
    bodyMarkdown: `# ${params.title}

## The point

${params.point}

## Why builders care

${params.why}

## Example

${params.example}

## When to use this

${params.use.map((item) => `- ${item}`).join("\n")}

## When not to use this

${params.avoid.map((item) => `- ${item}`).join("\n")}

## Common mistake

${params.mistake}`
  };
}

function q(
  id: string,
  lessonId: string,
  prompt: string,
  correctChoiceId: "a" | "b" | "c" | "d",
  choices: [string, string, string, string],
  explanation: string,
  topicTags: string[],
  sourceIds: string[]
): QuizQuestion {
  return {
    id,
    lessonId,
    prompt,
    choices: choices.map((text, index) => ({ id: ["a", "b", "c", "d"][index] ?? "a", text })),
    correctChoiceId,
    explanation,
    sourceIds,
    difficulty: "easy",
    topicTags
  };
}
