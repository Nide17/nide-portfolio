# Nide Portfolio

A personal portfolio with **admin dashboard**, project management, and analytics. Built with Next.js App Router, React, TypeScript, and Tailwind CSS. Connects to external FastAPI backend.

## Features

- Responsive portfolio with few animations
- Projects showcase with dynamic data loading
- Admin dashboard with tabs (Projects, Messages, Visits, Downloads)
- Role-based access (admin only dashboard)
- Contact form with backend integration
- Activity tracking (visits/downloads)
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
- Node.js 18+
- Backend API URL (NEXT_PUBLIC_API_BASE_URL in .env)

```bash
# Clone & install
git clone <repo>
cd nide-portfolio
npm install

# Create env
touch .env.local
# Add: NEXT_PUBLIC_API_BASE_URL=https://fastapi-backend-domain.com

# Build
npm run build

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker
```bash
docker-compose up --build
```

## Project Structure

```
app/
├── components/     # Portfolio sections (About, Projects, Contact)
├── dashboard/      # Admin UI + logic
│   ├── components/ # Dashboard tabs, toolbar
│   ├── constants.ts
│   └── types.ts
├── lib/            # API helpers, auth context
└── projects/       # Dynamic project pages
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
| `npm run docker` | Build/run Docker  |

## Development

1. **Backend**: Run FastAPI backend locally or use production URL
2. **Frontend**: `npm run dev`
3. **Changes**: Edit in `app/`, test in browser
4. **Lint**: `npm run lint`
5. **Build**: `npm run build` (catches issues)

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

## Responsive Design

- Mobile-first
- Smooth scroll animations
- Dark mode ready
- Accessibility (ARIA labels)

## Recent Updates

- Icon system (`lib/icons.tsx`) - centralized SVGs
- Admin role protection with Unauthorized component
- Improved TypeScript types + ESLint
- Docker production setup

## Contributing

1. Fork repository
2. Create feature branch
3. Run `npm run lint`
4. Test changes
5. PR to `main`

## License

MIT
