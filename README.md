# Professor of Practice Management System

Full-stack SaaS-style application with admin/faculty workflows, JWT auth, visit approvals, capped earnings, and DOCX payslip generation.

## Structure
- `backend` - Node.js + Express + MongoDB + JWT
- `frontend` - React (Vite) + Tailwind CSS + Lucide icons

## Setup
### Backend
1. `cd backend`
2. `cp .env.example .env`
3. Edit `.env` and set:
   - `MONGO_URI` (MongoDB connection string)
   - `JWT_SECRET` (long random secret)
4. `npm install`
5. `npm run dev`

If `.env` is missing or invalid, the backend now exits with a clear startup message that names missing variables.

3. Fill `MONGO_URI` and `JWT_SECRET`
4. `npm install`
5. `npm run dev`

### Frontend
1. `cd frontend`
2. `cp .env.example .env`
3. `npm install`
4. `npm run dev`

## Business Rules
- Only admin can sign up.
- Faculty accounts are created by admin.
- ₹10,000 per approved visit.
- Monthly cap: 3 approved visits (₹30,000 max per month).
- Admin can generate `.docx` payslips by faculty and month.
