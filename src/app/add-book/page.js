"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import PageTitle from "@/components/PageTitle";
import BookForm from "@/components/BookForm";
import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

function AddBook() {
  const { data } = authClient.useSession();
  const router = useRouter();

  async function add(payload) {
    await apiFetch("/books", { method: "POST", body: payload });
    toast.success("Book added to the library.");
    router.push("/my-books");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <PageTitle title="Add Book" />
      <h1 className="section-title">Add a book</h1>
      <p className="section-lead mb-8 mt-2">Share a book with other readers.</p>
      <BookForm user={data.user} submitLabel="Add Book" onSubmit={add} />
    </div>
  );
}

export default function Page() { return <PrivateRoute><AddBook /></PrivateRoute>; }
