# Setup Guide

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Supabase account
- Vercel account (optional, for deployment)
- Fly.io account (for worker)

## Installation

### 1. Clone & Install

```bash
cd personal-messaging-os
pnpm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Provider (you have OpenRouter key)
OPENROUTER_API_KEY=sk-or-v1-...

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/pmo
```

### 3. Database Setup

#### Option A: Local Supabase (Docker)
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
supabase start
```

#### Option B: Cloud Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and keys to `.env.local`

#### Create Tables
Run SQL in Supabase SQL editor:

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}'
);

-- Chats
CREATE TABLE chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL,
  last_message TEXT,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  direction TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Scheduled Messages
CREATE TABLE scheduled_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  send_at TIMESTAMP NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Automations
CREATE TABLE automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL,
  condition TEXT NOT NULL,
  action TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- AI Logs
CREATE TABLE ai_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  input TEXT NOT NULL,
  output TEXT NOT NULL,
  model_used TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Start Development

```bash
# Terminal 1: Frontend (localhost:3000)
cd frontend
pnpm dev

# Terminal 2: Backend (localhost:3001)
cd backend
pnpm dev

# Terminal 3: Worker (optional)
cd worker
pnpm dev
```

## Development Workflow

### File Structure
```
src/
├── app/              # Next.js App Router
├── components/       # React components
│   └── ui/          # Reusable UI components
├── lib/             # Utilities & helpers
├── hooks/           # Custom React hooks
├── store/           # State management (Zustand)
├── types/           # TypeScript types
└── styles/          # CSS files
```

### Creating a New API Route

Create `backend/src/app/api/feature/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Error message' },
      { status: 500 }
    );
  }
}
```

### Creating a New Page

Create `frontend/src/app/feature/page.tsx`:

```typescript
'use client';

export default function FeaturePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Feature</h1>
    </div>
  );
}
```

## Testing

```bash
# Run tests
pnpm test

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
kill -9 $(lsof -t -i:3000)
```

### Supabase connection fails
- Check `.env.local` credentials
- Ensure Supabase project is active
- Test connection: `SELECT NOW();`

### Worker can't connect to WhatsApp
- Ensure Playwright is installed: `pnpm install @playwright/test`
- Check browser compatibility
- May need to update WhatsApp selectors if layout changed

## Support

For issues:
1. Check existing documentation
2. Review error logs
3. Check GitHub issues
4. Contact team
