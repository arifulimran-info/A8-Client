const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Works on the server (public calls) and in the browser (public + JWT calls)
export async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (auth) {
    const { authClient } = await import("./auth-client");
    const { data } = await authClient.token();
    if (!data?.token) throw new Error("Please log in again to continue.");
    headers.Authorization = `Bearer ${data.token}`;
  }
  const res = await fetch(API + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Something went wrong. Please try again.");
  return json;
}

export async function getBooks(query = "") {
  try {
    return await apiFetch(`/books${query ? `?${query}` : ""}`, { auth: false });
  } catch {
    return [];
  }
}

export async function uploadImage(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload key is missing. Add NEXT_PUBLIC_IMGBB_KEY.");
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  const json = await res.json();
  if (!json.success) throw new Error("Image upload failed. Try a smaller image.");
  return json.data.display_url;
}

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
