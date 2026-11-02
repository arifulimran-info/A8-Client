import Link from "next/link";
import { FaFacebookF, FaGithub, FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
  const social = [
    { href: "https://x.com", label: "X", Icon: FaXTwitter },
    { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
    { href: "https://github.com", label: "GitHub", Icon: FaGithub },
  ];
  return (
    <footer className="mt-20 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <div className="[&_a]:text-neutral-content"><Logo /></div>
          <p className="max-w-xs text-sm opacity-80">A small online library where you add a book, borrow a book, and return a book.</p>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="font-semibold">Contact</h3>
          <p className="opacity-80">12 Reading Lane, Dhaka 1205</p>
          <p className="opacity-80">hello@booknook.example</p>
          <p className="opacity-80">+880 1700 000000</p>
        </div>
        <div className="space-y-3 text-sm">
          <h3 className="font-semibold">Explore</h3>
          <div className="flex gap-4 opacity-80">
            <Link href="/books" className="link link-hover">All Books</Link>
            <Link href="/login" className="link link-hover">Login</Link>
          </div>
          <div className="flex gap-2 pt-1">
            {social.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="btn btn-circle btn-sm btn-outline border-neutral-content/40 text-neutral-content">
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="border-t border-neutral-content/15 py-4 text-center text-xs opacity-70">© {new Date().getFullYear()} BookNook. All rights reserved.</p>
    </footer>
  );
}
