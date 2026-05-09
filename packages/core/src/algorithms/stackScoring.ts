export type ProductTrait =
  | "ai_app"
  | "subscription"
  | "consumer"
  | "b2b"
  | "marketplace"
  | "dashboard"
  | "realtime"
  | "mobile_first"
  | "content_heavy"
  | "file_uploads"
  | "team_accounts"
  | "analytics";

const traitKeywords: Record<ProductTrait, string[]> = {
  ai_app: ["ai", "llm", "chatbot", "gpt", "memory", "embedding", "voice notes", "insights"],
  subscription: ["subscription", "subscribe", "paid", "billing", "monthly", "stripe"],
  consumer: ["consumer", "habit", "journaling", "students", "personal", "fitness"],
  b2b: ["b2b", "business", "sales", "crm", "team", "company", "client"],
  marketplace: ["marketplace", "seller", "buyer", "payout", "coach", "providers"],
  dashboard: ["dashboard", "admin", "report", "tracking", "metrics"],
  realtime: ["real-time", "realtime", "live", "chat", "collaboration"],
  mobile_first: ["mobile", "ios", "android", "native", "phone"],
  content_heavy: ["blog", "content", "course", "lesson", "library", "cms"],
  file_uploads: ["upload", "file", "image", "pdf", "document", "voice notes"],
  team_accounts: ["team", "workspace", "roles", "permissions", "members"],
  analytics: ["analytics", "tracking", "retention", "events", "funnels"]
};

export function detectProductTraits(idea: string): ProductTrait[] {
  const lower = idea.toLowerCase();
  return (Object.keys(traitKeywords) as ProductTrait[]).filter((trait) =>
    traitKeywords[trait].some((keyword) => lower.includes(keyword))
  );
}
