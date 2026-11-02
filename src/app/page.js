import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import BookGrid from "@/components/BookGrid";
import { getBooks, CATEGORIES } from "@/lib/api";

export const metadata = { title: "BookNook | Home" };
export const dynamic = "force-dynamic";

const steps = [
  { title: "Add what you have", text: "List a book with its cover, category and number of copies." },
  { title: "Borrow what you want", text: "Confirm a borrow and choose how many days you need." },
  { title: "Return when done", text: "Return it from My Borrows and the copy goes back on the shelf." },
];

const categoryNotes = {
  Fiction: "Novels and short stories",
  Science: "Ideas that explain the world",
  History: "People, places and past events",
  Kids: "Picture books and early readers",
  Others: "Everything that does not fit",
};

export default async function Home() {
  const latest = await getBooks("limit=6");
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-6">
      <HeroSlider />

      <section>
        <h2 className="section-title">New arrivals</h2>
        <p className="section-lead mb-8 mt-2">The six newest books added by our readers.</p>
        <BookGrid books={latest} empty="No books yet. Be the first to add one." />
        <div className="mt-8 text-center"><Link href="/books" className="btn btn-primary">See All Books</Link></div>
      </section>

      <section>
        <h2 className="section-title">How borrowing works</h2>
        <p className="section-lead mb-8 mt-2">Three steps, no paperwork.</p>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-box border border-base-300 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-accent-content">{i + 1}</span>
              <div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 opacity-75">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="section-title">Browse by category</h2>
        <p className="section-lead mb-8 mt-2">Start with the shelf you like best.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/books?category=${c}`} className="flex h-full flex-col justify-between gap-2 rounded-box bg-primary p-5 text-primary-content transition-colors hover:bg-secondary">
              <span className="text-xl font-bold">{c}</span>
              <span className="text-sm opacity-85">{categoryNotes[c]}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
