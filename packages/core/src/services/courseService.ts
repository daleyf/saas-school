import type { AppDb } from "../db/client.js";
import {
  getCourseBySlug,
  getLesson,
  getLessonsForCourse,
  getModulesForCourse,
  getSources,
  listSources,
  listCourses as repositoryListCourses
} from "../db/repository.js";

export function listCourses(db: AppDb) {
  return repositoryListCourses(db);
}

export function getCourseDetail(db: AppDb, slug: string) {
  const course = getCourseBySlug(db, slug);
  if (!course) {
    return null;
  }
  return {
    course,
    modules: getModulesForCourse(db, course.id),
    lessons: getLessonsForCourse(db, course.id)
  };
}

export function getLessonDetail(db: AppDb, lessonId: string) {
  const lesson = getLesson(db, lessonId);
  if (!lesson) {
    return null;
  }
  return {
    lesson,
    sources: getSources(db, lesson.sourceIds)
  };
}

export function listSourceLibrary(db: AppDb) {
  return listSources(db);
}
