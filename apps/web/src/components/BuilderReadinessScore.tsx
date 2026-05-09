import { Gauge } from "lucide-react";
import type { BuilderReadinessScore as Score } from "@saas-school/core";
import { ProgressBar } from "./ProgressBar";

export function BuilderReadinessScore({ score }: { score: Score }) {
  return (
    <section className="card">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Gauge color="var(--orange)" />
        <div>
          <h2>Builder Readiness</h2>
          <p className="muted">{score.level}</p>
        </div>
      </div>
      <div className="stat-card" style={{ boxShadow: "none", marginTop: 12 }}>
        <strong>{score.score}/100</strong>
        <ProgressBar value={score.score} />
      </div>
      <ul className="metric-list" style={{ marginTop: 16 }}>
        <li className="metric-row"><span>Lessons</span><strong>{score.lessonCompletionScore}%</strong></li>
        <li className="metric-row"><span>Quiz accuracy</span><strong>{score.quizAccuracyScore}%</strong></li>
        <li className="metric-row"><span>Review mastery</span><strong>{score.reviewMasteryScore}%</strong></li>
        <li className="metric-row"><span>Breadth</span><strong>{score.breadthScore}%</strong></li>
      </ul>
    </section>
  );
}
