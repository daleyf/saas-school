import type { AppDb } from "../db/client.js";
import { runExec } from "../db/client.js";
import { courses, lessons, modules, quizQuestions } from "../seed/courses.js";
import { sourceLinks } from "../seed/sources.js";

export const DEFAULT_USER_ID = "local-user";

export function seedDatabase(db: AppDb) {
  const now = new Date().toISOString();
  runExec(db, "INSERT OR IGNORE INTO users (id, created_at) VALUES (?, ?)", [DEFAULT_USER_ID, now]);

  for (const course of courses) {
    runExec(
      db,
      `INSERT OR REPLACE INTO courses
        (id, slug, title, description, level, estimated_minutes, module_ids_json)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [course.id, course.slug, course.title, course.description, course.level, course.estimatedMinutes, JSON.stringify(course.moduleIds)]
    );
  }

  for (const module of modules) {
    runExec(
      db,
      `INSERT OR REPLACE INTO modules
        (id, course_id, title, description, order_index, lesson_ids_json)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [module.id, module.courseId, module.title, module.description, module.order, JSON.stringify(module.lessonIds)]
    );
  }

  for (const lesson of lessons) {
    runExec(
      db,
      `INSERT OR REPLACE INTO lessons
        (id, module_id, title, summary, body_markdown, key_terms_json, source_ids_json, quiz_question_ids_json, estimated_minutes, order_index)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        lesson.id,
        lesson.moduleId,
        lesson.title,
        lesson.summary,
        lesson.bodyMarkdown,
        JSON.stringify(lesson.keyTerms),
        JSON.stringify(lesson.sourceIds),
        JSON.stringify(lesson.quizQuestionIds),
        lesson.estimatedMinutes,
        lesson.order
      ]
    );
  }

  for (const source of sourceLinks) {
    runExec(
      db,
      `INSERT OR REPLACE INTO sources
        (id, title, publisher, url, source_type, credibility_note)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [source.id, source.title, source.publisher, source.url, source.sourceType, source.credibilityNote]
    );
  }

  for (const question of quizQuestions) {
    runExec(
      db,
      `INSERT OR REPLACE INTO quiz_questions
        (id, lesson_id, prompt, choices_json, correct_choice_id, explanation, source_ids_json, difficulty, topic_tags_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        question.id,
        question.lessonId,
        question.prompt,
        JSON.stringify(question.choices),
        question.correctChoiceId,
        question.explanation,
        JSON.stringify(question.sourceIds),
        question.difficulty,
        JSON.stringify(question.topicTags)
      ]
    );
  }

  db.save();
}
