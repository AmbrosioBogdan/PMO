# WhatsApp Automation Hub

Personal, private, and modular web application designed to centralize, automate, and manage advanced WhatsApp Web activities via a persistent browser session.

## 🌟 Project Vision

The platform acts as a "personal WhatsApp automation hub," capable of:
- **Session Persistence**: Maintaining an active and stable WhatsApp Web connection.
- **Smart Automation**: Automating repetitive actions and complex flows.
- **Advanced Scheduling**: Planning activities and messages over time.
- **Event Orchestration**: Reacting to triggers, conditions, and external events.
- **Observability**: Real-time monitoring of status, logs, and errors.
- **Integration**: Connecting with external services and APIs.
- **Extensibility**: Designed to evolve with AI agents and new features.

## 🏗️ Technical Architecture

### Frontend
- **Framework**: Next.js / React
- **Styling**: Tailwind CSS & ShadCN UI
- **State Management**: Zustand / TanStack Query
- **Updates**: Real-time WebSocket integration

### Backend
- **Runtime**: Node.js / Bun
- **Framework**: Fastify or NestJS
- **Task Queue**: Redis & BullMQ
- **Orchestration**: Event-driven modular architecture

### Browser Engine
- **Core**: Playwright / Puppeteer
- **Persistence**: persistent browser contexts & session snapshots
- **Resilience**: Auto-restart watchdog & crash recovery

### Infrastructure & Services
- **Deployment**: Render (Backend, Worker, Browser)
- **Database**: Neon (PostgreSQL)
- **Auth & Storage**: Supabase (Real-time, Auth, Media Storage)
- **Analytics**: Tinybird (Real-time observability)
- **Management**: Linear (Task tracking & roadmap)

## 📁 Repository Structure

- `apps/web`: Next.js frontend dashboard.
- `apps/server`: Backend API, scheduler, and orchestrator.
- `packages/wa-engine`: Core Playwright logic for WhatsApp automation.
- `packages/database`: Shared database client and schema definitions.
- `packages/ui`: Shared React component library.
- `packages/config`: Shared configuration for TypeScript, ESLint, etc.

## 🚀 Key Functional Objectives

1. **Session Management**: Reliable browser automation with session restore and heartbeat.
2. **Message Scheduler**: Single/recurring messages with support for text, media, and templates.
3. **Automation Engine**: Trigger-based workflows (keyword detection, webhooks, scheduled events).
4. **Admin Dashboard**: Responsive UI for session control, job monitoring, and real-time logs.

## 🛠️ Getting Started

*(Instructions to be added as development progresses)*

---
**Note**: This is a private and personal project aimed at high customization and resilience.
