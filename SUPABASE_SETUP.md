# Supabase CLI Setup Guide

## Installation ✅
Supabase CLI is already installed globally on this machine.

```bash
supabase --version
```

## Authentication Setup

### Option 1: Interactive Login (Recommended)
```bash
supabase login
```
This will open your browser to generate and authenticate your access token.

### Option 2: Environment Variable
1. Go to https://app.supabase.com/account/tokens
2. Create a new token
3. Add to your `.env.local`:
```bash
export SUPABASE_ACCESS_TOKEN=your_token_here
```

## Project Configuration
Your project is already configured in:
- **Project ID**: `gfkdgoulkygrzsdphghu`
- **Config file**: `./supabase/config.toml`

## Common Commands

### Start Local Supabase (Development)
```bash
supabase start
```
This starts a local Supabase instance with:
- PostgreSQL database on `localhost:54322`
- REST API on `localhost:54321`
- Realtime on `localhost:54321`
- Studio (UI) on `localhost:54323`

### Stop Local Supabase
```bash
supabase stop
```

### Pull Remote Schema
```bash
supabase db pull
```
Pulls the remote schema from your Supabase project.

### Push Local Migrations
```bash
supabase db push
```
Pushes local migrations to your Supabase project.

### Run Migrations
```bash
supabase migration new create_users_table
supabase db push
```

### Generate Types
```bash
supabase gen types typescript --project-id gfkdgoulkygrzsdphghu --db-url postgres://...
```

### Link to Remote Project
```bash
supabase link --project-ref gfkdgoulkygrzsdphghu
```

### View Remote Functions
```bash
supabase functions list
```

### Deploy Functions
```bash
supabase functions deploy function_name
```

## Project Structure
```
supabase/
├── config.toml          # Supabase configuration
├── migrations/          # SQL migrations
├── seeds/               # Seed data files
├── functions/           # Edge functions
└── .env.example         # Example environment variables
```

## Database Connection
- **Remote**: `postgresql://postgres:[password]@db.gfkdgoulkygrzsdphghu.supabase.co:5432/postgres`
- **Local**: `postgresql://postgres:postgres@localhost:54322/postgres`

## Useful Links
- 📚 [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- 🔑 [Access Tokens](https://app.supabase.com/account/tokens)
- 🏗️ [Supabase Dashboard](https://app.supabase.com/)
- 🚀 [Migrations Guide](https://supabase.com/docs/guides/migrations/intro)

---
**Next Steps:**
1. Run `supabase login` to authenticate
2. Run `supabase link --project-ref gfkdgoulkygrzsdphghu` to link the project
3. Run `supabase db pull` to sync remote schema
