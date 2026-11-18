# 🛒 FreshCart

An online grocery store front-end built with **React 19**, **Vite**, **Tailwind CSS v4** and **React Router**.

## Features

- Browse products with category filters and live search
- Product details page
- Shopping cart (add, update quantity, remove, clear)
- Checkout flow with order confirmation
- Register / Login forms (Formik)
- Responsive layout
- Loading and error states with retry
- Cart persisted across refreshes
- Login state shown in the navbar (with logout)

## Tech stack

| Area      | Tools                          |
| --------- | ------------------------------ |
| UI        | React 19, Tailwind CSS 4       |
| Routing   | React Router 7                 |
| Forms     | Formik                         |
| HTTP      | Axios                          |
| Tooling   | Vite 8, ESLint 9               |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) configure the API URL
cp .env.example .env

# 3. Start the dev server
npm run dev
```

### Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start the dev server           |
| `npm run build`   | Create a production build      |
| `npm run preview` | Preview the production build   |
| `npm run lint`    | Run ESLint                     |

## Environment variables

| Variable       | Description                  | Default                                  |
| -------------- | ---------------------------- | ---------------------------------------- |
| `VITE_API_URL` | Products endpoint (full URL) | `https://api-xh9w.onrender.com/products` |

> The default API runs on a free Render instance, so the first request after
> a period of inactivity can take up to a minute.

## Project structure

```
src/
├── components/     # UI components, one folder per component
├── context/        # Product + cart state (React Context)
├── assets/         # Images
├── App.jsx         # Routes
└── main.jsx        # Entry point
```

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new) — Vite is detected automatically
   (build: `npm run build`, output: `dist`).
3. Add `VITE_API_URL` under *Settings → Environment Variables* if you use a custom API.

`vercel.json` rewrites all routes to `index.html`, so refreshing on `/shop` or
`/product/:id` works.

## Known limitations

This is a front-end demo:

- Login/Register store users in `localStorage` (plain text) — not for real use.
- The cart is saved in `localStorage` (per browser, not per account).
- Checkout does not process real payments or save orders.

## Roadmap

- [ ] Real authentication (JWT) and protected routes
- [ ] Order history
- [ ] Unit tests
