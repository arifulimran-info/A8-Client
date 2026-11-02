import BookCard from "./BookCard";

export default function BookGrid({ books, empty = "No books here yet." }) {
  if (!books.length) return <p className="rounded-box border border-dashed border-base-300 p-10 text-center opacity-75">{empty}</p>;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((b) => <BookCard key={b._id} book={b} />)}
    </div>
  );
}
