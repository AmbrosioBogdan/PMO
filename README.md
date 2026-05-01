# Personal Messaging OS 2026

A private, AI-enhanced messaging control system for WhatsApp Web automation with a modern dashboard.

## 🏗 Project Structure

```
personal-messaging-os/
├── frontend/          # Next.js Web Application
├── backend/           # Next.js API + Business Logic
├── worker/            # Playwright WhatsApp Automation
├── shared/            # Shared Types & Utilities
└── docs/              # Documentation
```

## 🚀 Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14+ / React / Tailwind CSS / Shadcn/ui |
| **Backend** | Next.js API / TypeScript |
| **Database** | Supabase (PostgreSQL) |
| **WhatsApp Worker** | Playwright / Fly.io |
| **AI** | OpenRouter / Groq / HuggingFace |
| **Hosting** | Vercel (Frontend), Fly.io (Worker) |

## ✨ Key Features

- 📨 Read/Send WhatsApp messages
- ⏰ Schedule messages
- 🤖 AI reply suggestions
- 🔄 Auto-reply automations
- 📊 Dashboard & Analytics
- 🌙 Dark/Light mode
- 📱 Mobile-first PWA

## 🔐 API Keys Required

- `OPENROUTER_API_KEY` - AI provider
- `SUPABASE_URL` - Database
- `SUPABASE_ANON_KEY` - Database access

## 📖 Documentation

See `/docs` for detailed setup and architecture.

## 🛠 Setup

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local

# Start development
pnpm dev
```

---

**Created:** May 2026 | **Privacy First** | **Open Source**
