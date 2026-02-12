# Clarity Expense Tracker

##  What Makes Clarity Different

**Clarity is not an regular expense tracker.** It's a money reflection system designed to help you understand how spending *feels*, not just where money goes.

Clarity focuses on:
- **Emotional awareness** – Track how each expense made you feel
- **Behavioral patterns** – Discover insights numbers alone can't reveal
- **Mindful spending** – Build awareness without guilt
- **Financial peace** – Reduce anxiety through understanding

> **Core Philosophy**: Every expense carries emotional value. By capturing how an expense felt (Worth it, Neutral, Regret), Clarity reveals the true story of your relationship with money.

##  Key Features

### Emotional Money Tracking
- **Money Mood System**: One-tap emotional input for every expense (Worth it | Neutral  | Regret )
- Frictionless logging designed for daily use
- No complex categories or budget constraints

### Reflection-Based Insights
- Percentage of expenses that felt worth it
- Top regret categories to inform future decisions
- Spending pace vs monthly income
- One-line reflection summaries
- AI chatbot integration (pollination.ai)

### Mindful Onboarding
- Set financial intentions (Awareness, Control, or Peace)
- Define monthly income for context
- No budget pressure – just awareness

## Live Frontend:
 https://clarity-anil.vercel.app/

## Backend Status
The backend is currently not deployed.
I attempted to host it on my VPS, but due to technical issues on the server and time constraints, I couldn\u2019t complete the deployment.
I will be hosting the backend shortly.


# Tools and package,

```typescript
 Overview: A RESTful Clarity API built with:
- Node.js & Express
- TypeScript 
- MongoDB (Mongoose)
- pnpm package manager
```

```typescript
 Overview: Frontend of Clarity with:
- React & Tailwind CSS
- TypeScript 
```

### Packages going to Used in this project

1. body-parser -> Parses incoming request bodies (JSON).
2. cors -> Enables Cross-Origin Resource Sharing for handling requests from different origins.
3. express -> For building API.
4. mongoose -> Library to interact with MongoDB database.
5. node-cache -> In-memory caching module for Node.js.
6. zod -> For schema validation.
7. dotenv -> Loads environment variables from `.env` file.
8. nodemon -> Restarts the server automatically during development.
9. ts-node -> Runs TypeScript files directly without compiling first.
10. typescript -> Enables type safety in development.
11. cookie-parser -> Parses cookies in incoming requests.
12. http-status-codes -> Provides constants for HTTP status codes.
13. express-rate-limit -> Middleware for rate-limiting API requests.
14. winston -> Logging library for managing logs.
15. jsonwebtoken -> For generating and verifying JWT tokens.
16. helmet -> Sets secure HTTP headers to protect against common vulnerabilities.


## System Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React Frontend │◄────►│  Express API    │◄────►│  MongoDB Atlas  │
│  (......)       │      │  (......)       │      │                 │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        │                         │
        │                         │
        ▼                         ▼
   Tailwind CSS            JWT Auth + Helmet
   TypeScript              Rate Limiting
```

##  Database Schema

### User Model
```typescript
{
  username: String,
  email: String (unique, required)
  password: String (hashed, required)
  monthlyIncome: Number (required)
  refresh_token: String,
  goal: String (enum: ['Awareness', 'Control', 'Peace'])
  createdAt: Date
  updatedAt: Date
}
```

### Expense Model
```typescript
{
  userId: ObjectId (ref: User, required)
  amount: Number (required)
  category: String (required)
  mood: String (enum: ["Worth It", "Neutral", "Regret"], required)
  description: String (optional)
  date: Date (default: now)
  createdAt: Date
  updatedAt: Date
}
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 8+
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/onealanil/clarity
cd clarity
```

2. **Install dependencies**
```bash
# Backend
cd clarity-backend
pnpm install

# Frontend
cd ../clarity-frontend
npm install
```

3. **Environment setup**

Create `.env` file in backend directory:
```env
PORT=8000
MONGO_CONNECTION_URL=your_mongo_url
ACCESS_TOKEN_SECRET=access_token
REFRESH_TOKEN_SECRET=refresh_token
SECRET_KEY=secret_key
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

```
**Run development servers**

```bash
# Backend (from backend directory)
nodemon

# Frontend (from frontend directory)
pnpm run start
```

## Future Enhancements

- [ ] AI-based reflection summaries using LLMs
- [ ] Monthly reflection reports (PDF export)
- [ ] Savings mood analysis
- [ ] Export insights to CSV/JSON
- [ ] Mobile app (React Native)
- [ ] Collaborative budgeting for families
- [ ] Integration with bank APIs
- [ ] Customizable categories and tags
- [ ] Dark mode support
- [ ] Multi-currency support