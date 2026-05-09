# SaaS School

Local-first CLI MVP for learning the tools and decisions needed to ship a SaaS product.

## Commands

- Install: `pnpm install`
- Seed: `pnpm seed`
- CLI: `pnpm cli <command>`
- Test: `pnpm test`
- Typecheck: `pnpm -r typecheck`

## CLI Examples

```bash
pnpm seed
pnpm cli list-courses
pnpm cli show-course saas-stack-foundations
pnpm cli start-lesson lesson-saas-stack-overview
pnpm cli quiz lesson-saas-stack-overview
pnpm cli answer q-saas-stack-001 b
pnpm cli due
pnpm cli progress
pnpm cli recommend-stack "I want to build a subscription AI journaling app"
```
