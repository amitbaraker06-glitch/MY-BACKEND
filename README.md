# Krishi Mitra — Backend + Frontend

This branch consolidates the backend and frontend into a single, working project. It removes duplicate stale backend copies and ensures the frontend serves the actual React app (not the Vite starter).

Run the backend:

1. Create a .env file in the project root with values for MONGO_URI and JWT_SECRET.
2. Install dependencies: `npm install`
3. Start server (dev): `npm run dev`

Run the frontend:

1. `cd krishi-mitra` 
2. `npm install`
3. `npm run dev -- --host`

Notes:
- Frontend uses VITE_API_URL (krishi-mitra/.env.local or environment) to talk to the backend. The vite dev server includes a proxy for /api.
- I removed the duplicate my-backend runtime; if you need to keep it, restore from your history.
