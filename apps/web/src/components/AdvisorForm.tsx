"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import type { StackRecommendation } from "@saas-school/core";

const labels = [
  ["Frontend", "frontend"],
  ["Backend", "backend"],
  ["Database", "database"],
  ["Auth", "auth"],
  ["Payments", "payments"],
  ["Deployment", "deployment"],
  ["Analytics", "analytics"],
  ["Email", "email"]
] as const;

export function AdvisorForm() {
  const [idea, setIdea] = useState("A subscription AI journaling app that remembers voice notes and sends daily insights");
  const [recommendation, setRecommendation] = useState<StackRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/advisor/recommend", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idea })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Could not create recommendation.");
      }
      setRecommendation(data.recommendation);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create recommendation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid">
      <section className="card">
        <div className="advisor-form">
          <label htmlFor="idea"><strong>What are you building?</strong></label>
          <textarea
            id="idea"
            className="textarea"
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder="A B2B dashboard for tracking sales calls"
          />
          <button className="button" type="button" onClick={submit} disabled={loading}>
            {loading ? <Loader2 size={18} /> : <Sparkles size={18} />}
            Build my learning path
          </button>
          {error ? <p className="feedback wrong">{error}</p> : null}
        </div>
      </section>

      {recommendation ? (
        <section className="card">
          <p className="eyebrow">Recommended MVP stack</p>
          <h2>{recommendation.idea}</h2>
          <div className="result-stack">
            {labels.map(([label, key]) => {
              const item = recommendation[key];
              return (
                <article className="choice-card" key={key}>
                  <p className="meta">{label}</p>
                  <h3>{item.tool}</h3>
                  <p>{item.reason}</p>
                  <p className="muted"><strong>Use:</strong> {item.whenToUse}</p>
                  <p className="muted"><strong>Avoid:</strong> {item.whenNotToUse}</p>
                </article>
              );
            })}
          </div>
          <div className="grid two section">
            <div>
              <h3>Avoid for now</h3>
              <ul className="plain-list">
                {recommendation.avoidForNow.map((item) => <li key={item}>- {item}</li>)}
              </ul>
            </div>
            <div>
              <h3>Learning path</h3>
              <ol className="path-list">
                {recommendation.learningPathLessonIds.map((lessonId) => <li key={lessonId}>{lessonId}</li>)}
              </ol>
            </div>
          </div>
          <div className="row-actions">
            <Link className="button" href={`/lesson/${recommendation.learningPathLessonIds[0]}`}>
              Start first lesson <ArrowRight size={18} />
            </Link>
            <Link className="secondary-button" href={`/quiz/${recommendation.learningPathLessonIds[0]}`}>
              Diagnostic quiz
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
