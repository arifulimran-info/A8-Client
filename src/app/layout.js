import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "BookNook | Home",
  description: "BookNook is a small online library. Add a book, borrow a book, return a book.",
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="flex min-h-screen flex-col bg-base-100 text-base-content">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
