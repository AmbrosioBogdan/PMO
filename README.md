# WhatsApp Automation Hub

Personal, private, and modular web application designed to centralize, automate, and manage advanced WhatsApp Web activities via a persistent browser session.

## 🔗 Deployment

- **Frontend Dashboard**: [https://wa-hub-web-final.onrender.com](https://wa-hub-web-final.onrender.com)
- **API Server**: [https://wa-hub-api-final.onrender.com](https://wa-hub-api-final.onrender.com)

## 🏗️ Technical Architecture

### Frontend
- **Framework**: Next.js / React (Static Export)
- **Styling**: Tailwind CSS
- **Updates**: Real-time WebSocket integration (Socket.io)

### Backend
- **Runtime**: Node.js
- **Framework**: Fastify
- **Task Queue**: Redis & BullMQ (Integrated Worker)

### Infrastructure
- **Deployment**: Render
- **Database**: Neon (PostgreSQL)
- **Redis**: Render Key-Value (Valkey)

## 📁 Repository Structure

- `apps/web`: Next.js frontend dashboard.
- `apps/server`: Backend API and worker.
- `packages/wa-engine`: Core Playwright logic for WhatsApp Web.
- `packages/database`: Shared Prisma client and schema.
- `packages/ui`: Shared React components.

## 🛠️ Development & Deployment

The project uses **Bun** for package management.

### Local Setup
1. `bun install`
2. Configure `.env` files with `DATABASE_URL` and `REDIS_URL`.
3. `bun run db:generate`
4. `bun run db:push`
5. `bun run dev`

### Render Configuration

#### API (Web Service)
- **Runtime**: Node
- **Build Command**: `bun install && bun run build`
- **Start Command**: `bun run --filter '@wa-hub/server' start`
- **Environment Variables**:
  - `DATABASE_URL`: Your Neon Postgres URL
  - `REDIS_URL`: Your Render Redis URL

#### Web (Static Site)
- **Build Command**: `bun install && bun run build`
- **Publish Path**: `apps/web/out`
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL`: The URL of your API service
