import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { DiagramSlot, Facts, NdaNote, Todo } from "./callouts";
import { FanOutTree, FlatVsTree } from "./diagrams/fan-out";
import { AxParity } from "./diagrams/ax-parity";
import { ConfluxArch } from "./diagrams/conflux-arch";
import { TickerArch } from "./diagrams/ticker-arch";
import { ConfluxDemo } from "./conflux-demo-loader";

const components = {
  Todo,
  NdaNote,
  DiagramSlot,
  Facts,
  FanOutTree,
  FlatVsTree,
  AxParity,
  ConfluxArch,
  TickerArch,
  ConfluxDemo,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "append",
                  properties: { className: "heading-anchor", ariaHidden: true, tabIndex: -1 },
                  content: { type: "text", value: "#" },
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
