# Expense Tracker App - Backend

## Project Overview
A Node.js backend for an Expense Tracker application with Prisma ORM and Express.


## Features
- **REST API** for expense tracking
- **Prisma ORM** for database operations
- **TypeScript** support
- **Error handling** middleware
- **Separate routes** for categories and expenses

## Technologies
- Node.js
- Express
- Prisma
- TypeScript

## API Endpoints
### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create new category
- (Other CRUD operations)

### Expenses
- `GET /expenses` - Get all expenses
- `POST /expenses` - Create new expense
- (Other CRUD operations)

## Setup Instruction
1. Clone the repository
2. npm install
3. npx prisma migrate dev
4. Create a new .env file on the root
5. npm run dev

## Database Setup
1. Configure your database connection in: prisma/schema.prisma and .env file
2. npx prisma migrate dev
3. Watch mode: npm run dev
4. Production buid: npm run build