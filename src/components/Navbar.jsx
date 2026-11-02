"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    ...(user
      ? [
          { href: "/add-book", label: "Add Book" },
          { href: "/my-books", label: "My Books" },
          { href: "/my-borrows", label: "My Borrows" },
        ]
      : []),
  ];

  async function logout() {
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
  }

  const items = links.map((l) => (
    <li key={l.href}>
      <Link href={l.href} className={pathname === l.href ? "font-semibold text-primary" : ""}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost btn-circle lg:hidden" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h10" /></svg>
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow">
              {items}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{items}</ul>
        </div>
        <div className="navbar-end gap-1">
          <ThemeToggle />
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Account menu">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} alt={user.name} referrerPolicy="no-referrer" />
                </div>
              </button>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow">
                <li className="menu-title text-base-content">{user.name}</li>
                <li><Link href="/my-profile">My Profile</Link></li>
                <li><button onClick={logout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm sm:btn-md">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
