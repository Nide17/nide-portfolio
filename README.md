# Nide Portfolio

A personal portfolio website with a simple admin area, built with Next.js, React, TypeScript, and Tailwind CSS.

## Why

This project is meant to show my work, share basic profile information, and make it easy for people to get in touch. It also includes a small admin area for managing projects and checking simple activity data.

## What It Does

- Shows the public portfolio site.
- Loads project data from a separate FastAPI backend.
- Sends contact messages and tracks visits and downloads.
- Includes login, registration, a dashboard, and project management pages.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- External FastAPI backend

## Project Shape

Most of the frontend code lives in `app/`:

- `app/page.tsx`: public landing page
- `app/components/`: reusable UI sections such as `Welcome`, `About`, `Projects`, and `Contact`
- `app/lib/api.ts`: frontend helpers for calling the FastAPI backend
- `app/lib/auth-context.tsx`: client auth state and auth actions
- `app/dashboard/`: admin dashboard
- `app/admin/projects/`: create, edit, and delete projects
- `app/config/index.ts`: frontend config that reads from environment variables

## Backend Integration

This repo is the frontend only. It does not currently expose its own app API routes. Instead, it calls a separate FastAPI service, and the base URL is set through environment variables.

## Environment

Create `.env.local` from `.env.example` and set:

```bash
NEXT_PUBLIC_API_BASE_URL=https://fastapi-nide-portfolio-d1b1c5e7aeea.herokuapp.com
```

If you are running the backend locally, point it to your local API instead:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## Run Locally

Requirements:

- Node.js 18.x

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev    # start local development server
npm run build  # production build
npm run start  # run built app
npm run lint   # lint the codebase
```

## Development Process

1. Start the FastAPI backend and set `NEXT_PUBLIC_API_BASE_URL`.
2. Run `npm run dev`.
3. Make your UI or integration changes in `app/`.
4. Run `npm run lint` before pushing changes.
5. Run `npm run build` to catch production issues early.

## Notes

- `app/lib/api.ts` is shared frontend code used to call the backend.
- `app/api/` is not used right now. If you add it later, it would contain Next.js route handlers.
- `NEXT_PUBLIC_API_BASE_URL` is public, so it should never contain secrets.
