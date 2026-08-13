import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-shell px-6 py-24">
      <p className="label">404</p>
      <h1 className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-semibold">Page not found</h1>
      <p className="mt-3 max-w-prose text-[15px] text-muted">
        That page does not exist.{" "}
        <Link href="/" className="link">
          Back to the index
        </Link>
        .
      </p>
    </div>
  );
}
