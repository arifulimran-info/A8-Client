"use client";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { authClient } from "@/lib/auth-client";
import { apiFetch, formatDate } from "@/lib/api";

function Details({ id }) {
  const { data } = authClient.useSession();
  const user = data.user;
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");
  const [borrowed, setBorrowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [b, mine] = await Promise.all([
          apiFetch(`/books/${id}`),
          apiFetch("/borrows"),
        ]);
        setBook(b);
        setBorrowed(mine.some((m) => m.bookId === id));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [id]);

  async function confirmBorrow(e) {
    e.preventDefault();
    const days = Number(new FormData(e.currentTarget).get("days"));
    setBusy(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: { bookId: id, days },
      });
      toast.success(`"${book.title}" is yours for ${days} days.`);
      setBook({ ...book, availableCopies: book.availableCopies - 1 });
      setBorrowed(true);
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (error)
    return (
      <p className="mx-auto max-w-xl p-10 text-center text-error">{error}</p>
    );
  if (!book) return <Spinner label="Loading book" />;

  const unavailable = book.availableCopies < 1;
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2">
      <PageTitle title={book.title} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={book.image}
        alt={book.title}
        className="h-[28rem] w-full rounded-box border border-base-300 object-cover"
      />
      <div className="space-y-4">
        <h1 className="section-title">{book.title}</h1>
        <p className="text-lg opacity-80">by {book.author}</p>
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary badge-outline">
            {book.category}
          </span>
          <span
            className={`badge ${unavailable ? "badge-error" : "badge-success"}`}>
            {book.availableCopies} of {book.totalCopies} copies available
          </span>
        </div>
        <p className="leading-relaxed">{book.description}</p>
        <p className="text-sm opacity-70">
          Added by {book.addedByName} ({book.addedByEmail}) on{" "}
          {formatDate(book.createdAt)}
        </p>
        <button
          className="btn btn-primary"
          disabled={unavailable || borrowed}
          onClick={() => setOpen(true)}>
          {borrowed
            ? "Already Borrowed"
            : unavailable
              ? "Not Available"
              : "Borrow This Book"}
        </button>
      </div>

      {open && (
        <dialog className="modal modal-open">
          <form onSubmit={confirmBorrow} className="modal-box space-y-3">
            <h3 className="text-lg font-bold">Borrow “{book.title}”</h3>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Your name</span>
              <input
                readOnly
                value={user.name}
                className="input input-bordered w-full opacity-70"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Your email</span>
              <input
                readOnly
                value={user.email}
                className="input input-bordered w-full opacity-70"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">
                Keep it for
              </span>
              <select
                name="days"
                defaultValue="7"
                className="select select-bordered w-full">
                {[3, 5, 7, 14].map((d) => (
                  <option key={d} value={d}>
                    {d} days
                  </option>
                ))}
              </select>
            </label>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setOpen(false)}
                disabled={busy}>
                Cancel
              </button>
              <button className="btn btn-primary" disabled={busy}>
                {busy && (
                  <span className="loading loading-spinner loading-xs" />
                )}
                Confirm Borrow
              </button>
            </div>
          </form>
          <div
            className="modal-backdrop"
            onClick={() => !busy && setOpen(false)}
          />
        </dialog>
      )}
    </div>
  );
}

export default function BookDetailsPage({ params }) {
  const { id } = use(params);
  return (
    <PrivateRoute>
      <Details id={id} />
    </PrivateRoute>
  );
}
