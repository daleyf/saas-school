import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getLessonDetail } from "@saas-school/core";
import { withCoreDb } from "../../../lib/core";
import { LessonBody } from "../../../components/LessonBody";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const detail = await withCoreDb((db) => getLessonDetail(db, lessonId));

  if (!detail) {
    return <div className="page"><h1>Lesson not found</h1></div>;
  }

  return (
    <div className="page">
      <p className="eyebrow">Lesson</p>
      <LessonBody markdown={detail.lesson.bodyMarkdown} />
      <section className="section grid two">
        <article className="card">
          <BookOpen color="var(--orange)" />
          <h2>Key terms</h2>
          <ul className="plain-list">
            {detail.lesson.keyTerms.map((term) => (
              <li key={term.term}><strong>{term.term}:</strong> {term.definition}</li>
            ))}
          </ul>
        </article>
        <article className="card">
          <h2>Sources</h2>
          <ul className="plain-list">
            {detail.sources.map((source) => (
              <li key={source.id}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
                <span className="muted"> | {source.publisher}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>
      <div className="row-actions">
        <Link className="button" href={`/quiz/${detail.lesson.id}`}>
          Start quiz <ArrowRight size={18} />
        </Link>
        <Link className="secondary-button" href="/courses/saas-stack-foundations">Back to course</Link>
      </div>
    </div>
  );
}
