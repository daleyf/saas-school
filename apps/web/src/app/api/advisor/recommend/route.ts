import { NextResponse } from "next/server";
import { recommendAndSaveStack } from "@saas-school/core";
import { withCoreDb } from "../../../../lib/core";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const idea = typeof body.idea === "string" ? body.idea : "";
    const recommendation = await withCoreDb((db) => recommendAndSaveStack(db, { idea }));
    return NextResponse.json({ recommendation });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Recommendation failed." }, { status: 400 });
  }
}
