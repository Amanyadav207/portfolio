import { getAllDocs, type Doc } from "@/lib/content";
import { metrics, site } from "@/lib/site";
import { repoGroups } from "@/lib/repos";

/** One shared shape so all three previews render identical content. */
export function previewData() {
  const work = getAllDocs("work");
  return {
    site,
    metrics,
    repoGroups,
    work,
    featured: work.filter((d: Doc) => d.featured),
    rest: work.filter((d: Doc) => !d.featured),
  };
}
