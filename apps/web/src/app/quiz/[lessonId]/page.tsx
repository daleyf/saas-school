import { getQuizForLesson } from "@saas-school/core";
import { QuizRunner } from "../../../components/QuizRunner";
import { withCoreDb } from "../../../lib/core";

export const dynamic = "force-dynamic";

export default async function QuizPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const questions = await withCoreDb((db) => getQuizForLesson(db, lessonId));

  return (
    <div className="page">
      <p className="eyebrow">Quiz</p>
      <h1>Check the concept.</h1>
      <QuizRunner questions={questions} />
    </div>
  );
}
