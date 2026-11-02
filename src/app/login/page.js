"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";

const getRedirect = () => {
  const r = new URLSearchParams(window.location.search).get("redirect");
  return r && r.startsWith("/") ? r : "/";
};

export default function Login() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const { error } = await authClient.signIn.email({ email: f.get("email"), password: f.get("password") });
    setBusy(false);
    if (error) {
      const msg = "Email or password is incorrect. Please check and try again.";
      setError(msg);
      return toast.error(msg);
    }
    toast.success("Welcome back!");
    router.replace(getRedirect());
  }

  async function google() {
    await authClient.signIn.social({ provider: "google", callbackURL: getRedirect() });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <PageTitle title="Login" />
      <h1 className="section-title mb-2">Log in to BookNook</h1>
      <p className="section-lead mb-6">Pick up where you left off.</p>
      <form onSubmit={submit} className="space-y-4">
        {error && <div role="alert" className="alert alert-error alert-soft">{error}</div>}
        <label className="block"><span className="mb-1 block text-sm font-medium">Email</span>
          <input name="email" type="email" required className="input input-bordered w-full" placeholder="you@example.com" /></label>
        <label className="block"><span className="mb-1 block text-sm font-medium">Password</span>
          <input name="password" type="password" required className="input input-bordered w-full" placeholder="Your password" /></label>
        <button type="button" className="link link-hover text-sm" onClick={() => toast("Password reset is not available yet.", { icon: "ℹ️" })}>Forgot password?</button>
        <button className="btn btn-primary w-full" disabled={busy}>{busy && <span className="loading loading-spinner loading-xs" />}Login</button>
      </form>
      <div className="divider">or</div>
      <button onClick={google} className="btn btn-outline w-full"><FaGoogle />Continue with Google</button>
      <p className="mt-6 text-center text-sm">New here? <Link href="/register" className="link link-primary">Create an account</Link></p>
    </div>
  );
}
