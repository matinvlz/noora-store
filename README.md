# نورا | Noora Store

> فروشگاه آنلاین گوشی موبایل — یک استورفرانت کامل، راست‌به‌چپ (RTL) و فارسی.

**Noora** is a production-grade, fully right-to-left (RTL) Persian e-commerce
storefront for mobile phones. It ships with a product catalog, deals with live
countdown timers, cart & wishlist, a guest-checkout flow, a blog, and an
embedded Sanity Studio for content editing.

---

## ✨ Overview

- **زبان / Language:** Persian (fa-IR), full RTL layout
- **دامنه / Domain:** Online phone store — catalog, deals, cart, checkout, blog
- **Content:** Driven by Sanity CMS via GROQ, with a built-in fallback dataset so
  the storefront stays fully functional before the CMS is wired.
- **Auth:** Custom mobile **OTP** login flow (mock provider, swappable).
- **State:** Cart, wishlist and auth persisted client-side with Zustand.

---

## 🧱 Tech Stack

| Area              | Technology                                  |
| ----------------- | ------------------------------------------- |
| Framework         | **Next.js 14** (App Router, RSC)            |
| Language          | **TypeScript** (strict)                     |
| Styling           | **Tailwind CSS** + custom design tokens     |
| UI primitives     | **shadcn/ui** (Radix-based, themed)         |
| State management  | **Zustand** (+ `persist` to localStorage)   |
| CMS               | **Sanity** (embedded Studio at `/studio`)   |
| Animation         | **Framer Motion**                           |
| Testing           | **Playwright** (E2E)                        |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ (or 20+)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see below). Without Sanity credentials the
#    storefront automatically serves the bundled fallback content.
cp .env.local.example .env.local

# 3. Start the dev server
npm run dev          # http://localhost:3000

# 4. Production build
npm run build && npm run start
```

### Tests

```bash
npm test             # run the Playwright E2E suite (headless)
npm run test:headed  # run with a visible browser
```

---

## 🔧 Environment variables

Create `.env.local` (copy from `.env.local.example`):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=        # your Sanity project id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-01
SANITY_API_READ_TOKEN=                # only for drafts / private datasets
```

As soon as `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, the storefront stops using the
bundled fallback data and serves **live content** from your dataset via the GROQ
queries in `lib/sanity/queries.ts`. The embedded Studio is available at
[`/studio`](http://localhost:3000/studio).

---

## 🔐 Custom OTP login flow

Noora uses a **one-time-password (OTP) login over mobile number** instead of a
password. The logic lives in `lib/store/auth.ts` (a Zustand store) and is
intentionally isolated so the mock can be swapped for a real SMS provider
(Kavenegar, Twilio, …) without touching any UI.

**Flow:**

1. **Enter mobile** — the user types an Iranian mobile number (validated against
   `^09\d{9}$`). `requestOtp(mobile, name?)` generates a code and stores the
   pending mobile/code/name in memory.
2. **Receive code** — in this mock build the code is returned to the client so a
   demo hint can be shown (the demo code is **`1234`**). In production this step
   is replaced by an SMS send; the code never reaches the client.
3. **Verify** — the user enters the code; `verifyOtp(code)` compares it to the
   pending code. On success the authenticated user `{ name, mobile }` is stored
   and **persisted to `localStorage`** (key `noora-auth`); pending OTP state is
   kept only in memory and cleared.
4. **Session** — protected routes such as `/profile` read the persisted user and
   redirect to `/auth/login` when none exists. `logout()` clears the session.

To wire a real provider, replace the bodies of `requestOtp` / `verifyOtp` with
calls to your SMS API and verification endpoint — the component contract stays
identical.

---

## 📁 Project structure

```
app/            # App Router routes (home, products, deals, cart, checkout,
                # blog, profile, auth, embedded /studio)
components/     # UI components (Header, Footer, ProductCard, DiscountsSection…)
  └─ ui/        # shadcn/ui primitives (button, input, badge, sheet)
lib/
  ├─ sanity/    # client, GROQ queries, data fetchers, fallback dataset
  ├─ store/     # Zustand stores (cart, wishlist, auth)
  └─ utils.ts   # helpers (Toman formatting, safe image URLs, cn)
sanity/         # Sanity schema types
e2e/            # Playwright tests
types/          # shared TypeScript types
```

---

## 📝 License

Private project. All rights reserved.
