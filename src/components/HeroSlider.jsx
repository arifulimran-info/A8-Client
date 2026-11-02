"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { title: "Add a book. Borrow a book. Return a book.", text: "BookNook keeps lending simple: share what you own and read what others have shared.", bg: "from-primary to-secondary" },
  { title: "Borrow for a few days, then pass it on", text: "Pick a return date that suits you. We track copies so nobody waits on a book that is already out.", bg: "from-secondary to-primary" },
  { title: "Your shelf helps the next reader", text: "Added a book you finished? List it in a minute, with copies and a cover, and let others enjoy it.", bg: "from-primary to-accent" },
];

export default function HeroSlider() {
  return (
    <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="rounded-box">
      {slides.map((s) => (
        <SwiperSlide key={s.title}>
          <div className={`flex min-h-[420px] flex-col items-start justify-center gap-5 bg-linear-to-br ${s.bg} px-8 py-16 text-primary-content sm:px-16`}>
            <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{s.title}</h1>
            <p className="max-w-xl text-base opacity-90 sm:text-lg">{s.text}</p>
            <Link href="/books" className="btn btn-accent">Browse Books</Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
