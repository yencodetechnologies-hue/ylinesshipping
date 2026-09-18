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
- **Enquiry** — one document per submission from the Post Enquiry form. Creating one does not require login (`postedBy` is set if a token is sent), but listing/viewing requires login.

## Endpoints

Auth (`/api/auth`):
- `POST /register/company` (JSON)
- `POST /register/employee` (multipart: `idProofFront`, `idProofBack`)
- `POST /register/individual` (multipart: `idProofFront`, `idProofBack`)
- `POST /login`
- `GET /me` (auth required)

Store admin, i.e. a `company_admin` managing their own company's employees (`/api/store`, auth required, role `company_admin`):
- `GET /employees?status=pending`
- `PATCH /employees/:id/approve`
- `PATCH /employees/:id/reject` (body: `{ "reason": "..." }`)

Platform admin (`/api/admin`, auth required, role `platform_admin`):
- `GET /companies?status=pending`
- `PATCH /companies/:id/approve`
- `PATCH /companies/:id/reject` (body: `{ "reason": "..." }`)
- `GET /users?role=&status=`

Enquiries (`/api/enquiries`):
- `POST /` (multipart, auth optional — attach a Bearer token to associate it with an account; field `attachments` for files, `packages` as a JSON string of the weight/volume rows)
- `GET /` (auth required — stores/admins see all; individuals see their own; `?mine=true` forces "my enquiries" for any role)
- `GET /:id` (auth required)

All list endpoints return uploaded file names only; fetch the file itself from `/uploads/<filename>`.

## Notes / things you'll likely want to extend

- Server-side validation mirrors the frontend's *required* fields but not every regex/UX rule from `Register.tsx` and `PostEnquiry.tsx` — tighten as needed.
- No rate limiting or refresh tokens; JWT expiry is controlled by `JWT_EXPIRES_IN`.
- No email/SMS notifications are sent on approval/rejection — add a mailer if you want that.
