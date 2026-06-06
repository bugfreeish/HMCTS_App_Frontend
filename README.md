# HMCTS Task Manager — Frontend

React SPA for managing tasks. Built with Vite, TypeScript, Tailwind CSS, and React Router.

## Quick start

```bash
# Install dependencies
npm install

# Start the dev server (default: http://localhost:5173)
npm run dev
```

The app fetches tasks from a backend API. Start the backend first:

```bash
cd ../HMCTS_app_back
npm install && npm run dev
```

The Vite dev server proxies `/tasks` and `/health` requests to `http://localhost:3000`.

## Scripts

| Command         | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start Vite dev server                         |
| `npm run build` | Type-check with `tsc -b` then build with Vite |
| `npm test`      | Run Jest tests                                |
| `npm run lint`  | Run ESLint                                    |
| `npm run fmt`   | Format code with dprint                       |

## Project structure

```
src/
├── api/          # API client functions (fetchTasks, createTask, etc.)
├── components/   # Reusable UI components (TaskCard, TaskForm, StatusBadge)
├── lib/          # Pure utility functions (formatDate)
├── pages/        # Route-level components (Home, CreateCard, EditCard)
└── types/        # TypeScript type definitions
```

Tests are co-located next to their source files (e.g. `src/components/TaskCard.test.tsx`).

## Stack

- **React 19** — UI library
- **Vite 8** — Bundler and dev server
- **TypeScript 6** — Type safety
- **Tailwind CSS 4** — Styling
- **React Router 7** — Client-side routing
- **Jest 30** — Test runner
- **React Testing Library** — Component tests
