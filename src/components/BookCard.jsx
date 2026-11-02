"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BookCard({ book }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-200"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={book.image} alt={book.title} className="h-64 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-1 text-lg font-bold">{book.title}</h3>
        <p className="line-clamp-1 text-sm opacity-75">by {book.author}</p>
        <span className="badge badge-outline badge-primary mt-1">{book.category}</span>
        <Link href={`/books/${book._id}`} className="btn btn-primary mt-auto w-full">View Details</Link>
      </div>
    </motion.article>
  );
}
