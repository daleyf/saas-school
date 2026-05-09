import Link from "next/link";
import { ArrowRight, RotateCcw, Target } from "lucide-react";
import { getBuilderReadinessScore, getDailyReview, getRecommendedNextLesson } from "@saas-school/core";
import { BuilderReadinessScore } from "../../components/BuilderReadinessScore";
import { LOCAL_USER_ID, withCoreDb } from "../../lib/core";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const data = await withCoreDb((db) => ({
    readiness: getBuilderReadinessScore(db, LOCAL_USER_ID),
    review: getDailyReview(db, LOCAL_USER_ID),
    nextLesson: getRecommendedNextLesson(db, LOCAL_USER_ID)
  }));

  return (
    <div className="page">
      <p className="eyebrow">Daily home base</p>
      <h1>Dashboard</h1>
      <div className="grid two">
        <BuilderReadinessScore score={data.readiness} />
        <section className="card">
          <Target color="var(--orange)" />
          <h2>Today</h2>
          <ul className="metric-list">
            <li className="metric-row"><span>Review questions due</span><strong>{data.review.dueQuestions.length}</strong></li>
            <li className="metric-row"><span>Weak topics</span><strong>{data.review.weakTopics.length}</strong></li>
            <li className="metric-row"><span>Current streak</span><strong>1 day</strong></li>
          </ul>
          <div className="row-actions">
            {data.nextLesson ? (
              <Link className="button" href={`/lesson/${data.nextLesson.id}`}>
                Next lesson <ArrowRight size={18} />
              </Link>
            ) : null}
            <Link className="secondary-button" href="/review">
              <RotateCcw size={18} /> Review
            </Link>
          </div>
        </section>
      </div>

      <section className="section grid two">
        <article className="card">
          <h2>Recommended next lesson</h2>
          {data.nextLesson ? (
            <>
              <h3>{data.nextLesson.title}</h3>
              <p className="muted">{data.nextLesson.summary}</p>
              <Link className="button" href={`/lesson/${data.nextLesson.id}`}>Start lesson</Link>
            </>
          ) : (
            <p className="muted">All seeded lessons are complete.</p>
          )}
        </article>
        <article className="card">
          <h2>Weak topics</h2>
          {data.review.weakTopics.length > 0 ? (
            <ul className="plain-list">
              {data.review.weakTopics.slice(0, 6).map((topic) => (
                <li key={topic.topic}>- {topic.topic}: {topic.incorrectAttempts} missed</li>
              ))}
            </ul>
          ) : (
            <p className="muted">Weak areas will appear after missed quiz answers.</p>
          )}
        </article>
      </section>
    </div>
  );
}
