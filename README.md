# Expense Tracker App

A full-stack Expense Tracker application with a RESTful API backend and a single-page frontend. Built using **Express.js**, **PostgreSQL**, **Prisma**, and **TypeScript** on the backend, and **React** with **TypeScript** on the frontend.

---

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **TypeScript**

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **CSS Modules / Tailwind (if applicable)**

---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/poppycalifornia56/expense-tracker.git
cd expense-tracker
cd backend
npm install
cd ../frontend
npm install
```

### 2. Configure Environment
Create a .env file in /backend with your PostgreSQL credentials:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker"
```

### 3. Run Prisma Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

### 4. Start Development Servers
Backend

```bash
cd backend
npm run dev
```

Frontend

```bash
cd ../frontend
npm run dev
```

## License
MIT License