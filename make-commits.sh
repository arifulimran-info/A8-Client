#!/usr/bin/env bash
# Creates feature-by-feature commits. Run once inside the client repo after `git init`.
set -e
c() { git add "$@" 2>/dev/null || true; git commit -m "$MSG" || true; }
MSG="chore: initialise Next.js, Tailwind and daisyUI";                 c package.json postcss.config.mjs jsconfig.json next.config.mjs .gitignore
MSG="chore: add environment template";                                 c .env.example
MSG="style: booknook light and dark daisyUI themes and fonts";         c src/app/globals.css
MSG="feat: BetterAuth server config with MongoDB adapter and JWT";     c src/lib/auth.js "src/app/api"
MSG="feat: auth client and API helper with bearer token";              c src/lib/auth-client.js src/lib/api.js
MSG="feat: logo, spinner, page title and theme toggle";                c src/components/Logo.jsx src/components/Spinner.jsx src/components/PageTitle.jsx src/components/ThemeToggle.jsx
MSG="feat: responsive navbar with auth-aware links and user dropdown"; c src/components/Navbar.jsx
MSG="feat: footer with contact info and X logo";                       c src/components/Footer.jsx
MSG="feat: root layout with toaster and loading state";                c src/app/layout.js src/app/loading.js
MSG="feat: Swiper hero slider";                                        c src/components/HeroSlider.jsx
MSG="feat: book card and grid with Framer Motion";                     c src/components/BookCard.jsx src/components/BookGrid.jsx
MSG="feat: home page with new arrivals and two extra sections";        c src/app/page.js
MSG="feat: login page with Google and redirect back";                  c src/app/login
MSG="feat: register page with password validation";                    c src/app/register
MSG="feat: PrivateRoute that survives page reload";                    c src/components/PrivateRoute.jsx
MSG="feat: all books page with search and category filter";            c src/app/books/page.js
MSG="feat: reusable book form with imgbb upload";                      c src/components/BookForm.jsx
MSG="feat: add book page with total copies";                           c src/app/add-book
MSG="feat: book details page with borrow modal";                       c "src/app/books/[id]"
MSG="feat: my books with edit modal and delete confirm";               c src/components/ConfirmModal.jsx src/app/my-books
MSG="feat: my borrows table and return flow";                          c src/app/my-borrows
MSG="feat: profile page and custom 404";                               c src/app/my-profile src/app/not-found.js
MSG="docs: README with live link and features";                        c README.md make-commits.sh
