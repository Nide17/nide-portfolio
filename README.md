# Nide Portfolio

A personal portfolio with an admin dashboard, project management, and basic analytics. Built with Next.js App Router, React, TypeScript, and Tailwind CSS. Connects to an external FastAPI backend.

## Features

- Responsive portfolio with few animations
- Projects showcase with dynamic data loading
- Admin dashboard with tabs (Projects, Messages, Visits, Downloads)
- Auth flows (login, register, forgot/reset password)
- Role-based access (admin only dashboard)
- Contact form with backend integration
- Activity tracking (visits/downloads)
- Server-side IP country lookup route for tracking
- Production-ready with Docker support
- TypeScript + modern React patterns

## Tech Stack

| Frontend              | Backend            | Tools        |
| --------------------- | ------------------ | ------------ |
| Next.js 16 App Router | FastAPI (external) | TypeScript   |
| React 19              | PostgreSQL         | ESLint       |
| Tailwind CSS          | SQLAlchemy         | Docker       |


## Quick Start

### Prerequisites
- Node.js 24.x
- Backend API URL in `.env.local`

```bash
# Clone & install
git clone <repo>
cd nide-portfolio
npm install

# Create env
touch .env.local
# Add: NEXT_PUBLIC_API_BASE_URL=https://fastapi-backend-domain.com

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker
```bash
docker build -t nide-portfolio .
```

## Project Structure

```
app/
├── api/              # Local server routes
├── components/       # Portfolio sections and shared UI
├── config/           # Frontend config
├── dashboard/        # Admin UI
├── forgot-password/  # Auth pages
├── login/
├── register/
├── reset-password/
├── lib/              # API helpers, icons, auth context
└── projects/         # Dynamic project pages
```

## Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=https://fastapi-backend-domain.com
# Backend base URL (public)
```

## Scripts

| Script           | Description       |
| ---------------- | ----------------- |
| `npm run dev`    | Start dev server  |
| `npm run build`  | Production build  |
| `npm run start`  | Production server |
| `npm run lint`   | Run ESLint        |
| `npm run docker` | Build Docker image |

## Admin Access

Dashboard requires `role: 'admin'` in auth response. Non-admins see:
```
- Unauthorized component with login/home links
- Immediate block (no data loading)
```

## Backend Integration

Frontend calls external FastAPI:
- `/projects` - CRUD projects
- `/messages` - Contact form submissions
- `/visits`, `/downloads` - Analytics

Frontend also exposes a local route:
- `/api/ip-country` - server-side country lookup for visit/download tracking

## License

MIT
