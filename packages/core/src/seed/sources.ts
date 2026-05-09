import type { SourceLink } from "../types.js";

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
    id: "stripe-checkout",
    title: "Stripe Checkout",
    publisher: "Stripe",
    url: "https://docs.stripe.com/payments/checkout",
    sourceType: "technical_docs",
    credibilityNote: "Official docs for hosted Stripe Checkout."
  },
  {
    id: "stripe-billing",
    title: "Stripe Billing",
    publisher: "Stripe",
    url: "https://docs.stripe.com/billing",
    sourceType: "technical_docs",
    credibilityNote: "Official Stripe documentation for subscriptions, invoices, and billing lifecycle."
  },
  {
    id: "stripe-webhooks",
    title: "Stripe Webhooks",
    publisher: "Stripe",
    url: "https://docs.stripe.com/webhooks",
    sourceType: "technical_docs",
    credibilityNote: "Official Stripe docs for receiving payment and subscription events."
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
    id: "vercel-env-vars",
    title: "Vercel Environment Variables",
    publisher: "Vercel",
    url: "https://vercel.com/docs/environment-variables",
    sourceType: "technical_docs",
    credibilityNote: "Official Vercel docs for configuring secrets and environment-specific settings."
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
    id: "supabase-rls",
    title: "Supabase Row Level Security",
    publisher: "Supabase",
    url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
    sourceType: "technical_docs",
    credibilityNote: "Official Supabase guide to protecting database rows with policies."
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
  },
  {
    id: "sequoia-pmf-framework",
    title: "The Arc Product-Market Fit Framework",
    publisher: "Sequoia Capital",
    url: "https://www.sequoiacap.com/article/pmf-framework/",
    sourceType: "vc",
    credibilityNote: "Company-building framework for thinking about product-market fit."
  },
  {
    id: "a16z-metrics",
    title: "a16z Metrics and Growth Content",
    publisher: "Andreessen Horowitz",
    url: "https://a16z.com/",
    sourceType: "vc",
    credibilityNote: "Founder and market essays useful for thinking about startup growth and metrics."
  }
];
