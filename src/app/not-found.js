import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <PageTitle title="Page Not Found" />
      <p className="font-[family-name:var(--font-display)] text-8xl font-extrabold text-primary">404</p>
      <h1 className="section-title">This page is not on our shelves</h1>
      <p className="section-lead">The link may be broken, or the page may have moved.</p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </section>
  );
}
