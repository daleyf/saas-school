import { listSourceLibrary } from "@saas-school/core";
import { withCoreDb } from "../../lib/core";

export const dynamic = "force-dynamic";

export default async function SourcesPage() {
  const sources = await withCoreDb((db) => listSourceLibrary(db));
  const groups = groupByPublisher(sources);

  return (
    <div className="page">
      <p className="eyebrow">Source library</p>
      <h1>Learn from credible references.</h1>
      <p className="lead">These are educational references only. Lesson content is original and does not imply affiliation.</p>
      <div className="grid section">
        {Object.entries(groups).map(([publisher, items]) => (
          <section key={publisher}>
            <h2>{publisher}</h2>
            <div className="grid two">
              {items.map((source) => (
                <article className="source-card" key={source.id}>
                  <p className="eyebrow">{source.sourceType.replace("_", " ")}</p>
                  <h3>{source.title}</h3>
                  <p className="muted">{source.credibilityNote}</p>
                  <a href={source.url} target="_blank" rel="noreferrer">Open link</a>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="disclaimer">
        SaaS School is an independent learning product. It is not affiliated with, endorsed by, or sponsored by Y Combinator,
        Andreessen Horowitz, Sequoia Capital, Stripe, Vercel, Supabase, PostHog, Clerk, or any referenced company.
      </p>
    </div>
  );
}

function groupByPublisher<T extends { publisher: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    groups[item.publisher] ??= [];
    groups[item.publisher].push(item);
    return groups;
  }, {});
}
