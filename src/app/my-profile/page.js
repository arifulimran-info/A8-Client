"use client";
import PrivateRoute from "@/components/PrivateRoute";
import PageTitle from "@/components/PageTitle";
import { authClient } from "@/lib/auth-client";

function Profile() {
  const { data } = authClient.useSession();
  const u = data.user;
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <PageTitle title="My Profile" />
      <div className="flex flex-col items-center gap-3 rounded-box border border-base-300 p-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`} alt={u.name} referrerPolicy="no-referrer" className="h-24 w-24 rounded-full object-cover ring ring-primary ring-offset-2 ring-offset-base-100" />
        <h1 className="section-title">{u.name}</h1>
        <p className="opacity-75">{u.email}</p>
      </div>
    </div>
  );
}

export default function Page() { return <PrivateRoute><Profile /></PrivateRoute>; }
