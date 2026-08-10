# Codex — Web Design & Development Agency

A full-stack web agency website built with React, Express, and MongoDB.

## Quick Start

### 1. Environment Setup
```bash
cp .env.example .env
# Fill in your MongoDB URI, Google OAuth credentials, email config
```

### 2. Server
```bash
cd server
npm install
npm run dev
```

### 3. Client
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** Google OAuth 2.0 (admin-only)
- **Uploads:** Multer (images + videos)
- **Email:** Nodemailer
