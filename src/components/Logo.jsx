import Link from "next/link";
import { FaBookOpen } from "react-icons/fa6";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-primary">
      <FaBookOpen className="text-2xl text-accent" />
      <span className="brand">BookNook</span>
    </Link>
  );
}
