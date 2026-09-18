# Yline Shipping — Backend

Express + MongoDB API backing the Register and Post Enquiry pages.

## Setup

```
cd backend
npm install
cp .env.example .env   # then fill in MONGODB_URI, JWT_SECRET, PLATFORM_ADMIN_*
npm run seed:admin     # creates the one platform super-admin from .env
npm run dev            # http://localhost:5000
```

## Model of the system

- **Company** ("store") — created when someone registers a `company` account. Starts `status: "pending"` until a `platform_admin` approves it (matches the "verified within 24 hours" copy on the Register page). Has a unique `code` (e.g. `YLN-4821`) that employees use to join.
- **User** — one collection, `role` is one of `platform_admin | company_admin | employee | individual`.
  - `company_admin` is created alongside the Company on company registration; can log in immediately, even while the company is pending.
  - `employee` registers with a company `code`, starts `status: "pending"`, and cannot log in until the matching `company_admin` approves them.
  - `individual` is active immediately.
- **Enquiry** — one document per submission from the Post Enquiry form. Every enquiry endpoint requires a Bearer token; `postedBy` is always the logged-in user.

## Auth

Every route except `POST /register/*`, `POST /login` and `GET /health` requires a Bearer token:

```
Authorization: Bearer <token from /login or /register/*>
```

`protect` (in `src/middleware/auth.js`) rejects with `401` if the header is missing, malformed, or the token is invalid/expired. `requireRole(...roles)` layers on top of it for role-gated routers (`/api/store`, `/api/admin`).

## Endpoints

Auth (`/api/auth`):
- `POST /register/company` (JSON) — public, returns a token
- `POST /register/employee` (multipart: `idProofFront`, `idProofBack`) — public, returns a token
- `POST /register/individual` (multipart: `idProofFront`, `idProofBack`) — public, returns a token
- `POST /login` — public, returns a token
- `GET /me` — Bearer token required

Store admin, i.e. a `company_admin` managing their own company's employees (`/api/store`, Bearer token required, role `company_admin`):
- `GET /employees?status=pending`
- `PATCH /employees/:id/approve`
- `PATCH /employees/:id/reject` (body: `{ "reason": "..." }`)

Platform admin (`/api/admin`, Bearer token required, role `platform_admin`):
- `GET /companies?status=pending`
- `PATCH /companies/:id/approve`
- `PATCH /companies/:id/reject` (body: `{ "reason": "..." }`)
- `GET /users?role=&status=`

Enquiries (`/api/enquiries`, Bearer token required for every route):
- `POST /` (multipart; field `attachments` for files, `packages` as a JSON string of the weight/volume rows)
- `GET /` — stores/admins see all; individuals see their own; `?mine=true` forces "my enquiries" for any role
- `GET /:id`

All list endpoints return uploaded file names only; fetch the file itself from `/uploads/<filename>`.

## Notes / things you'll likely want to extend

- Server-side validation mirrors the frontend's *required* fields but not every regex/UX rule from `Register.tsx` and `PostEnquiry.tsx` — tighten as needed.
- No rate limiting or refresh tokens; JWT expiry is controlled by `JWT_EXPIRES_IN`.
- No email/SMS notifications are sent on approval/rejection — add a mailer if you want that.
