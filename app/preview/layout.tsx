/**
 * Bare layout — previews own the whole page so each design can set its own
 * background, type and chrome without the site shell interfering.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
