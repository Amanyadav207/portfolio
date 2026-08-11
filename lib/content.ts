import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Collection = "work" | "writing";

export interface DocMeta {
  slug: string;
  title: string;
  /** One-line summary used on index pages. */
  summary: string;
  /** Where the work happened, e.g. "Scaler AI Labs" or "Personal project". */
  context?: string;
  period?: string;
  /** Ordered small-caps list shown under the title. */
  stack?: string[];
  featured?: boolean;
  /** Lower numbers sort first. */
  order?: number;
  status?: "draft" | "published";
  /** Set on pages describing employer-internal systems. */
  nda?: boolean;
}

export interface Doc extends DocMeta {
  body: string;
}

const ROOT = path.join(process.cwd(), "content");

function dir(collection: Collection) {
  return path.join(ROOT, collection);
}

export function getSlugs(collection: Collection): string[] {
  const d = dir(collection);
  if (!fs.existsSync(d)) return [];
  return fs
    .readdirSync(d)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDoc(collection: Collection, slug: string): Doc {
  const file = path.join(dir(collection), `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ""),
    context: data.context ? String(data.context) : undefined,
    period: data.period ? String(data.period) : undefined,
    stack: Array.isArray(data.stack) ? data.stack.map(String) : undefined,
    featured: Boolean(data.featured),
    order: typeof data.order === "number" ? data.order : 999,
    status: data.status === "draft" ? "draft" : "published",
    nda: Boolean(data.nda),
    body: content,
  };
}

export function getAllDocs(collection: Collection): Doc[] {
  return getSlugs(collection)
    .map((slug) => getDoc(collection, slug))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getFeatured(): Doc[] {
  return getAllDocs("work").filter((d) => d.featured);
}

export interface Heading {
  id: string;
  text: string;
}

/**
 * Pulls level-2 headings out of MDX for the on-page nav. The slugs must match
 * what rehype-slug generates, so this mirrors its github-slugger behaviour:
 * lowercase, strip anything that is not a word character or space, spaces to
 * hyphens. Fenced code blocks are skipped so `## ` inside a snippet is ignored.
 */
export function getHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[1].replace(/`/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    headings.push({ id, text });
  }

  return headings;
}
