import type {
  Course,
  Difficulty,
  Lesson,
  ProgressStatus,
  QuizChoice,
  QuizQuestion,
  ReviewState,
  ReviewStatus,
  SourceLink
} from "../types.js";
import type { AppDb } from "./client.js";
import { runExec, runGet, runSelect } from "./client.js";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: Course["level"];
  estimated_minutes: number;
  module_ids_json: string;
};

type LessonRow = {
  id: string;
  module_id: string;
  title: string;
  summary: string;
  body_markdown: string;
  key_terms_json: string;
  source_ids_json: string;
  quiz_question_ids_json: string;
  estimated_minutes: number;
  order_index: number;
};

type ModuleRow = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  lesson_ids_json: string;
};

type SourceRow = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  source_type: SourceLink["sourceType"];
  credibility_note: string;
};

type QuestionRow = {
  id: string;
  lesson_id: string;
  prompt: string;
  choices_json: string;
  correct_choice_id: string;
  explanation: string;
  source_ids_json: string;
  difficulty: Difficulty;
  topic_tags_json: string;
};

export function mapCourse(row: CourseRow): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    level: row.level,
    estimatedMinutes: row.estimated_minutes,
    moduleIds: JSON.parse(row.module_ids_json) as string[]
  };
}

export function mapLesson(row: LessonRow): Lesson {
  return {
    id: row.id,
    moduleId: row.module_id,
    title: row.title,
    summary: row.summary,
    bodyMarkdown: row.body_markdown,
    keyTerms: JSON.parse(row.key_terms_json),
    sourceIds: JSON.parse(row.source_ids_json),
    quizQuestionIds: JSON.parse(row.quiz_question_ids_json),
    estimatedMinutes: row.estimated_minutes,
    order: row.order_index
  };
}

export function mapModule(row: ModuleRow) {
  return {
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    description: row.description,
    order: row.order_index,
    lessonIds: JSON.parse(row.lesson_ids_json) as string[]
  };
}

export function mapSource(row: SourceRow): SourceLink {
  return {
    id: row.id,
    title: row.title,
    publisher: row.publisher,
    url: row.url,
    sourceType: row.source_type,
    credibilityNote: row.credibility_note
  };
}

export function mapQuestion(row: QuestionRow): QuizQuestion {
  return {
    id: row.id,
    lessonId: row.lesson_id,
    prompt: row.prompt,
    choices: JSON.parse(row.choices_json) as QuizChoice[],
    correctChoiceId: row.correct_choice_id,
    explanation: row.explanation,
    sourceIds: JSON.parse(row.source_ids_json) as string[],
    difficulty: row.difficulty,
    topicTags: JSON.parse(row.topic_tags_json) as string[]
  };
}

export function listCourses(db: AppDb): Course[] {
  return runSelect<CourseRow>(db, "SELECT * FROM courses ORDER BY title").map(mapCourse);
}

export function getCourseBySlug(db: AppDb, slug: string): Course | null {
  const row = runGet<CourseRow>(db, "SELECT * FROM courses WHERE slug = ?", [slug]);
  return row ? mapCourse(row) : null;
}

export function getCourseById(db: AppDb, id: string): Course | null {
  const row = runGet<CourseRow>(db, "SELECT * FROM courses WHERE id = ?", [id]);
  return row ? mapCourse(row) : null;
}

export function getModulesForCourse(db: AppDb, courseId: string) {
  return runSelect<ModuleRow>(db, "SELECT * FROM modules WHERE course_id = ? ORDER BY order_index", [courseId]).map(mapModule);
}

export function getLesson(db: AppDb, lessonId: string): Lesson | null {
  const row = runGet<LessonRow>(db, "SELECT * FROM lessons WHERE id = ?", [lessonId]);
  return row ? mapLesson(row) : null;
}

export function getLessonsForCourse(db: AppDb, courseId: string): Lesson[] {
  const rows = runSelect<LessonRow>(
    db,
    `SELECT lessons.* FROM lessons
     JOIN modules ON modules.id = lessons.module_id
     WHERE modules.course_id = ?
     ORDER BY modules.order_index, lessons.order_index`,
    [courseId]
  );
  return rows.map(mapLesson);
}

export function getQuestion(db: AppDb, questionId: string): QuizQuestion | null {
  const row = runGet<QuestionRow>(db, "SELECT * FROM quiz_questions WHERE id = ?", [questionId]);
  return row ? mapQuestion(row) : null;
}

export function getQuestionsForLesson(db: AppDb, lessonId: string): QuizQuestion[] {
  return runSelect<QuestionRow>(db, "SELECT * FROM quiz_questions WHERE lesson_id = ? ORDER BY id", [lessonId]).map(mapQuestion);
}

export function getSources(db: AppDb, sourceIds: string[]): SourceLink[] {
  if (sourceIds.length === 0) {
    return [];
  }
  const placeholders = sourceIds.map(() => "?").join(", ");
  return runSelect<SourceRow>(db, `SELECT * FROM sources WHERE id IN (${placeholders})`, sourceIds).map(mapSource);
}

export function listSources(db: AppDb): SourceLink[] {
  return runSelect<SourceRow>(db, "SELECT * FROM sources ORDER BY publisher, title").map(mapSource);
}

