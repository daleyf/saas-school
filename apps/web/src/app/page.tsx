import Link from "next/link";
import { ArrowRight, BookOpen, Brain, CheckCircle2 } from "lucide-react";
import { SourceBadge } from "../components/SourceBadge";

export default function HomePage() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Duolingo for shipping SaaS</p>
          <h1>Learn the stack. Ship the product.</h1>
          <p className="lead">
            SaaS School teaches Vercel, Stripe, databases, auth, analytics, and startup fundamentals through short lessons,
            quizzes, and spaced repetition.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/advisor">
              Get my SaaS learning path <ArrowRight size={18} />
            </Link>
            <Link className="secondary-button" href="/courses">
              <BookOpen size={18} /> Browse courses
            </Link>
          </div>
        </div>
        <aside className="card mock-card">
          <p className="eyebrow">Mock recommendation</p>
          <div className="idea-box">Your idea: AI journaling app</div>
          <ul className="stack-list">
            <li className="stack-item"><span>Frontend</span><strong>Next.js + Vercel</strong></li>
            <li className="stack-item"><span>Database</span><strong>Supabase Postgres</strong></li>
            <li className="stack-item"><span>Payments</span><strong>Stripe Checkout</strong></li>
            <li className="stack-item"><span>Analytics</span><strong>PostHog</strong></li>
            <li className="stack-item"><span>Email</span><strong>Resend</strong></li>
          </ul>
          <div className="feedback correct">
            <CheckCircle2 size={20} /> Next lesson: Why Stripe Checkout beats custom billing for MVPs
          </div>
        </aside>
      </section>

      <section className="section">
        <h2>Source-backed by founder and technical resources</h2>
        <div className="badge-row">
          <SourceBadge label="YC" description="Startup School + Startup Library" />
          <SourceBadge label="a16z" description="Founder essays + market thinking" />
          <SourceBadge label="Sequoia" description="PMF frameworks + company building" />
          <SourceBadge label="Stripe" description="Payments documentation" />
          <SourceBadge label="Vercel" description="Deployment documentation" />
          <SourceBadge label="Supabase" description="Postgres and auth documentation" />
          <SourceBadge label="PostHog" description="Product analytics documentation" />
        </div>
      </section>

      <section className="section grid three">
        <article className="card">
          <Brain color="var(--orange)" />
          <h3>Stack Advisor</h3>
          <p className="muted">Describe the app and get a practical MVP stack with what to avoid.</p>
        </article>
        <article className="card">
          <BookOpen color="var(--blue)" />
          <h3>Short lessons</h3>
          <p className="muted">Learn one SaaS decision at a time with examples and source links.</p>
        </article>
        <article className="card">
          <CheckCircle2 color="var(--green)" />
          <h3>Review loop</h3>
          <p className="muted">Missed questions come back so weak areas turn into memory.</p>
        </article>
      </section>
    </div>
  );
}
