"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { CATEGORIES, uploadImage } from "@/lib/api";

// Shared by Add Book and Edit Book. onSubmit receives the clean payload.
export default function BookForm({ initial, user, submitLabel, onSubmit, onCancel }) {
  const [saving, setSaving] = useState(false);

  async function handle(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const file = f.get("image");
    setSaving(true);
    try {
      let image = initial?.image;
      if (file && file.size > 0) image = await uploadImage(file);
      if (!image) throw new Error("Please choose a book image.");
      await onSubmit({
        title: f.get("title"),
        author: f.get("author"),
        category: f.get("category"),
        totalCopies: Number(f.get("totalCopies")),
        description: f.get("description"),
        image,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handle} className="grid gap-4 sm:grid-cols-2">
      <label className="form-control sm:col-span-2">
        <span className="mb-1 block text-sm font-medium">Book title</span>
        <input name="title" required defaultValue={initial?.title} className="input input-bordered w-full" placeholder="The Left Hand of Darkness" />
      </label>
      <label className="form-control">
        <span className="mb-1 block text-sm font-medium">Author name</span>
        <input name="author" required defaultValue={initial?.author} className="input input-bordered w-full" placeholder="Ursula K. Le Guin" />
      </label>
      <label className="form-control">
        <span className="mb-1 block text-sm font-medium">Category</span>
        <select name="category" required defaultValue={initial?.category || ""} className="select select-bordered w-full">
          <option value="" disabled>Choose a category</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label className="form-control">
        <span className="mb-1 block text-sm font-medium">Total copies</span>
        <input name="totalCopies" type="number" min="1" max="1000" required defaultValue={initial?.totalCopies ?? 1} className="input input-bordered w-full" />
      </label>
      <label className="form-control">
        <span className="mb-1 block text-sm font-medium">Book image {initial && "(leave empty to keep current)"}</span>
        <input name="image" type="file" accept="image/*" required={!initial} className="file-input file-input-bordered w-full" />
      </label>
      <label className="form-control sm:col-span-2">
        <span className="mb-1 block text-sm font-medium">Short description</span>
        <textarea name="description" required rows={4} defaultValue={initial?.description} className="textarea textarea-bordered w-full" placeholder="What is this book about?" />
      </label>
      <label className="form-control">
        <span className="mb-1 block text-sm font-medium">Your name</span>
        <input readOnly value={initial?.addedByName ?? user?.name ?? ""} className="input input-bordered w-full opacity-70" />
      </label>
      <label className="form-control">
        <span className="mb-1 block text-sm font-medium">Your email</span>
        <input readOnly value={initial?.addedByEmail ?? user?.email ?? ""} className="input input-bordered w-full opacity-70" />
      </label>
      <div className="flex justify-end gap-2 sm:col-span-2">
        {onCancel && <button type="button" className="btn" onClick={onCancel} disabled={saving}>Cancel</button>}
        <button className="btn btn-primary" disabled={saving}>
          {saving && <span className="loading loading-spinner loading-xs" />}{submitLabel}
        </button>
      </div>
    </form>
  );
}