export function getReviewState(db: AppDb, userId: string, questionId: string): ReviewState | null {
  const row = runGet<Record<string, string | number | null>>(db, "SELECT * FROM review_states WHERE user_id = ? AND question_id = ?", [
    userId,
    questionId
  ]);
  if (!row) {
    return null;
  }
  return {
    userId: String(row.user_id),
    questionId: String(row.question_id),
    status: row.status as ReviewStatus,
    attempts: Number(row.attempts),
    correctAttempts: Number(row.correct_attempts),
    incorrectAttempts: Number(row.incorrect_attempts),
    easeFactor: Number(row.ease_factor),
    intervalDays: Number(row.interval_days),
    dueAt: String(row.due_at),
    lastAttemptAt: row.last_attempt_at ? String(row.last_attempt_at) : undefined
  };
}

export function upsertReviewState(db: AppDb, state: ReviewState) {
  runExec(
    db,
    `INSERT INTO review_states
      (user_id, question_id, status, attempts, correct_attempts, incorrect_attempts, ease_factor, interval_days, due_at, last_attempt_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id, question_id) DO UPDATE SET
      status = excluded.status,
      attempts = excluded.attempts,
      correct_attempts = excluded.correct_attempts,
      incorrect_attempts = excluded.incorrect_attempts,
      ease_factor = excluded.ease_factor,
      interval_days = excluded.interval_days,
      due_at = excluded.due_at,
      last_attempt_at = excluded.last_attempt_at`,
    [
      state.userId,
      state.questionId,
      state.status,
      state.attempts,
      state.correctAttempts,
      state.incorrectAttempts,
      state.easeFactor,
      state.intervalDays,
      state.dueAt,
      state.lastAttemptAt ?? null
    ]
  );
}

export function recordAnswerAttempt(db: AppDb, params: {
  userId: string;
  questionId: string;
  lessonId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  isCorrect: boolean;
  answeredAt: string;
}) {
  runExec(
    db,
    `INSERT INTO answer_attempts
      (id, user_id, question_id, lesson_id, selected_choice_id, correct_choice_id, is_correct, answered_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      `${params.userId}-${params.questionId}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      params.userId,
      params.questionId,
      params.lessonId,
      params.selectedChoiceId,
      params.correctChoiceId,
      params.isCorrect ? 1 : 0,
      params.answeredAt
    ]
  );
}

export function completeLessonProgress(db: AppDb, userId: string, lessonId: string, completedAt: string) {
  runExec(
    db,
    `INSERT INTO lesson_progress (user_id, lesson_id, status, completed_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, lesson_id) DO UPDATE SET status = excluded.status, completed_at = excluded.completed_at`,
    [userId, lessonId, "completed", completedAt]
  );
}

export function getCompletedLessonIds(db: AppDb, userId: string): string[] {
  return runSelect<{ lesson_id: string }>(db, "SELECT lesson_id FROM lesson_progress WHERE user_id = ? AND status = ?", [
    userId,
    "completed"
  ]).map((row) => row.lesson_id);
}

export function getAnswerStats(db: AppDb, userId: string) {
  return runGet<{ answered: number; correct: number }>(
    db,
    "SELECT COUNT(*) AS answered, SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS correct FROM answer_attempts WHERE user_id = ?",
    [userId]
  ) ?? { answered: 0, correct: 0 };
}

export function getLessonAnswerStats(db: AppDb, userId: string, lessonId: string) {
  return runGet<{ answered: number; correct: number }>(
    db,
    "SELECT COUNT(*) AS answered, SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS correct FROM answer_attempts WHERE user_id = ? AND lesson_id = ?",
    [userId, lessonId]
  ) ?? { answered: 0, correct: 0 };
}

export function getAllReviewStates(db: AppDb, userId: string): ReviewState[] {
  return runSelect<Record<string, string | number | null>>(db, "SELECT * FROM review_states WHERE user_id = ?", [userId]).map((row) => ({
    userId: String(row.user_id),
    questionId: String(row.question_id),
    status: row.status as ReviewStatus,
    attempts: Number(row.attempts),
    correctAttempts: Number(row.correct_attempts),
    incorrectAttempts: Number(row.incorrect_attempts),
    easeFactor: Number(row.ease_factor),
    intervalDays: Number(row.interval_days),
    dueAt: String(row.due_at),
    lastAttemptAt: row.last_attempt_at ? String(row.last_attempt_at) : undefined
  }));
}

export function getDueQuestionIds(db: AppDb, userId: string, nowIso: string): string[] {
  return runSelect<{ question_id: string }>(
    db,
    "SELECT question_id FROM review_states WHERE user_id = ? AND due_at <= ? AND status != ? ORDER BY due_at",
    [userId, nowIso, "mastered"]
  ).map((row) => row.question_id);
}

export function saveStackRecommendation(db: AppDb, id: string, idea: string, recommendationJson: string, generatedAt: string) {
  runExec(
    db,
    "INSERT INTO stack_recommendations (id, idea, recommendation_json, generated_at) VALUES (?, ?, ?, ?)",
    [id, idea, recommendationJson, generatedAt]
  );
}
