# TableLinker

> Simplify complex data relationships for database analysts with ease.

**Status:** 🚧 In Development

## Problem
Database analysts struggle with creating complex data views across multiple tables due to clunky SQL tools. TableLinker provides an intuitive interface that automates relationship management, making it accessible to both technical and non-technical users.

## MVP Features
- Visual interface for creating relationships between multiple tables
- Drag-and-drop functionality for rearranging data views
- Automated tutorials and guided workflows for setup
- Exportable data views in various formats (CSV, JSON)
- Basic reporting tools to analyze data relationships

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
This architecture leverages Next.js API routes for a unified server-side and client-side experience. Supabase simplifies database and authentication management, allowing rapid development while Stripe handles payment processing, providing a reliable and secure foundation for user transactions.

## User Stories
- Create Relationships between Tables
- Drag-and-Drop Data Views
- Automated Tutorials and Guided Workflows
- Export Data Views
- Basic Reporting Tools
- User Authentication
- Admin Dashboard

## Launch Checklist
- [ ] Complete development of key MVP features
- [ ] Conduct user testing with feedback loop
- [ ] Set up marketing materials for launch

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```