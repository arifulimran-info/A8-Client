"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Spinner from "./Spinner";

// Waits for the session check, so a reload on a private page never bounces to /login
export default function PrivateRoute({ children }) {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !data) router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [isPending, data, pathname, router]);

  if (isPending || !data) return <Spinner label="Checking your session" />;
  return children;
}
