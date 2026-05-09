import Link from "next/link";
import { CheckCircle2, Circle, Play } from "lucide-react";
import { getCourseDetail, getCourseProgress, listCompletedLessonIds } from "@saas-school/core";
import { LOCAL_USER_ID, withCoreDb } from "../../../lib/core";
import { ProgressBar } from "../../../components/ProgressBar";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const data = await withCoreDb((db) => {
    const detail = getCourseDetail(db, courseId);
    if (!detail) return null;
    return {
      ...detail,
      progress: getCourseProgress(db, LOCAL_USER_ID, courseId),
      completedLessonIds: listCompletedLessonIds(db, LOCAL_USER_ID)
    };
  });

  if (!data) {
    return <div className="page"><h1>Course not found</h1></div>;
  }

  return (
    <div className="page">
      <p className="eyebrow">Course</p>
      <h1>{data.course.title}</h1>
      <p className="lead">{data.course.description}</p>
      <section className="card">
        <div className="metric-row">
          <span>{data.progress.completedLessons} of {data.progress.totalLessons} lessons complete</span>
          <strong>{data.progress.percentComplete}%</strong>
        </div>
        <ProgressBar value={data.progress.percentComplete} />
      </section>
      <div className="path-map section">
        {data.modules.map((module) => (
          <section className="module-band" key={module.id}>
            <h2>{module.title}</h2>
            <p className="muted">{module.description}</p>
            <div className="grid">
              {data.lessons.filter((lesson) => lesson.moduleId === module.id).map((lesson, index) => {
                const completed = data.completedLessonIds.includes(lesson.id);
                return (
                  <article className="lesson-node" key={lesson.id}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span className="node-status">
                        {completed ? <CheckCircle2 size={18} /> : index === 0 ? <Play size={18} /> : <Circle size={18} />}
                      </span>
                      <div>
                        <h3>{lesson.title}</h3>
                        <p className="meta">{lesson.estimatedMinutes} min | {lesson.summary}</p>
                      </div>
                    </div>
                    <Link className="secondary-button" href={`/lesson/${lesson.id}`}>Open</Link>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
