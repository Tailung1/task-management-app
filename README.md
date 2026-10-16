# Task Management App

## Local development

1. Create a PostgreSQL database.
2. Copy `backend/.env.example` to `backend/.env`. Set `DATABASE_URL` and replace `JWT_SECRET` with a unique random secret. Generate one with `openssl rand -base64 32`.
3. Run `cd backend && npm run migrate && npm run dev`.
4. Copy `client/.env.example` to `client/.env.local`, then run `cd client && npm run f` in a second terminal.

## Production deployment

- Configure `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `CLIENT_ORIGINS`, `PORT`, and `TRUST_PROXY` for the backend. `CLIENT_ORIGINS` must be a comma-separated list of HTTPS origins without paths or trailing slashes. Set `TRUST_PROXY` to the actual number of trusted reverse-proxy hops, or `0` when directly exposed.
- Set `VITE_API_URL` to the deployed API base URL when building the client.
- Build the backend with `cd backend && npm run build`; run it with `npm start`. Run `npm run migrate` as a release step before deploying application code.
- The API applies security headers, limits JSON bodies to 64 KB, restricts browser origins, and limits authentication requests. Its rate-limit store is in-memory; configure a shared store before running multiple API instances.
- Terminate TLS at a trusted HTTPS proxy, enable HSTS and a suitable Content Security Policy for the client hosting, and use automated database backups and monitoring.
- Authentication tokens are stored in browser local storage. For higher security requirements, use a short-lived access token with a secure HttpOnly refresh/session cookie and CSRF protection.
- The forgot-password form is currently a UI placeholder and does not send reset emails. Add a verified email delivery and single-use expiring reset-token flow before offering password recovery in production.
- Migration `008` will stop if existing accounts contain email addresses that differ only by letter case. Resolve those duplicate accounts before running that migration.

Run the backend auth validation tests with `cd backend && npm test`.
