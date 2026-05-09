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
