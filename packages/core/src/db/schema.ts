import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull()
});

export const coursesTable = sqliteTable("courses", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  moduleIdsJson: text("module_ids_json").notNull()
});

export const modulesTable = sqliteTable("modules", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order_index").notNull(),
  lessonIdsJson: text("lesson_ids_json").notNull()
});

export const lessonsTable = sqliteTable("lessons", {
  id: text("id").primaryKey(),
  moduleId: text("module_id").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  bodyMarkdown: text("body_markdown").notNull(),
  keyTermsJson: text("key_terms_json").notNull(),
  sourceIdsJson: text("source_ids_json").notNull(),
  quizQuestionIdsJson: text("quiz_question_ids_json").notNull(),
  estimatedMinutes: integer("estimated_minutes").notNull(),
  order: integer("order_index").notNull()
});

export const sourcesTable = sqliteTable("sources", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  publisher: text("publisher").notNull(),
  url: text("url").notNull(),
  sourceType: text("source_type").notNull(),
  credibilityNote: text("credibility_note").notNull()
});

export const quizQuestionsTable = sqliteTable("quiz_questions", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id").notNull(),
  prompt: text("prompt").notNull(),
  choicesJson: text("choices_json").notNull(),
  correctChoiceId: text("correct_choice_id").notNull(),
  explanation: text("explanation").notNull(),
  sourceIdsJson: text("source_ids_json").notNull(),
  difficulty: text("difficulty").notNull(),
  topicTagsJson: text("topic_tags_json").notNull()
});

export const reviewStatesTable = sqliteTable("review_states", {
  userId: text("user_id").notNull(),
  questionId: text("question_id").notNull(),
  status: text("status").notNull(),
  attempts: integer("attempts").notNull(),
  correctAttempts: integer("correct_attempts").notNull(),
  incorrectAttempts: integer("incorrect_attempts").notNull(),
  easeFactor: real("ease_factor").notNull(),
  intervalDays: integer("interval_days").notNull(),
  dueAt: text("due_at").notNull(),
  lastAttemptAt: text("last_attempt_at")
});

export const answerAttemptsTable = sqliteTable("answer_attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  questionId: text("question_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  selectedChoiceId: text("selected_choice_id").notNull(),
  correctChoiceId: text("correct_choice_id").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),
  answeredAt: text("answered_at").notNull()
});

export const lessonProgressTable = sqliteTable("lesson_progress", {
  userId: text("user_id").notNull(),
  lessonId: text("lesson_id").notNull(),
  status: text("status").notNull(),
  completedAt: text("completed_at")
});

export const stackRecommendationsTable = sqliteTable("stack_recommendations", {
  id: text("id").primaryKey(),
  idea: text("idea").notNull(),
  recommendationJson: text("recommendation_json").notNull(),
  generatedAt: text("generated_at").notNull()
});

export const createSchemaSql = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  module_ids_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS modules (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  lesson_ids_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body_markdown TEXT NOT NULL,
  key_terms_json TEXT NOT NULL,
  source_ids_json TEXT NOT NULL,
  quiz_question_ids_json TEXT NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sources (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  credibility_note TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  choices_json TEXT NOT NULL,
  correct_choice_id TEXT NOT NULL,
  explanation TEXT NOT NULL,
  source_ids_json TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  topic_tags_json TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS review_states (
  user_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  status TEXT NOT NULL,
  attempts INTEGER NOT NULL,
  correct_attempts INTEGER NOT NULL,
  incorrect_attempts INTEGER NOT NULL,
  ease_factor REAL NOT NULL,
  interval_days INTEGER NOT NULL,
  due_at TEXT NOT NULL,
  last_attempt_at TEXT,
  PRIMARY KEY (user_id, question_id)
);

CREATE TABLE IF NOT EXISTS answer_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  selected_choice_id TEXT NOT NULL,
  correct_choice_id TEXT NOT NULL,
  is_correct INTEGER NOT NULL,
  answered_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  status TEXT NOT NULL,
  completed_at TEXT,
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS stack_recommendations (
  id TEXT PRIMARY KEY,
  idea TEXT NOT NULL,
  recommendation_json TEXT NOT NULL,
  generated_at TEXT NOT NULL
);
`;
