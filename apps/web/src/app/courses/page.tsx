import { getCourseProgress, listCourses } from "@saas-school/core";
import { CourseCard } from "../../components/CourseCard";
import { LOCAL_USER_ID, withCoreDb } from "../../lib/core";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await withCoreDb((db) =>
    listCourses(db).map((course) => ({
      course,
      progress: getCourseProgress(db, LOCAL_USER_ID, course.slug).percentComplete
    }))
  );

  return (
    <div className="page">
      <p className="eyebrow">Courses</p>
      <h1>Learning tracks</h1>
      <p className="lead">Build stack literacy across deployment, databases, payments, and launch fundamentals.</p>
      <div className="grid two section">
        {courses.map((item) => (
          <CourseCard key={item.course.id} course={item.course} progress={item.progress} />
        ))}
      </div>
    </div>
  );
}
