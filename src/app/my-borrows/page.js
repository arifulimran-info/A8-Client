"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import { apiFetch, formatDate } from "@/lib/api";

function MyBorrows() {
  const [rows, setRows] = useState(null);
  const [returning, setReturning] = useState(null);

  useEffect(() => {
    apiFetch("/borrows").then(setRows).catch((e) => { toast.error(e.message); setRows([]); });
  }, []);

  async function giveBack(b) {
    setReturning(b._id);
    try {
      await apiFetch(`/borrows/${b._id}`, { method: "DELETE" });
      setRows((r) => r.filter((x) => x._id !== b._id));
      toast.success(`“${b.bookTitle}” returned. Thank you!`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setReturning(null);
    }
  }

  if (!rows) return <Spinner label="Loading your borrows" />;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <PageTitle title="My Borrows" />
      <h1 className="section-title">My borrows</h1>
      <p className="section-lead mb-8 mt-2">Books you have right now. Return them when you finish.</p>
      {rows.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="mb-4 opacity-75">You have not borrowed anything yet.</p>
          <Link href="/books" className="btn btn-primary">Browse Books</Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300">
          <table className="table">
            <thead><tr><th>Cover</th><th>Title</th><th>Borrow date</th><th>Return date</th><th /></tr></thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b._id}>
                  <td>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={b.bookImage} alt={b.bookTitle} className="h-16 w-12 rounded object-cover" /></td>
                  <td className="font-semibold">{b.bookTitle}</td>
                  <td>{formatDate(b.borrowDate)}</td>
                  <td>{formatDate(b.returnDate)}</td>
                  <td className="text-right">
                    <button className="btn btn-sm btn-primary" onClick={() => giveBack(b)} disabled={returning === b._id}>
                      {returning === b._id && <span className="loading loading-spinner loading-xs" />}Return Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Page() { return <PrivateRoute><MyBorrows /></PrivateRoute>; }
