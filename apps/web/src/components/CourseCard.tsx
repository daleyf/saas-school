import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Course } from "@saas-school/core";
import { ProgressBar } from "./ProgressBar";

export function CourseCard({ course, progress }: { course: Course; progress: number }) {
  return (
    <article className="card course-card">
      <BookOpen color="var(--orange)" />
      <div>
        <h3>{course.title}</h3>
        <p className="muted">{course.description}</p>
      </div>
      <div>
        <div className="metric-row">
          <span className="meta">{course.estimatedMinutes} min | {course.level}</span>
          <strong>{progress}%</strong>
        </div>
        <ProgressBar value={progress} />
      </div>
      <div className="row-actions">
        <Link className="button" href={`/courses/${course.slug}`}>
          Continue <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
