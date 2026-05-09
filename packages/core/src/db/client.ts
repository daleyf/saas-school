import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { createSchemaSql } from "./schema.js";

export const DEFAULT_DB_PATH = ".saas-school/saas-school.sqlite";

type SqlValue = string | number | bigint | null | Uint8Array;

export type AppDb = {
  raw: DatabaseSync;
  path: string;
  save: () => void;
  close: () => void;
};

export async function openAppDb(dbPath = process.env.SAAS_SCHOOL_DB_PATH ?? DEFAULT_DB_PATH): Promise<AppDb> {
  const resolvedPath = resolveDbPath(dbPath);
  mkdirSync(dirname(resolvedPath), { recursive: true });
  const raw = new DatabaseSync(resolvedPath);
  raw.exec(createSchemaSql);
  const appDb: AppDb = {
    raw,
    path: resolvedPath,
    save: () => undefined,
    close: () => {
      raw.close();
    }
  };
  return appDb;
}

export function resetDbFile(dbPath = process.env.SAAS_SCHOOL_DB_PATH ?? DEFAULT_DB_PATH) {
  const resolvedPath = resolveDbPath(dbPath);
  if (existsSync(resolvedPath)) {
    rmSync(resolvedPath);
  }
}

function resolveDbPath(dbPath: string) {
  if (dbPath.startsWith("/")) {
    return dbPath;
  }
  return resolve(process.env.INIT_CWD ?? process.cwd(), dbPath);
}

export function runSelect<T>(db: AppDb, sql: string, params: SqlValue[] = []): T[] {
  return db.raw.prepare(sql).all(...params) as T[];
}

export function runGet<T>(db: AppDb, sql: string, params: SqlValue[] = []): T | null {
  return (db.raw.prepare(sql).get(...params) as T | undefined) ?? null;
}

export function runExec(db: AppDb, sql: string, params: SqlValue[] = []) {
  db.raw.prepare(sql).run(...params);
}
