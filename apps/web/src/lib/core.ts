import { resolve } from "node:path";
import {
  DEFAULT_USER_ID,
  openAppDb,
  seedDatabase,
  listCourses,
  type AppDb
} from "@saas-school/core";

export const LOCAL_USER_ID = DEFAULT_USER_ID;

export async function withCoreDb<T>(callback: (db: AppDb) => T | Promise<T>): Promise<T> {
  const db = await openAppDb(resolve(process.cwd(), "../../.saas-school/saas-school.sqlite"));
  try {
    if (listCourses(db).length === 0) {
      seedDatabase(db);
    }
    return await callback(db);
  } finally {
    db.close();
  }
}
