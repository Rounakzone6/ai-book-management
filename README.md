# Velocity — Fullstack Book App

> Unified README for both frontend and backend parts of this project.

## Overview

Velocity is a fullstack application for managing books. The repository contains two folders: `backend` (Express + MongoDB API) and `frontend` (Vite + React UI).

## Repository structure

- `backend/` — Express server, routes, models, controllers, and middleware.
- `frontend/` — React app built with Vite.

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- A running MongoDB instance (local or cloud)

## Environment variables

Create a `.env` file in the `backend` folder with at least:

- `MONGODB_URI` — MongoDB connection string
- `PORT` — Optional, defaults to `4000`

For the frontend, create `.env` or set an environment variable used by Vite:

- `VITE_API_URL` — Base URL for the API, e.g. `http://localhost:4000` (no trailing `/`)

## Install

Install dependencies separately for each part.

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

## Run (development)

Backend (development):

```bash
cd backend
# If package.json has a start/dev script:
npm run dev
# Or run directly:
node server.js
```

Frontend (development):

```bash
cd frontend
npm run dev
```

Open the frontend (usually at `http://localhost:5173`) and ensure `VITE_API_URL` points to the backend.

## Scripts

Check `package.json` in each folder for available scripts. Common commands:

- `npm run dev` — start dev server (frontend/back)
- `npm start` — start production server (if defined)
- `npm test` — run tests (if defined)

## API

The backend exposes REST endpoints. See `backend/routes/` for exact routes and `backend/controllers/` for behavior.

## Build & Deploy

Frontend:

```bash
cd frontend
npm run build
# Deploy the generated `dist`/`build` folder to your static host
```

Backend:

Prepare environment variables on the server and run the Node process (use a process manager like PM2 or containerize with Docker).

## Development tips

- Keep `VITE_BACKEND_URL` and backend `PORT` consistent during local development.
- Use Postman or curl to exercise backend routes while developing the frontend.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Open a pull request with a clear description

## License

Specify your license here (e.g., MIT). If none, add one to the repository root.

## Contact

For questions or help, open an issue in this repository.
