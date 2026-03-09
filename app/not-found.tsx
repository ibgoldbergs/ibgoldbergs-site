import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-heading">
        404
      </h1>
      <p className="mt-4 text-muted">This page could not be found.</p>
      <Link
        href="/"
        className="mt-8 text-sm text-foreground underline underline-offset-4 transition-colors hover:text-heading"
      >
        Go home
      </Link>
    </div>
  );
}
