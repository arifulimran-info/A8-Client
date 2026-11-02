import Link from "next/link";
import BookGrid from "@/components/BookGrid";
import { getBooks, CATEGORIES } from "@/lib/api";

export const metadata = { title: "BookNook | All Books" };
export const dynamic = "force-dynamic";

export default async function AllBooks({ searchParams }) {
  const { category = "All", search = "" } = await searchParams;
  const params = new URLSearchParams();
  if (category !== "All") params.set("category", category);
  if (search) params.set("search", search);
  const books = await getBooks(params.toString());

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="section-title">All books</h1>
      <p className="section-lead mb-6 mt-2">Every book on the shelves, newest first.</p>

      <form className="mb-4 flex flex-col gap-3 sm:flex-row">
        {category !== "All" && <input type="hidden" name="category" value={category} />}
        <input name="search" defaultValue={search} placeholder="Search by title" className="input input-bordered w-full sm:max-w-sm" />
        <button className="btn btn-primary">Search</button>
      </form>

      <div className="mb-8 flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <Link key={c} href={c === "All" ? "/books" : `/books?category=${c}`} className={`btn btn-sm ${category === c ? "btn-primary" : "btn-outline"}`}>{c}</Link>
        ))}
      </div>

      <BookGrid books={books} empty="No books match this search." />
    </div>
  );
}
