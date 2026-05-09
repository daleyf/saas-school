import { NextResponse } from "next/server";
import { getDailyReview } from "@saas-school/core";
import { LOCAL_USER_ID, withCoreDb } from "../../../../lib/core";

export const dynamic = "force-dynamic";

export async function GET() {
  const review = await withCoreDb((db) => getDailyReview(db, LOCAL_USER_ID));
  return NextResponse.json({ review });
}
