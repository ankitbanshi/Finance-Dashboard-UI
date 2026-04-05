# Finflow Frontend

Finflow Frontend is a responsive React + TypeScript finance dashboard built with a clean component architecture, role-aware behavior, and chart-driven analytics.

# Demo Link: https://finance-dashboard-ui-three-phi.vercel.app/

## What This App Includes

- Overview dashboard with key KPIs (balance, income, expenses, transaction count)
- Interactive charts for trend and spending breakdown
- Transactions management with add, edit, delete, search, filter, sort, and pagination
- Role-aware UX (Admin can edit data, Analyst/Viewer read-only)
- Dark and light theme support
- Mobile-first responsive behavior (drawer nav, responsive cards/tables, modal handling)
- Local persistence via browser storage for demo continuity

## Technical Approach

The implementation is designed for maintainability and incremental scaling:

- State management: centralized in React Context + reducer (`DashboardProvider`) to avoid prop drilling and keep UI logic consistent.
- UI composition: modular components for pages, cards, charts, modal, toast, and shared controls.
- Chart layer: Recharts with theme-aware styling and explicit chart legends.
- Icon system: Material UI icons, with shared category icon mapping in `src/config/category-icons.ts`.
- Styling: Tailwind utilities with custom global CSS tokens for theme gradients and dashboard polish.
- Persistence: localStorage snapshot of theme, role, filters, active page, and transactions.

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- Recharts
- Material UI Icons

## Prerequisites

- Node.js 18+
- npm 9+

## Setup Instructions

1. Install dependencies

```bash
npm install
```

2. Create local env file from the example

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Start development server

```bash
npm run dev
```

4. Build production bundle

```bash
npm run build
```

5. Preview production build locally

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: start Vite dev server
- `npm run build`: create production build
- `npm run preview`: preview production build locally

## Environment Variables

Use only Vite-prefixed public variables in frontend env files:

- `VITE_API_BASE_URL`
- `VITE_APP_NAME`

Important security note:

- Do not store private keys or secrets in frontend `.env` files.
- Keep real credentials only in backend environment configuration.

## Current Data Mode

This frontend currently runs on mock/local data (via context + localStorage). Backend integration can be added next by wiring service calls to `VITE_API_BASE_URL`.

## Quality Notes

- Type-safe TypeScript structure with modular components.
- Shared icon/config patterns to reduce duplication.
- Responsive behavior validated for desktop and mobile layouts.
- Production build succeeds with Vite.
