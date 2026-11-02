"use client";
import { useEffect } from "react";

export default function PageTitle({ title }) {
  useEffect(() => {
    document.title = `BookNook | ${title}`;
  }, [title]);
  return null;
}
