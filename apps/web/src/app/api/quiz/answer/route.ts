import { NextResponse } from "next/server";
import { submitAnswer } from "@saas-school/core";
import { LOCAL_USER_ID, withCoreDb } from "../../../../lib/core";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const questionId = typeof body.questionId === "string" ? body.questionId : "";
    const choiceId = typeof body.choiceId === "string" ? body.choiceId : "";
    const result = await withCoreDb((db) => submitAnswer(db, { userId: LOCAL_USER_ID, questionId, choiceId }));
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Answer failed." }, { status: 400 });
  }
}
