# BookNook

A small online library: **add a book, borrow a book, return a book.**

**Live site:** https://your-booknook.vercel.app
**Server repo:** link your server repository here

## Features
- Email/password and Google login with BetterAuth and the MongoDB adapter, with redirect back to the page you wanted
- Swiper hero slider and a New Arrivals section loaded from MongoDB (newest first, limit 6)
- Add, edit and delete your own books, with image upload to imgbb and a confirm modal for deletes
- Borrow system with copy tracking (`$inc`), a "Not Available" state, and no double borrowing
- JWT-protected API calls verified by the Express server
- Dark and light theme toggle, Framer Motion animations, toast messages, custom 404 and per-page titles

## Tech
Next.js (App Router), Tailwind CSS, daisyUI, BetterAuth, MongoDB, Swiper, Framer Motion.

## Run locally
```
cp .env.example .env.local   # fill in values
npm install
npm run dev
```
Google login: in Google Cloud Console add `http://localhost:3000/api/auth/callback/google` (and your live URL equivalent) as an authorized redirect URI.
