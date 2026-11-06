# Task Management App


## Local development

1. Create a PostgreSQL database.
2. Copy `backend/.env.example` to `backend/.env`. Set `DATABASE_URL`, replace `JWT_SECRET` with a unique random secret (generate one with `openssl rand -base64 32`), and set `APP_URL` to the client origin. Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM` to enable password reset emails. For Gmail, use `smtp.gmail.com`, port `465`, and a Google App Password (with 2-Step Verification enabled), not your normal Gmail password.
3. Run `cd backend && npm run migrate && npm run dev`.
4. Copy `client/.env.example` to `client/.env.local`, then run `cd client && npm run dev` in a second terminal.

## Production deployment


- Configure `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `CLIENT_ORIGINS`, `APP_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `PORT`, and `TRUST_PROXY` for the backend. `CLIENT_ORIGINS` must be a comma-separated list of HTTPS origins without paths or trailing slashes. `APP_URL` must be the HTTPS origin of the client. Set `TRUST_PROXY` to the actual number of trusted reverse-proxy hops, or `0` when directly exposed.
- Set `VITE_API_URL` to the deployed API base URL when building the client.
- Build the backend with `cd backend && npm run build`; run it with `npm start`. Run `npm run migrate` as a release step before deploying application code.
- The API applies security headers, limits JSON bodies to 64 KB, restricts browser origins, and limits authentication requests. Its rate-limit store is in-memory; configure a shared store before running multiple API instances.
- Terminate TLS at a trusted HTTPS proxy, enable HSTS and a suitable Content Security Policy for the client hosting, and use automated database backups and monitoring.
- Authentication tokens are stored in browser local storage. For higher security requirements, use a short-lived access token with a secure HttpOnly refresh/session cookie and CSRF protection.
- Password recovery sends a single-use link that expires after 30 minutes. Only a SHA-256 hash of the random reset token is stored; requests are rate-limited, and responses do not disclose whether an account exists. Password reset invalidates existing login tokens, so users must sign in again. Migration `011` also invalidates tokens issued before this version, requiring users to sign in once after deployment. Apply migrations `010` and `011` with `npm run migrate` before deploying the updated API.
- SMTP delivery is started by the API process after the reset request is accepted. Delivery failures are logged and the unusable token is removed; use a durable job queue/outbox if you need delivery to survive process restarts or support higher-volume deployments.
- Migration `008` will stop if existing accounts contain email addresses that differ only by letter case. Resolve those duplicate accounts before running that migration.


Run the backend auth validation tests with `cd backend && npm test`.
