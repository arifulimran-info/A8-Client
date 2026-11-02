"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";

function validatePassword(p) {
  if (p.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(p)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(p)) return "Password must include a lowercase letter.";
  return "";
}

export default function Register() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const problem = validatePassword(f.get("password"));
    if (problem) { setError(problem); return toast.error(problem); }
    setBusy(true);
    setError("");
    const { error } = await authClient.signUp.email({
      name: f.get("name"),
      email: f.get("email"),
      password: f.get("password"),
      image: f.get("photo"),
    });
    setBusy(false);
    if (error) {
      const msg = error.message || "We could not create your account. Please try again.";
      setError(msg);
      return toast.error(msg);
    }
    toast.success("Account created. Please log in.");
    router.push("/login");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <PageTitle title="Register" />
      <h1 className="section-title mb-2">Create your account</h1>
      <p className="section-lead mb-6">It takes less than a minute.</p>
      <form onSubmit={submit} className="space-y-4">
        {error && <div role="alert" className="alert alert-error alert-soft">{error}</div>}
        <label className="block"><span className="mb-1 block text-sm font-medium">Name</span>
          <input name="name" required className="input input-bordered w-full" placeholder="Your full name" /></label>
        <label className="block"><span className="mb-1 block text-sm font-medium">Email</span>
          <input name="email" type="email" required className="input input-bordered w-full" placeholder="you@example.com" /></label>
        <label className="block"><span className="mb-1 block text-sm font-medium">Photo URL</span>
          <input name="photo" type="url" required className="input input-bordered w-full" placeholder="https://…/me.jpg" /></label>
        <label className="block"><span className="mb-1 block text-sm font-medium">Password</span>
          <input name="password" type="password" required className="input input-bordered w-full" placeholder="6+ characters, upper and lower case" /></label>
        <button className="btn btn-primary w-full" disabled={busy}>{busy && <span className="loading loading-spinner loading-xs" />}Register</button>
      </form>
      <div className="divider">or</div>
      <button onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })} className="btn btn-outline w-full"><FaGoogle />Continue with Google</button>
      <p className="mt-6 text-center text-sm">Already have an account? <Link href="/login" className="link link-primary">Login</Link></p>
    </div>
  );
}
