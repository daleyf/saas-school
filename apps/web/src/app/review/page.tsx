import { getDailyReview } from "@saas-school/core";
import { QuizRunner } from "../../components/QuizRunner";
import { LOCAL_USER_ID, withCoreDb } from "../../lib/core";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const review = await withCoreDb((db) => getDailyReview(db, LOCAL_USER_ID));

  return (
    <div className="page">
      <p className="eyebrow">Spaced repetition</p>
      <h1>{review.dueQuestions.length} questions due today</h1>
      {review.weakTopics.length > 0 ? (
        <p className="lead">Mostly from: {review.weakTopics.slice(0, 4).map((topic) => topic.topic).join(", ")}</p>
      ) : (
        <p className="lead">Missed questions and scheduled reviews will appear here.</p>
      )}
      <QuizRunner questions={review.dueQuestions} mode="review" />
    </div>
  );
}
