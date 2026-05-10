# WhatsApp Automation Hub

Personal, private, and modular web application designed to centralize, automate, and manage advanced WhatsApp Web activities via a persistent browser session.

## 🔗 Deployment

- **Frontend Dashboard**: [https://wa-hub-web-new.onrender.com](https://wa-hub-web-new.onrender.com)
- **API Server**: [https://wa-hub-api-new.onrender.com](https://wa-hub-api-new.onrender.com)

## 🏗️ Technical Architecture

### Frontend
- **Framework**: Next.js / React (Static Export)
- **Styling**: Tailwind CSS & ShadCN UI
- **Updates**: Real-time WebSocket integration

### Backend
- **Runtime**: Node.js / Bun
- **Framework**: Fastify
- **Task Queue**: Redis & BullMQ (Integrated Worker)

### Infrastructure
- **Deployment**: Render
- **Database**: Neon (PostgreSQL)
- **Auth & Storage**: Supabase
- **Redis**: Render Key-Value

## 📁 Repository Structure

- `apps/web`: Next.js frontend dashboard.
- `apps/server`: Backend API and worker.
- `packages/wa-engine`: Core Playwright logic.
- `packages/database`: Shared Prisma client.
- `packages/ui`: Shared React components.

## 🛠️ Development & Deployment

The project uses **Bun** for fast package management and execution.

### Local Setup
1. `bun install`
2. Configure `.env` files with DATABASE_URL and REDIS_URL.
3. `bun run db:push`
4. `bun run dev`

### Render Configuration
- **API**: Node runtime, Build: `bun install && bun run build`, Start: `bun run --filter '@wa-hub/server' start`
- **Web**: Static Site, Build: `bun install && bun run build`, Publish Path: `apps/web/out`
