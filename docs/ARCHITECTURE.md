# Architecture Guide

## System Overview

Personal Messaging OS è una soluzione modulare con componenti separati per **frontend**, **backend**, **worker**, e **database**.

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │         │   Mobile    │         │   Worker    │
│  (Frontend) │         │   PWA       │         │ (Playwright)│
└──────┬──────┘         └──────┬──────┘         └──────┬──────┘
       │                       │                       │
       └───────────────────────┼───────────────────────┘
                               │
                        ┌──────▼──────┐
                        │   Next.js   │
                        │   Backend   │
                        │  (API)      │
                        └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │  Supabase   │
                        │ (Database)  │
                        └─────────────┘
```

## Components

### Frontend (`frontend/`)
- Next.js 14 + React 18
- Tailwind CSS + Shadcn/ui
- Responsive design (mobile-first PWA)
- Real-time updates via API

**Stack:**
- React Hooks, Zustand (state management)
- Axios (API calls)
- Framer Motion (animations)

### Backend (`backend/`)
- Next.js API Routes
- Business logic
- AI integration (OpenRouter, Groq, HuggingFace)
- Database operations

**Endpoints:**
- `GET /api/health` - Health check
- `GET/POST /api/messages` - Messages CRUD
- `GET/POST /api/chats` - Chats management
- `POST /api/ai/suggest-reply` - AI suggestions
- `POST /api/automations` - Automation management

### Worker (`worker/`)
- Playwright browser automation
- WhatsApp Web integration
- Message reading/sending
- Session management
- Runs on Fly.io

### Shared (`shared/`)
- TypeScript types
- Shared utilities
- Constants

### Database (Supabase)
Tables:
- `users` - User profiles
- `chats` - WhatsApp conversations
- `messages` - Message history
- `scheduled_messages` - Scheduled sends
- `automations` - Auto-reply rules
- `ai_logs` - AI call logs

## Data Flow

1. **User sends message via dashboard**
   - Frontend → Backend API
   - Backend stores in Supabase
   - Worker picks up and sends via WhatsApp

2. **New message from WhatsApp**
   - Worker reads message
   - Sends to Backend API
   - Stores in Supabase
   - Frontend receives update

3. **AI suggestions**
   - Frontend requests suggestions
   - Backend calls AI provider
   - Returns multiple options
   - Frontend displays with tone selection

## Deployment

### Frontend (Vercel)
```bash
vercel deploy
```

### Backend (Vercel)
```bash
vercel deploy --name backend
```

### Worker (Fly.io)
```bash
fly deploy
```

### Database (Supabase)
- Managed cloud PostgreSQL
- Auth built-in
- Real-time subscriptions available

## Environment Configuration

See `.env.example` for all required variables:
- Supabase credentials
- API keys (OpenRouter, Groq, HuggingFace)
- Worker configuration
- Database URL
