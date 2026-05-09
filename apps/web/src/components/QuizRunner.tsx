"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { AnswerResult, QuizQuestion } from "@saas-school/core";

export function QuizRunner({ questions, mode = "lesson" }: { questions: QuizQuestion[]; mode?: "lesson" | "review" }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [completed, setCompleted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions[index];
  const done = completed >= questions.length;

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return Math.round((completed / questions.length) * 100);
  }, [completed, questions.length]);

  async function submitAnswer() {
    if (!question || !selected) return;
    const response = await fetch("/api/quiz/answer", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ questionId: question.id, choiceId: selected })
    });
    const data = await response.json();
    setResult(data.result);
    setCompleted((value) => value + 1);
    if (data.result.isCorrect) {
      setCorrect((value) => value + 1);
    }
  }

  function next() {
    setSelected(null);
    setResult(null);
    setIndex((value) => value + 1);
  }

  if (questions.length === 0) {
    return (
      <section className="quiz-panel">
        <h2>No questions due</h2>
        <p className="muted">Review questions appear here after you miss something or when a scheduled question comes due.</p>
        <Link className="button" href="/courses">Browse courses</Link>
      </section>
    );
  }

  if (done || !question) {
    return (
      <section className="quiz-panel">
        <CheckCircle2 color="var(--green)" size={34} />
        <h2>{mode === "review" ? "Review complete." : "Quiz complete."}</h2>
        <p className="lead">You answered {correct} of {questions.length} correctly.</p>
        <div className="row-actions">
          <Link className="button" href="/dashboard">Back to dashboard <ArrowRight size={18} /></Link>
          <Link className="secondary-button" href="/review"><RotateCcw size={18} /> Review</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-panel">
      <div className="metric-row">
        <span className="meta">Question {Math.min(index + 1, questions.length)} of {questions.length}</span>
        <strong>{progress}%</strong>
      </div>
      <div className="progress-track" style={{ marginBottom: 18 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <h2>{question.prompt}</h2>
      <div className="answers">
        {question.choices.map((choice) => (
          <button
            className={`answer-button ${selected === choice.id ? "selected" : ""}`}
            key={choice.id}
            onClick={() => setSelected(choice.id)}
            disabled={Boolean(result)}
            type="button"
          >
            <span className="answer-letter">{choice.id.toUpperCase()}</span>
            <span>{choice.text}</span>
          </button>
        ))}
      </div>
      {!result ? (
        <button className="button" type="button" disabled={!selected} onClick={submitAnswer}>
          Submit answer
        </button>
      ) : (
        <div className={`feedback ${result.isCorrect ? "correct" : "wrong"}`}>
          <h3>{result.isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />} {result.isCorrect ? "Correct. You are thinking like a builder." : "Not quite. This one will come back in review."}</h3>
          <p>{result.explanation}</p>
          <p className="meta">Next review: {new Date(result.updatedReviewState.dueAt).toLocaleString()}</p>
          <div className="row-actions">
            <button className="button" type="button" onClick={next}>
              Next <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
