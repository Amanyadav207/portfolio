# amanyadav.dev

Personal site — backend and distributed systems work, written up properly.

Next.js (App Router) + TypeScript + Tailwind, **statically exported**. No server
runtime; `npm run build` emits plain files to `out/`, deployable to Vercel as-is.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npm run typecheck  # tsc --noEmit
```

## Deploying

`next.config.mjs` sets `output: "export"`, so the build emits plain files to
`out/` — no Node runtime required. `vercel.json` pins the framework and output
directory, because this repo previously held a Create React App project and any
Vercel project created from it will still have **Output Directory = `build`**
saved in its settings, which fails with:

> No Output Directory named "build" found after the Build completed.

`vercel.json` overrides that. If it still fails, clear the override in
Vercel → Project → Settings → Build & Development Settings: set Framework
Preset to **Next.js** and leave Output Directory on the default.

## Layout

```
app/            routes: /, /work, /work/[slug], /writing, /writing/[slug], /now
content/work/   one MDX file per project
content/writing/ engineering deep-dives
components/     UI, callouts, and inline SVG diagrams
lib/site.ts     name, links, résumé path, headline metrics
lib/content.ts  MDX frontmatter reader + heading extraction for the on-page nav
```

Adding a project means dropping an `.mdx` file into `content/work/` — routes,
the index card, and the table of contents all derive from it. Frontmatter:

```yaml
---
title: "..."
summary: "..."        # shown on index cards and in <meta description>
context: "..."        # employer, or "Personal project"
period: "..."         # optional
stack: ["...", "..."] # optional
featured: true        # surfaces it on the home page
order: 1              # sort position
nda: true             # page describes employer-internal work
---
```

Every work page follows one shape: **problem → constraints → approach →
architecture diagram → tradeoffs → what I would do differently.**

## Unfinished by design

Work pages are scaffolds. `<Todo>` blocks mark every place needing a real
number, diagram, or detail that hasn't been verified — they render
conspicuously so they can't be shipped by accident.

```bash
grep -rn "TODO(aman)\|<Todo>" content/ app/   # find everything outstanding
```

No figure appears on this site that wasn't supplied directly. Pages describing
employer-internal work carry a `<NdaNote>` recording exactly which specifics
were softened, so they can be restored if cleared.

## The Conflux demo

`/work/conflux` embeds a live CRDT demo: two independent Yjs documents, each
bound to its own Monaco editor, cross-applying updates. Going offline queues
divergence; reconnecting exchanges state vectors and converges. It runs entirely
in the browser — no server, works offline, and survives static export.

Monaco is pinned to `0.52.2`: later versions add an `exports` map that breaks
`y-monaco`'s deep import of `monaco-editor/esm/vs/editor/editor.api.js`.
