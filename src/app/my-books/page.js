"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaPen, FaTrash } from "react-icons/fa6";
import PrivateRoute from "@/components/PrivateRoute";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import BookForm from "@/components/BookForm";
import ConfirmModal from "@/components/ConfirmModal";
import { authClient } from "@/lib/auth-client";
import { apiFetch, getBooks } from "@/lib/api";

function MyBooks() {
  const { data } = authClient.useSession();
  const user = data.user;
  const [books, setBooks] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBooks(await getBooks(`email=${encodeURIComponent(user.email)}`));
  }, [user.email]);
  useEffect(() => { load(); }, [load]);

  async function save(payload) {
    await apiFetch(`/books/${editing._id}`, { method: "PATCH", body: payload });
    toast.success("Book updated.");
    setEditing(null);
    load();
  }

  async function remove() {
    setBusy(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((b) => b.filter((x) => x._id !== deleting._id));
      toast.success("Book deleted.");
      setDeleting(null);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (!books) return <Spinner label="Loading your books" />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PageTitle title="My Books" />
      <h1 className="section-title">My books</h1>
      <p className="section-lead mb-8 mt-2">Books you added. Edit the details or remove them.</p>

      {books.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="mb-4 opacity-75">You have not added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary">Add Book</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead><tr><th>Cover</th><th>Title</th><th>Category</th><th>Copies</th><th className="text-right">Actions</th></tr></thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.image} alt={b.title} className="h-16 w-12 rounded object-cover" /></td>
                  <td><Link href={`/books/${b._id}`} className="font-semibold hover:text-primary">{b.title}</Link><div className="text-xs opacity-70">{b.author}</div></td>
                  <td>{b.category}</td>
                  <td>{b.availableCopies} / {b.totalCopies}</td>
                  <td className="space-x-2 text-right">
                    <button className="btn btn-sm btn-outline btn-primary" onClick={() => setEditing(b)}><FaPen />Edit</button>
                    <button className="btn btn-sm btn-outline btn-error" onClick={() => setDeleting(b)}><FaTrash />Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="mb-4 text-lg font-bold">Edit book</h3>
            <BookForm initial={editing} user={user} submitLabel="Save Changes" onSubmit={save} onCancel={() => setEditing(null)} />
          </div>
          <div className="modal-backdrop" onClick={() => setEditing(null)} />
        </dialog>
      )}

      <ConfirmModal
        open={!!deleting}
        title="Delete this book?"
        message={deleting ? `“${deleting.title}” will be removed from the library. This cannot be undone.` : ""}
        confirmLabel="Delete Book"
        busy={busy}
        onConfirm={remove}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

export default function Page() { return <PrivateRoute><MyBooks /></PrivateRoute>; }
